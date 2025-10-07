import { Pool } from 'pg';
import { config } from '../config/index.js';

const pool = new Pool({ connectionString: config.dbUrl });

export async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS logs (
      id SERIAL PRIMARY KEY,
      request_id VARCHAR(50) UNIQUE NOT NULL,
      timestamp TIMESTAMP DEFAULT NOW(),
      input_json JSONB NOT NULL,
      output_json JSONB,
      model VARCHAR(100),
      latency_ms INT,
      error BOOLEAN DEFAULT FALSE,
      message TEXT DEFAULT NULL
    );
  `);
}

export async function saveLog(requestId, inputJson, outputJson, model, latencyMs, error = false) {
  await pool.query(
    `INSERT INTO logs (request_id, input_json, output_json, model, latency_ms, error)
     VALUES ($1,$2,$3,$4,$5,$6)
     ON CONFLICT (request_id) DO UPDATE SET 
       output_json=$3, latency_ms=$5, error=$6;`,
    [requestId, inputJson, outputJson, model, latencyMs, error]
  );
}

export default pool;