import OpenAI from "openai";

import { env } from "@/env.mjs";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

interface Message {
  role: "system" | "user";
  content: string;
}

interface CompletionOptions {
  systemMessage?: string;
  prompt: string;
  model?: "gpt-3.5-turbo" | "gpt-4";
  responseFormat?: {
    type: "json_object" | "text";
  };
  stream?: boolean;
}

export async function getCompletion({
  systemMessage,
  prompt,
  model = "gpt-3.5-turbo",
  responseFormat,
}: CompletionOptions) {
  const messages: Message[] = [];

  if (systemMessage) {
    messages.push({ role: "system", content: systemMessage });
  }

  messages.push({ role: "user", content: prompt });

  return await openai.chat.completions.create({
    messages,
    model,
    temperature: 0,
    response_format: responseFormat,
  });
}

export async function getStreamingCompletion({
  systemMessage,
  prompt,
  model = "gpt-3.5-turbo",
  responseFormat,
}: CompletionOptions) {
  const messages: Message[] = [];

  if (systemMessage) {
    messages.push({ role: "system", content: systemMessage });
  }

  messages.push({ role: "user", content: prompt });

  return await openai.chat.completions.create({
    messages,
    model,
    temperature: 0,
    response_format: responseFormat,
    stream: true,
  });
}

interface ChatCompletionOptions {
  systemMessage: string;
  messages: Message[];
  model?: "gpt-3.5-turbo" | "gpt-4";
}

export async function getChatCompletion({
  systemMessage,
  messages,
  model = "gpt-3.5-turbo",
}: ChatCompletionOptions) {
  return await openai.chat.completions.create({
    messages: [{ role: "system", content: systemMessage }, ...messages],
    model,
    temperature: 0,
    stream: true,
  });
}

export async function getEmbedding(input: string) {
  const res = await openai.embeddings.create({
    input,
    model: "text-embedding-3-small",
  });

  return res.data[0].embedding;
}
