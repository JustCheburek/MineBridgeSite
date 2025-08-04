# 1. Билд-образ
FROM node:18-alpine AS builder
WORKDIR /app

# 2. Копируем package.json и ставим зависимости
COPY package.json ./
RUN npm install --legacy-peer-deps

# 3. Копируем код и собираем
COPY . .
RUN npm run build

# 4. Рантайм-образ
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV NEXT_TELEMETRY_DISABLED=1

# создаём пользователя без прав root
RUN adduser --system --uid 1001 nextjs

# копируем публичные файлы
COPY --from=builder /app/public ./public

# standalone-сборка Next.js (включает server.js и трассированные файлы)
COPY --from=builder --chown=nextjs:node /app/.next/standalone ./
COPY --from=builder --chown=nextjs:node /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
EXPOSE 3100

CMD ["node", "server.js"]
