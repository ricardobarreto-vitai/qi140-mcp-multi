import 'dotenv/config';

export type Provider = 'GENERIC' | 'OPENAI';

export const config = {
  apiPort: parseInt(process.env.API_PORT || '8080', 10),
  provider: (process.env.PROVIDER || 'GENERIC') as Provider,
  llmBaseUrl: process.env.LLM_BASE_URL || 'http://localhost',
  llmPort: process.env.LLM_PORT || '8000',
  llmModel: process.env.LLM_MODEL || 'meta.llama-3.2-90b-vision-instruct',
  openaiApiKey: process.env.OPENAI_API_KEY || '',
  openaiBaseUrl: process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1',
  promptFile: process.env.PROMPT_FILE || '/app/prompts/prompt.txt',
  databaseUrl: process.env.DATABASE_URL || 'postgres://appuser:apppass@localhost:5432/appdb',
  swaggerEnable: (process.env.SWAGGER_ENABLE || 'true') === 'true',
  mcpEnable: (process.env.MCP_ENABLE || 'false') === 'true'
};

if (config.provider === 'OPENAI' && !config.openaiApiKey) {
  console.warn('OPENAI provider selected but OPENAI_API_KEY is not set.');
}