import { config } from '../config.js';
import { createOpenAIClient } from './openaiClient.js';

export type LLMClient = ReturnType<typeof createOpenAIClient>;

export function getLLMClient(): { client: LLMClient; model: string; provider: string } {
  if (config.provider === 'OPENAI') {
    const client = createOpenAIClient(config.openaiApiKey, config.openaiBaseUrl);
    return { client, model: config.llmModel, provider: 'OPENAI' };
  }
  // GENERIC with OpenAI-compatible API
  const baseURL = `${config.llmBaseUrl.replace(/\/$/, '')}:${config.llmPort}/v1`;
  const client = createOpenAIClient('no-key', baseURL);
  return { client, model: config.llmModel, provider: 'GENERIC' };
}