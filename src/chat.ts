import {
  ChatPromptTemplate,
  MessagesPlaceholder,
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

const GraphAnnotation = Annotation.Root({
  input: Annotation<string>,
  chat_history: Annotation<BaseMessage[]>({
    reducer: messagesStateReducer,
    default: () => [],
  }),
  data: Annotation<IterableReadableStream<string>>,
});

const modal = async (state: typeof GraphAnnotation.State) => {
  const retriever = await setupRetriever();

  const historyAware = await setupHistoryAwareRetriever(retriever);
  const qaChain = await setupQAChain(historyAware);

  const chatHistory: (HumanMessage | AIMessage)[] = [];

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

  let answer = "";
  let context = "";
  process.stdout.write("Agent: ");
  for await (const chunk of response) {
    if (chunk.answer) {
      process.stdout.write(chunk.answer);
      answer += chunk.answer;
    }
    if (chunk.context) {
      context += chunk.context;
    }
  }

  chatHistory.push(new HumanMessage(state.input));
  chatHistory.push(new AIMessage(answer));

  return {
    data: response,
    chat_history: chatHistory,
    context,
  };
};

const output = (state: typeof GraphAnnotation.State) => {};

const graph = new StateGraph(GraphAnnotation)
  .addNode("modal", modal)
  .addEdge("__start__", "modal")
  .addEdge("modal", "__end__");

const memory2 = new MemorySaver();
const app2 = graph.compile({ checkpointer: memory2 });

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

      app2.invoke({ input: input }, config2);

      console.log("\n");
      ask();
    });
  }

  ask();
}

startChat();
