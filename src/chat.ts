import {
  ChatPromptTemplate,
  MessagesPlaceholder,
  ParamsFromFString,
} from "@langchain/core/prompts";
import { ChatMistralAI, MistralAIEmbeddings } from "@langchain/mistralai";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";
import * as uuidV4 from "uuid";
import {
  Annotation,
  MemorySaver,
  messagesStateReducer,
  StateGraph,
} from "@langchain/langgraph";
import fs from "fs/promises";

import * as dotenv from "dotenv";
import { StringOutputParser } from "@langchain/core/output_parsers";
import {
  AIMessage,
  BaseMessage,
  HumanMessage,
  trimMessages,
} from "@langchain/core/messages";
import readline from "readline";
import { doc, doc1 } from "./docs";
import { DocumentInterface } from "@langchain/core/dist/documents/document";
import { VectorStoreRetriever } from "@langchain/core/dist/vectorstores";
import { Runnable, RunnableConfig } from "@langchain/core/runnables";
import { IterableReadableStream } from "@langchain/core/utils/stream";
dotenv.config();

type VecStoreRetriever = Runnable<
  { input: string; chat_history: string | BaseMessage[] },
  DocumentInterface<Record<string, any>>[],
  RunnableConfig<Record<string, any>>
>;

// It's a type of the state.
const GraphAnnotation = Annotation.Root({
  input: Annotation<string>,
  chat_history: Annotation<BaseMessage[]>({
    reducer: messagesStateReducer,
    default: () => [],
  }),
  decision: Annotation<boolean>,
  data: Annotation<
    IterableReadableStream<
      {
        context: Document[];
        answer: string;
      } & {
        [key: string]: unknown;
      } & string
    >
  >,
});
const chatHistory: (HumanMessage | AIMessage)[] = []; // Store the history.

const model = new ChatMistralAI({
  model: "codestral-latest",
  temperature: 0.8,
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 1. Prepare documents and retriever
async function setupRetriever() {
  const docs = [doc, doc1];

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 500,
  });
  const splitDocs = await splitter.splitDocuments(docs);

  const embedding = new MistralAIEmbeddings(); //
  const vectorStore = await MemoryVectorStore.fromDocuments(
    splitDocs,
    embedding
  );

  return vectorStore.asRetriever({ k: 1 });
}

const shouldRetrieve = async (state: typeof GraphAnnotation.State) => {
  const shouldRetrievePrompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      "You are a smart assistant that decides if retrieval from a vector store is needed. Our vector database store the data into coding related documents. specifically 'React' or other programming language if user ask coding and programming related question then retrieval is needed.",
    ],
    new MessagesPlaceholder("chat_history"),
    [
      "human",
      "User query: {input}\n\nShould we search the vector store to help answer this? Reply only 'yes' or 'no'.",
    ],
  ]);

  // const decisionChain = shouldRetrievePrompt.pipe(model);
  const stringParser = new StringOutputParser();

  const message = await shouldRetrievePrompt
    .pipe(model)
    .pipe(stringParser)
    .invoke({
      chat_history: chatHistory,
      input: state.input,
    });

  console.log("message", message);

  return {
    decision: message.toLowerCase() === "yes" ? true : false,
    chat_history: chatHistory,
    input: state.input,
  };
};

const conditionalNode = async (state: typeof GraphAnnotation.State) => {
  // 1. LLM prompt to decide whether retrieval is needed
  // const shouldRetrievePrompt = ChatPromptTemplate.fromMessages([
  //   [
  //     "system",
  //     "You are a smart assistant that decides if retrieval from a vector store is needed.",
  //   ],
  //   new MessagesPlaceholder("chat_history"),
  //   [
  //     "human",
  //     "User query: {input}\n\nShould we search the vector store to help answer this? Reply only 'yes' or 'no'.",
  //   ],
  // ]);

  // // const decisionChain = shouldRetrievePrompt.pipe(model);
  // const stringParser = new StringOutputParser();

  // const message = await shouldRetrievePrompt
  //   .pipe(model)
  //   .pipe(stringParser)
  //   .invoke({
  //     chat_history: state.chat_history,
  //     input: state.input,
  //   });

  if (state.decision) {
    return "pass";
  } else {
    return "fail";
  }

  // return {
  //   decision: state.decision,
  //   chat_history: state.chat_history,
  //   input: state.input,
  // };

  // return decisionChain
  // .pipe({
  //   invoke: async (result: any) => result.content.toLowerCase().includes("yes"),
  // });
};

// 2. Create a history-aware retriever
async function setupHistoryAwareRetriever(retriever: VectorStoreRetriever) {
  const rephrasePrompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      "Given the above conversation, generate a search query to look up in order to get information relevant to the conversation.",
    ],
    new MessagesPlaceholder("chat_history"),
    ["human", "{input}"],
  ]);

  return createHistoryAwareRetriever({
    llm: model,
    rephrasePrompt,
    retriever,
  });
}

// 3. Setup final QA chain
async function setupQAChain(retriever: VecStoreRetriever) {
  const qaPrompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      "You are a helpful assistant. Use the provided context to answer the user's questions. Ask clarifying questions when necessary. For example, if the user says 'build a component', ask what framework, theme, or API is involved. ",
    ],
    ["placeholder", "{context}"],
    new MessagesPlaceholder("chat_history"),
    ["user", "{input}"],
  ]);

  const chain = await createStuffDocumentsChain({
    llm: model,
    prompt: qaPrompt,
  });

  return createRetrievalChain({
    combineDocsChain: chain,
    retriever,
  });
}

const chatHistoryVectorDatabase = async () => {
  const chatStore = await MemoryVectorStore.fromDocuments(
    [],
    new MistralAIEmbeddings()
  );

  const template = ChatPromptTemplate.fromTemplate(
    "User: {userMessage}\nAssistant: {assistantMessage}"
  );

  const historyTexts: string[] = [];

  let currentUserMessage = "";

  for (const message of chatHistory) {
    if (message instanceof HumanMessage) {
      currentUserMessage = message.content as string;
    } else if (message instanceof AIMessage) {
      const chatText = await template.format({
        userMessage: currentUserMessage,
        assistantMessage: message.content,
      });
      historyTexts.push(chatText);
      currentUserMessage = ""; // reset for next pair
    }
  }

  await chatStore.addDocuments(
    historyTexts.map((text) => ({
      pageContent: text ?? "",
      metadata: { timestamp: new Date().toISOString() },
    }))
  );

  return chatStore.asRetriever();
};

async function generalQNA(state: typeof GraphAnnotation.State) {
  // trim the chat.
  const stringParser = new StringOutputParser();
  const retriever = await chatHistoryVectorDatabase();

  const pre_chat = await trimMessages(chatHistory, {
    maxTokens: 5,
    tokenCounter: (msg) => msg.length,
    includeSystem: true,
    strategy: "last",
    allowPartial: true,
  });

  const prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      "You are a helpful assistant. Use the provided context to answer the user's questions.",
    ],
    ["placeholder", "{context}"],
    new MessagesPlaceholder("chat_history"),
    ["user", "{input}"],
  ]);

  const historyAwareRetriever = await createHistoryAwareRetriever({
    llm: model,
    rephrasePrompt: prompt,
    retriever, // your vector store
  });

  // console.log("pre_chat", pre_chat);

  const chain = await createRetrievalChain({
    retriever: historyAwareRetriever,
    combineDocsChain: await createStuffDocumentsChain({
      llm: model,
      prompt,
    }),
  });

  const response = await chain.stream({
    input: state.input,
    chat_history: [],
  });

  return {
    data: response,
    chat_history: state.chat_history,
  };
}

const modal = async (state: typeof GraphAnnotation.State) => {
  const retriever = await setupRetriever();

  const historyAware = await setupHistoryAwareRetriever(retriever);
  const qaChain = await setupQAChain(historyAware);

  const trimChatHistory = await trimMessages(chatHistory, {
    maxTokens: 200,
    tokenCounter: (msg) => msg.length,
    includeSystem: true,
    strategy: "last",
    allowPartial: true,
  });

  const response = await qaChain.stream({
    input: state.input,
    chat_history: trimChatHistory,
  });

  return {
    data: response,
    chat_history: chatHistory,
  };
};

const output = async (state: typeof GraphAnnotation.State) => {
  // Make a sse to send the response to the client.
  let answer = "";
  let context = "";
  process.stdout.write("Agent: ");

  for await (const chunk of state.data) {
    // console.log("chunks", chunk);
    if (chunk.answer) {
      process.stdout.write(chunk.answer);
      answer += chunk.answer;
    } else if (typeof chunk === "string") {
      answer += chunk;
      process.stdout.write(chunk);
    }
    if (chunk.context) {
      context += chunk.context;
    }
  }

  chatHistory.push(new HumanMessage(state.input));
  chatHistory.push(new AIMessage(answer));
};

const graph = new StateGraph(GraphAnnotation)
  .addNode("modal", modal)
  .addNode("output", output)
  .addNode("generateQNA", generalQNA)
  .addNode("shouldRetrieve", shouldRetrieve) // add should retrieve
  .addEdge("__start__", "shouldRetrieve") // add edge for, so
  .addConditionalEdges("shouldRetrieve", conditionalNode, {
    pass: "modal",
    fail: "generateQNA",
  })
  .addEdge("modal", "output")
  .addEdge("generateQNA", "output")
  .addEdge("output", "__end__");

const memory2 = new MemorySaver();
const app2 = graph.compile({ checkpointer: memory2 });

// app2
//   .getGraphAsync()
//   .then((graph) => {
//     return graph.drawMermaidPng();
//   })
//   .then(async (graphBlob) => {
//     const bufferArray = await graphBlob.arrayBuffer();
//     fs.writeFile("graph.png", new Uint8Array(bufferArray));
//   });
// Save the mermaid graph
// 4. Chat loop

async function startChat() {
  async function ask() {
    const threadId2 = uuidV4.v4();
    const config2 = { configurable: { thread_id: threadId2 } };

    rl.question("User: ", async (input) => {
      if (input.toLowerCase() === "exit") {
        rl.close();
        return;
      }

      await app2.invoke({ input: input }, config2);

      console.log("\n");
      ask();
    });
  }

  ask();
}

startChat();
