#!/bin/bash
# Однокомандный деплой: клонирует нужную ветку в /var/www/portfolio и поднимает Docker.
# Использование:
#   REPO=https://github.com/USER/Portfolio.git BRANCH=main ./deploy.sh
#   или отредактируйте REPO и BRANCH ниже и запустите ./deploy.sh

set -e
REPO="${REPO:-https://github.com/ybzpp/Portfolio.git}"
BRANCH="${BRANCH:-main}"
TARGET="/var/www/portfolio"

echo "→ Клонирование $REPO ветка $BRANCH в $TARGET"
sudo mkdir -p "$(dirname "$TARGET")"
if [ -d "$TARGET/.git" ]; then
  echo "→ Папка уже есть, делаю git pull"
  cd "$TARGET"
  git fetch origin "$BRANCH"
  git checkout "$BRANCH"
  git pull origin "$BRANCH"
else
  sudo rm -rf "$TARGET"
  git clone -b "$BRANCH" "$REPO" "$TARGET"
  cd "$TARGET"
fi

if [ ! -f .env ]; then
  echo "→ Создайте .env (TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID). Пример: cp .env.example .env && nano .env"
  cp -n .env.example .env 2>/dev/null || true
fi

echo "→ Запуск Docker Compose (build + up -d)"
docker compose up -d --build

echo "→ Готово. Сайт на порту 3000. Настройте Nginx на proxy_pass http://127.0.0.1:3000 и SSL (certbot)."
