# Деплой портфолио на VPS

Актуальный сайт находится в ветке `new-site`. Требуются Docker Compose либо Node.js 22+.
Контакты работают через ссылки на email и Telegram; `.env` и токен бота не нужны.

## Docker Compose

На сервере с установленными Git, Docker и Compose:

```bash
git clone -b new-site https://github.com/ybzpp/Portfolio.git /var/www/portfolio
cd /var/www/portfolio
docker compose up -d --build
docker compose ps
curl -f http://127.0.0.1:3000/
```

Обновление:

```bash
cd /var/www/portfolio
git pull --ff-only origin new-site
docker compose up -d --build
docker compose ps
```

`deploy.sh` выполняет загрузку ветки и запуск Compose. Dockerfile собирает Linux-версию
с Node.js 22, фиксирует зависимости через `npm ci` и запускает standalone-сервер
от непривилегированного пользователя. Healthcheck проверяет главную страницу.
В финальном образе оставлен Node.js; npm, Corepack и Yarn доступны только на этапе сборки.
Порт 3000 доступен только на `127.0.0.1`; публичный доступ обеспечивает Nginx.

## Сборка без Docker

На Linux-сервере с Node.js 22+:

```bash
cd /var/www/portfolio
npm ci
npm run lint
npm run typecheck
npm audit --omit=dev
npm run build
```

Для запуска standalone-сервера скопируйте сборку, статические файлы и `public`:

```bash
mkdir -p run/.next
cp -a .next/standalone/. run/
cp -a .next/static run/.next/
cp -a public run/
cd run
PORT=3000 HOSTNAME=127.0.0.1 node server.js
```

Для постоянной работы используйте PM2/systemd. `start-native.sh` запускает каталог
`/var/www/portfolio/run` через системный Node.js 22+; пути можно переопределить
переменными `NODE`, `APP`, `PIDFILE`, `LOG`.
После обновления сборки работающий процесс нужно перезапустить.

Собирайте на целевой Linux-платформе. Не переносите `node_modules` и standalone-
сборку с Windows: нативные зависимости привязаны к операционной системе.

## Nginx и HTTPS

В существующем конфиге сайта используйте свой домен и upstream:

```nginx
server {
    listen 80;
    server_name YOUR_DOMAIN;
    server_tokens off;

    gzip on;
    gzip_vary on;
    gzip_types text/css application/javascript application/json image/svg+xml;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Проверьте конфигурацию через `sudo nginx -t`, затем перезагрузите Nginx.
Сохраните существующие настройки HTTPS; для нового домена установите сертификат
через Certbot/Let's Encrypt. `metadataBase` в `app/layout.tsx` должен соответствовать
публичному домену сайта.

Сайт отправляет CSP, HSTS (без includeSubDomains/preload), nosniff, Referrer-Policy,
Permissions-Policy и запрет встраивания страниц в сторонние iframe. Для игровых HTML
действует отдельная CSP с `sandbox allow-scripts`: доступны встроенные data/blob-ресурсы,
а внешние запросы, формы, всплывающие окна и доступ к origin сайта запрещены.
Не добавляйте `allow-same-origin` к игровому iframe. Inline-скрипты и стили разрешены
для статической гидратации Next.js; eval разрешён только внутри изолированных игр.

В production запускайте standalone-сервер или `next start`. `next dev` предназначен
для локальной разработки и не должен быть публичным upstream Nginx.
После обновления проверьте заголовки через `curl -I https://YOUR_DOMAIN/` и
`curl -I https://YOUR_DOMAIN/playables/dzo-upgrade/index.html`.

## Проверка после публикации

- Главная страница, `/projects/signal` и `/projects/decryptor-17` отвечают 200.
- Неизвестный `/projects/unknown-project` отвечает 404.
- CRT переключается, RU/EN и мобильное меню работают.
- Все шесть плейблов запускаются, закрываются и перезапускаются.
- Шоурил воспроизводится; ссылки itch.io, Steam и YouTube открываются.
- На главной игровые HTML не загружаются до открытия плеера.

Ресурсы `/res/` кешируются на сутки, `/playables/` — на час; хешированные файлы
Next.js используют длительный immutable-кеш. При публикации новая версия ресурса
с тем же именем может появиться после истечения кеша; для немедленной замены
обложек или игры используйте новое имя файла/путь в каталоге.
