FROM mcr.microsoft.com/devcontainers/typescript-node:1-20-bullseye

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm && pnpm install --frozen-lockfile && npx playwright install-deps && rm -rf /var/lib/apt/lists/*
