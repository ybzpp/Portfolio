#!/bin/bash
# Однокомандный деплой: клонирует нужную ветку в /var/www/portfolio и поднимает Docker.
# Использование:
#   REPO=https://github.com/USER/Portfolio.git BRANCH=new-site ./deploy.sh
#   или отредактируйте REPO и BRANCH ниже и запустите ./deploy.sh

set -eu
REPO="${REPO:-https://github.com/ybzpp/Portfolio.git}"
BRANCH="${BRANCH:-new-site}"
TARGET="/var/www/portfolio"

echo "→ Клонирование $REPO ветка $BRANCH в $TARGET"
sudo mkdir -p "$(dirname "$TARGET")"
if [ -d "$TARGET/.git" ]; then
  echo "→ Папка уже есть, делаю git pull"
  cd "$TARGET"
  git fetch origin "$BRANCH"
  git checkout "$BRANCH"
  git pull --ff-only origin "$BRANCH"
else
  if [ -d "$TARGET" ] && [ -n "$(ls -A "$TARGET")" ]; then
    echo "Каталог $TARGET не пуст и не является Git-репозиторием. Сначала сохраните его содержимое." >&2
    exit 1
  fi
  git clone -b "$BRANCH" "$REPO" "$TARGET"
  cd "$TARGET"
fi

echo "→ Запуск Docker Compose (build + up -d)"
docker compose up -d --build

echo "→ Готово. Сайт на порту 3000. Настройте Nginx на proxy_pass http://127.0.0.1:3000 и SSL (certbot)."
