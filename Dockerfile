# 1. Билд-образ
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# 2. Рантайм-образ
FROM node:18-alpine AS runner
WORKDIR /app
# копируем собранные файлы и зависимости
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
# порт приложения
EXPOSE 3000
# команда запуска
CMD ["npm", "start"]
