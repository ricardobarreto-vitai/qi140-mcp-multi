import { createHttpApp } from './server/http.js';
import { docsRouter } from './routes/docs.js';
import { webhookRouter } from './routes/webhook.js';
import { config } from './config.js';
import { Pool } from 'pg';
import { LogRepo } from './logging/logRepo.js';
import { startMcpServerIfEnabled } from './mcp/server.js';

async function main() {
  const app = createHttpApp();

  const pool = new Pool({ connectionString: config.databaseUrl });
  const logRepo = new LogRepo(pool);

  if (config.swaggerEnable) {
    app.use('/', docsRouter());
  }

  app.use('/', webhookRouter(logRepo));

  app.listen(config.apiPort, () => {
    console.log(`API escutando na porta ${config.apiPort}`);
  });

  // Opcional: inicia MCP (placeholder)
  await startMcpServerIfEnabled(config.mcpEnable);
}

main().catch((err) => {
  console.error('Falha ao iniciar a aplicação:', err);
  process.exit(1);
});