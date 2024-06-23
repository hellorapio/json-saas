import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { EXAMPLE_PROMPT, EXAMPLE_ANSWER } from "./prompts";

const genAi = new GoogleGenerativeAI(process.env.GOOGLE!);
const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash" });

type PromiseExecutor<T> = (
  resolve: (value: T) => void,
  reject: (reason?: any) => void
) => void;

class RetryablePromise<T> extends Promise<T> {
  static async retry<T>(
    retries: number,
    executor: PromiseExecutor<T>
  ): Promise<T> {
    return new RetryablePromise<T>(executor).catch((error) => {
      console.error(`Retrying due to error: ${error}`);
      return retries > 0
        ? RetryablePromise.retry(retries - 1, executor)
        : RetryablePromise.reject(error);
    });
  }
}

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  const genericSchema = z.object({
    data: z.string(),
  });

  const { data } = genericSchema.parse(body);

  const content = `
  \n ------------- \n
  DATA: "${data}"
  \n`;

  const validationResult = await RetryablePromise.retry<string>(
    0,
    async (resolve, reject) => {
      try {
        const chat = model.startChat({
          history: [
            {
              role: "user",
              parts: [
                {
                  text: "You are an AI that converts unstructured data into the JSON. You respond with nothing but valid JSON based on the input data, You have no format to work with, you will invent the format based on the data and output the information based on the data and the format you invented. Your output should DIRECTLY be valid JSON, nothing added before or after. You will begin right with the opening curly brace and end with the closing curly brace. Only if you absolutely cannot determine a field, use the value null. ",
                },
              ],
            },
            {
              role: "user",
              parts: [
                {
                  text: EXAMPLE_PROMPT,
                },
              ],
            },
            {
              role: "model",
              parts: [
                {
                  text: EXAMPLE_ANSWER,
                },
              ],
            },
          ],
        });

        const result = await chat.sendMessage(content);
        const text = result.response.text();
        console.log(text);
        const validationResult = JSON.parse(text);
        return resolve(validationResult);
      } catch (err) {
        reject(err);
      }
    }
  );

  return NextResponse.json(validationResult, { status: 200 });
};
