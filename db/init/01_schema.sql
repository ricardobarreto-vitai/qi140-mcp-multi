CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS logs (
  id UUID PRIMARY KEY,
  received_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  ip TEXT,
  provider TEXT,
  model TEXT,
  latency_ms INTEGER,
  status_code INTEGER,
  error TEXT,
  prompt_snapshot TEXT,
  request_json JSONB,
  response_json JSONB
);

CREATE INDEX IF NOT EXISTS idx_logs_received_at ON logs (received_at DESC);
CREATE INDEX IF NOT EXISTS idx_logs_provider_model ON logs (provider, model);