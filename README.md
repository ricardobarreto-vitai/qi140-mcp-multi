# qi140-mcp-multi
MCP Server multifinalitario
MCP Atendimento AI (Docker)

- Mantém o endpoint POST /webhook/atendimento-ai com o mesmo payload do fluxo atual [2].
- Prompt carregado de prompts/prompt.txt, equivalente ao usado no N8N [1].
- Logs de entrada/saída em PostgreSQL.
- Documentação OpenAPI/Swagger em /docs.

Uso
1) Configure .env (ou use defaults):
   cp .env.example .env

2) Suba com Docker:
   docker-compose up --build

3) Teste:
   curl --location 'http://localhost:8080/webhook/atendimento-ai' \
     --header 'Content-Type: application/json' \
     --data '{ "body": { "texts": [ { "cn": { "id": "x" }, "patient_id": "123" } ] } }'

Provedores de LLM
- GENERIC: ajuste LLM_BASE_URL, LLM_PORT, LLM_MODEL (API compatível com OpenAI).
- OPENAI: defina PROVIDER=OPENAI e OPENAI_API_KEY (e LLM_MODEL).

Banco de dados
- Volume pgdata persiste os dados.
- Esquema criado por db/init/01_schema.sql.

Swagger
- GET /docs e /docs/openapi.json

Observação MCP
- Inicialização opcional (MCP_ENABLE=true).
- O arquivo src/mcp/server.ts possui o placeholder para registrar tools/resources conforme o SDK.

Referências
- Fluxo e prompt (ResumoClínico) [1]
- Exemplo de request e rota /webhook/atendimento-ai [2]