import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { ChatMistralAI, MistralAIEmbeddings } from "@langchain/mistralai";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";

import * as dotenv from "dotenv";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { AIMessage, HumanMessage } from "@langchain/core/messages";
import readline from "readline";
import { doc, doc1 } from "./docs";
dotenv.config();

const modal = new ChatMistralAI({
  model: "codestral-latest",
  temperature: 0.8,
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
}); // Input interface.

// const promptTemplate = ChatPromptTemplate.fromTemplate(
//   "You are a helpful ai assestent. You provide the large document summarization based on ${context} and user question ${input} "
// );

const documentLoaderAndStore = async () => {
  //   const loader = new CheerioWebBaseLoader(
  //     "https://medium.com/ai-for-absolute-beginners/what-is-langchain-explained-in-everyday-langauge-for-ai-beginners-fc8ffa6fb5f2"
  //   );
  //   const docs = await loader.load();

  const docs = [doc, doc1];

  const spliter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 500,
  });

  const splitDocs = await spliter.splitDocuments(docs);

  // Embedding

  const embedding = new MistralAIEmbeddings();

  const store = await MemoryVectorStore.fromDocuments(splitDocs, embedding);

  const retriever = store.asRetriever({ k: 1 });

  return retriever;
};

async function main() {
  const stringParser = new StringOutputParser();
  const retriever = await documentLoaderAndStore();

  const rephrasePrompt = ChatPromptTemplate.fromMessages([
    new MessagesPlaceholder("chat_history"),
    ["human", "{input}"], // this input is pass via createHistoryAwareRetriever - based on retriever data which store give.
    [
      "user",
      "Given the above conversation, generate a search query to look up in order to get information relevant to the conversation",
    ],
  ]);

  const historyAwareRetriever = await createHistoryAwareRetriever({
    llm: modal,
    retriever,
    rephrasePrompt,
  }); //

  const chatHistory = [new HumanMessage("")]; // Chat History.

  const prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      "Answer the user's questions based on the following context: {context}. if any clarification need to the user request then ask first. For example if user tel create a some component in react. then ask can you provide any api endpoint or color code for our theme etc ",
    ],
    new MessagesPlaceholder("chat_history"),
    ["user", "{input}"],
  ]);

  const chain = await createStuffDocumentsChain({
    llm: modal,
    prompt: prompt,
  });

  const conversationChain = await createRetrievalChain({
    combineDocsChain: chain,
    retriever: historyAwareRetriever,
  });

  function askQuestion() {
    rl.question("User: ", async (input) => {
      if (input.toLowerCase() === "exit") {
        rl.close();
        return;
      }

      const response = await conversationChain.stream({
        chat_history: chatHistory,
        input: input,
      });

      let res = "";

      //   console.log("Agent: ", response.answer);

      chatHistory.push(new HumanMessage(input));
      console.log("Agent:");

      for await (const chunk of response) {
        if (chunk.answer) {
          process.stdout.write(chunk.answer);
          res += chunk.answer;
        }
      }

      chatHistory.push(new AIMessage(res));

      askQuestion();
    });
  }
  askQuestion();

  //   const retrieverChain = await createRetrievalChain({
  //     combineDocsChain: chain,
  //     retriever,
  //   });

  //   const res = await retrieverChain.invoke({
  //     input: "what is langchain?",
  //   });

  //   const pr = await stringParser.parse(res.answer);
  //   console.log(pr);
}

main();
