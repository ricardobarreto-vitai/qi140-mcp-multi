# Etapa 1: Dependências
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --no-audit --no-fund

# Etapa 2: Build
FROM node:20-alpine AS build
WORKDIR /app

# Copia arquivos necessários da etapa deps
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package*.json ./

# Copia código-fonte e configs
COPY tsconfig.json ./
COPY src ./src
COPY openapi ./openapi
COPY prompts ./prompts

RUN npm run build

# Etapa 3: Runtime (otimizada)
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /app/dist ./dist
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./
COPY openapi ./openapi
COPY prompts ./prompts

CMD ["node", "dist/index.js"]