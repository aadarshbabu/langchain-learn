import { ChatMistralAI } from "@langchain/mistralai";

import { ChatPromptTemplate } from "@langchain/core/prompts";

import {
  BaseOutputParser,
  CommaSeparatedListOutputParser,
  FormatInstructionsOptions,
  StringOutputParser,
  StructuredOutputParser,
} from "@langchain/core/output_parsers";

import z from "zod";

import * as dotenv from "dotenv";

dotenv.config();

const model = new ChatMistralAI({
  model: "mistral-large-latest",
  temperature: 0.7,
});

const prompt = ChatPromptTemplate.fromTemplate(
  "You are a helpful ai which give the best answer in user ${question}"
); // It's a system message where user message injected via question.

const promptStructure = ChatPromptTemplate.fromTemplate(
  "Helpful AI assistant ${question}"
);

// class MyParser extends BaseOutputParser {
//   getFormatInstructions(options?: FormatInstructionsOptions): string {
//     throw new Error("Method not implemented.");
//   }
//   lc_namespace!: string[];
//   async parse(output: string): Promise<string[]> {
//     console.log("Custom Parser:", output);
//     return Promise.resolve(output.split(","));
//   }
// }

(async () => {
  // pipe is a input output chain in the langchain. where one runnable provide the output into another runnable.

  const stringParser = new StringOutputParser();
  const listOutPutParser = new CommaSeparatedListOutputParser();

  // const structureOutputParser = StructuredOutputParser.fromNamesAndDescriptions(
  //   {
  //     name: "name of the person",
  //     age: "this is age or the 30 year",
  //   }
  // );

  const zodStructureParser = StructuredOutputParser.fromZodSchema(
    z.object({
      name: z.string().describe("name of the person"),
      age: z.number().describe("this is age or the 30 year"),
      rollNo: z.number().describe("Role number of the student"),
      marks: z.number().describe("marks of the student"),
    })
  );
  // const customParser = new MyParser();

  // const chain = prompt.pipe(model).pipe(listOutPutParser); // it's call the
  const chain = promptStructure.pipe(model);

  // - prompt output is pipe in modal
  // - modal output is pipe to the string parser.
  // - when chain invoke then modal get the prompt and modal output return output is a input of the string parser. \

  const response = await chain.invoke({
    question: "give a fruit name is comma separated",
  }); // the chain is invoked. You can pipe.

  // const prompt = await promptTemplate.invoke({
  //   question: "hello can you help me",
  // });

  // const response = await model.invoke(prompt);

  console.log("response", response);

  // for await (const chunk of response) {
  //   process.stdout.write(chunk);
  // }

  // const res = await model.invoke("hello can you help me");

  // console.log(res);
})();
