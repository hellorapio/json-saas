import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { ZodTypeAny, z } from "zod";
import { EXAMPLE_PROMPT, EXAMPLE_ANSWER } from "./prompts";

const genAi = new GoogleGenerativeAI(process.env.GOOGLE!);
const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash" });

const determineSchemaType = (schema: any): string => {
  if (!schema.hasOwnProperty("type")) {
    if (Array.isArray(schema)) {
      return "array";
    } else {
      return typeof schema;
    }
  }
  return schema.type;
};

const jsonSchemaToZod = (schema: any): ZodTypeAny => {
  const type = determineSchemaType(schema);

  switch (type) {
    case "string":
      return z.string().nullable();
    case "number":
      return z.number().nullable();
    case "boolean":
      return z.boolean().nullable();
    case "array":
      return z.array(jsonSchemaToZod(schema.items)).nullable();
    case "object":
      const shape: Record<string, ZodTypeAny> = {};
      for (const key in schema) {
        if (key !== "type") {
          shape[key] = jsonSchemaToZod(schema[key]);
        }
      }
      return z.object(shape);
    default:
      throw new Error(`Unsupported schema type: ${type}`);
  }
};

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
    format: z.object({}).passthrough(),
  });

  const { data, format } = genericSchema.parse(body);

  const dynamicSchema = jsonSchemaToZod(format);

  const content = `
  \n ------------------------------------ \n
  DATA: "${data}"
  \n ------------------------------------ \n
  Expected JSON format: ${JSON.stringify(format, null, 2)}`;

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
                  text: "You are an AI that converts unstructured data into the attached JSON format. You respond with nothing but valid JSON based on the input data. Your output should DIRECTLY be valid JSON, nothing added before or after. You will begin right with the opening curly brace and end with the closing curly brace. Only if you absolutely cannot determine a field, use the value null. ",
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

        const validationResult = dynamicSchema.parse(
          JSON.parse(text || "")
        );

        return resolve(validationResult);
      } catch (err) {
        reject(err);
      }
    }
  );

  return NextResponse.json(validationResult, { status: 200 });
};
