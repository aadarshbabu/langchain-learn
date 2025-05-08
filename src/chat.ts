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

  return vectorStore.asRetriever({ k: 3 });
}

// 2. Create a history-aware retriever
async function setupHistoryAwareRetriever(retriever: VectorStoreRetriever) {
  const rephrasePrompt = ChatPromptTemplate.fromMessages([
    new MessagesPlaceholder("chat_history"),
    ["human", "{input}"],
    [
      "user",
      "Given the above conversation, generate a search query to look up in order to get information relevant to the conversation",
    ],
  ]);

  return createHistoryAwareRetriever({
    llm: model,
    retriever,
    rephrasePrompt,
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

// 4. Chat loop
async function startChat() {
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

  async function ask() {
    rl.question("User: ", async (input) => {
      if (input.toLowerCase() === "exit") {
        rl.close();
        return;
      }

      const response = await qaChain.stream({
        input,
        chat_history: trimChatHistory,
      });

      let answer = "";
      process.stdout.write("Agent: ");
      for await (const chunk of response) {
        if (chunk.answer) {
          process.stdout.write(chunk.answer);
          answer += chunk.answer;
        }
      }

      chatHistory.push(new HumanMessage(input));
      chatHistory.push(new AIMessage(answer));

      console.log("\n");
      ask();
    });
  }

  ask();
}

startChat();
