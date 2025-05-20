import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { doc, doc1 } from "./docs";
import { MistralAIEmbeddings } from "@langchain/mistralai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import dotenv from "dotenv";
dotenv.config();
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
  const res = await store.similaritySearch("what is google", 1);
  console.log("doc", res);

  const retriever = store.asRetriever({ k: 1 });

  return retriever;
};

documentLoaderAndStore();
