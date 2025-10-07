import dotenv from 'dotenv';
dotenv.config();

export const config = {
  apiPort: process.env.API_PORT || 8080,
  provider: process.env.PROVIDER || 'GENERIC',
  llmBaseUrl: process.env.LLM_BASE_URL,
  llmPort: process.env.LLM_PORT,
  llmModel: process.env.LLM_MODEL,
  openAiKey: process.env.OPENAI_API_KEY,
  openAiBaseUrl: process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1',
  promptFile: process.env.PROMPT_FILE || '/app/prompts/prompt.txt',
  dbUrl: process.env.DATABASE_URL!,
};