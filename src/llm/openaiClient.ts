import OpenAI from 'openai';

export function createOpenAIClient(apiKey: string, baseURL: string) {
  return new OpenAI({ apiKey, baseURL });
}