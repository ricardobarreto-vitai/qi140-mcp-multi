import { Pool } from 'pg';

export interface LogRecord {
  id: string;
  ip?: string;
  provider: string;
  model: string;
  latencyMs?: number;
  statusCode?: number;
  error?: string | null;
  promptSnapshot?: string;
  requestJson?: any;
  responseJson?: any;
}

export class LogRepo {
  constructor(private pool: Pool) {}

  async insert(rec: LogRecord): Promise<void> {
    const sql = `
      INSERT INTO logs (id, ip, provider, model, latency_ms, status_code, error, prompt_snapshot, request_json, response_json)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
    `;
    const params = [
      rec.id,
      rec.ip || null,
      rec.provider,
      rec.model,
      rec.latencyMs ?? null,
      rec.statusCode ?? null,
      rec.error ?? null,
      rec.promptSnapshot ?? null,
      rec.requestJson ?? null,
      rec.responseJson ?? null
    ];
    await this.pool.query(sql, params);
  }
}