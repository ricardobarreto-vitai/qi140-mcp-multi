import { Router, Request, Response } from 'express';
import { getLLMClient } from '../llm/provider.js';
import { generateSummary } from '../pipeline/clinicalSummary.js';
import { LogRepo } from '../logging/logRepo.js';
import { newId } from '../utils/id.js';
import { config } from '../config.js';

export function webhookRouter(logRepo: LogRepo) {
  const router = Router();

  router.post('/webhook/atendimento-ai', async (req: Request, res: Response) => {
    const started = Date.now();
    const requestId = newId();
    const ip = req.headers['x-forwarded-for']?.toString().split(',')[0] || req.socket.remoteAddress || '';

    try {
      // Extração compatível com o fluxo atual (sem mudar o schema)
      const cn =
        req.body?.body?.texts?.[0]?.cn ??
        req.body?.texts?.[0]?.cn ??
        null;

      const inputForModel = cn ?? req.body;

      const { client, model, provider } = getLLMClient();
      const { summary, promptSnapshot } = await generateSummary(client, model, config.promptFile, inputForModel);
      const latencyMs = Date.now() - started;

      const responsePayload = {
        requestId,
        provider,
        model,
        latencyMs,
        summary
      };

      await logRepo.insert({
        id: requestId,
        ip,
        provider,
        model,
        latencyMs,
        statusCode: 200,
        error: null,
        promptSnapshot,
        requestJson: req.body,
        responseJson: responsePayload
      });

      res.status(200).json(responsePayload);
    } catch (err: any) {
      const latencyMs = Date.now() - started;
      const errorMsg = err?.message || 'Erro inesperado';

      await logRepo.insert({
        id: requestId,
        ip,
        provider: 'UNKNOWN',
        model: 'UNKNOWN',
        latencyMs,
        statusCode: 500,
        error: errorMsg,
        promptSnapshot: undefined,
        requestJson: req.body,
        responseJson: null
      });

      res.status(500).json({ requestId, error: errorMsg });
    }
  });

  return router;
}