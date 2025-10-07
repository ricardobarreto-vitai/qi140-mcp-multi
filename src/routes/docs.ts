import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export function docsRouter() {
  const router = Router();
  const openapiPath = path.resolve('openapi/openapi.yaml');
  const doc = yaml.load(fs.readFileSync(openapiPath, 'utf8'));
  router.use('/docs', swaggerUi.serve, swaggerUi.setup(doc));
  router.get('/docs/openapi.json', (_req, res) => res.json(doc));
  return router;
}