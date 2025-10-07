import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

export function createHttpApp() {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json({ limit: '10mb' }));
  app.get('/health', (_req, res) => res.json({ ok: true }));
  app.get('/ready', (_req, res) => res.json({ ready: true }));
  return app;
}