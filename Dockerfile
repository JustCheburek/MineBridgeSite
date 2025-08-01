# 1. Базовый образ с Bun (включает и Node.js)
FROM oven/bun:latest

# 2. Рабочая директория
WORKDIR /app

# 3. Копируем файл зависимостей и устанавливаем их
COPY package.json bun.lockb ./
RUN bun install

# 4. Копируем весь код и собираем проект
COPY . .
RUN bun run build

# 5. Открываем порт (при необходимости)
EXPOSE 3000
EXPOSE 3100

# 6. Команда запуска
CMD ["bun", "run", "start"]
