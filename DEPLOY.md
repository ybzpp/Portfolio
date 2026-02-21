# Деплой портфолио на VPS (Ubuntu 24.04)

Пошаговая инструкция: развёртывание Next.js на VPS, подключение домена и SSL (Let's Encrypt).

---

## 1. Подготовка VPS

- Создайте VPS на Ubuntu 24.04 (любой провайдер: DigitalOcean, Timeweb, Selectel, и т.д.).
- Подключитесь по SSH:
  ```bash
  ssh root@ВАШ_IP
  ```
  или с пользователем:
  ```bash
  ssh пользователь@ВАШ_IP
  ```

---

## 2. Установка Node.js на сервере

```bash
# Обновление пакетов
sudo apt update && sudo apt upgrade -y

# Установка Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Проверка
node -v   # v20.x.x
npm -v
```

---

## 3. Установка Nginx и PM2

```bash
# Nginx — веб-сервер и reverse proxy
sudo apt install -y nginx

# PM2 — менеджер процессов для Node.js
sudo npm install -g pm2
```

---

## 4. Загрузка проекта на сервер

**Вариант A: Git — выкачать нужную ветку сразу в /var/www/portfolio**

На сервере (подставьте свой репозиторий и ветку, например `main` или `new-site`):

```bash
sudo apt install -y git
sudo mkdir -p /var/www && sudo chown $USER:$USER /var/www

# Клонирование конкретной ветки сразу в нужную папку (папка будет создана)
git clone -b ВЕТКА https://github.com/ВАШ_ЮЗЕР/Portfolio.git /var/www/portfolio
cd /var/www/portfolio
```

Пример для ветки `new-site`:

```bash
git clone -b new-site https://github.com/ВАШ_ЮЗЕР/Portfolio.git /var/www/portfolio
cd /var/www/portfolio
```

Через SSH:

```bash
git clone -b new-site git@github.com:ВАШ_ЮЗЕР/Portfolio.git /var/www/portfolio
cd /var/www/portfolio
```

Если папка уже есть и нужно просто подтянуть ветку:

```bash
cd /var/www/portfolio
git fetch origin
git checkout ВЕТКА
git pull origin ВЕТКА
```

**Вариант B: через SCP с локального ПК**

На вашем компьютере (в папке с проектом):

```bash
# Собрать проект локально и отправить
npm run build
scp -r . next.config.* package*.json public app components data node_modules пользователь@ВАШ_IP:/var/www/portfolio/
```

Лучше на сервере делать `git clone` и затем `npm install` и `npm run build`, чтобы не тащить `node_modules`.

---

## 4a. Деплой одной командой (Docker)

Чтобы не выполнять кучу команд вручную: на сервере достаточно установить Docker и один раз настроить `.env`, затем деплой — одной командой.

**Установка Docker на Ubuntu 24.04 (один раз):**

```bash
sudo apt update && sudo apt install -y ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update && sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo usermod -aG docker $USER
# выйти и зайти по SSH заново, чтобы группа docker применилась
```

**Выкатить проект с нужной ветки и запустить одной командой:**

```bash
# Подставьте свой репозиторий и ветку
REPO=https://github.com/ВАШ_ЮЗЕР/Portfolio.git BRANCH=new-site ./deploy.sh
```

Скрипт `deploy.sh` (лежит в репозитории) сам клонирует ветку в `/var/www/portfolio`, создаёт `.env` из примера при отсутствии и запускает `docker compose up -d --build`. Первый раз нужно создать `.env` и заполнить `TELEGRAM_BOT_TOKEN` и `TELEGRAM_CHAT_ID`:

```bash
cd /var/www/portfolio
cp .env.example .env && nano .env
docker compose up -d --build
```

Дальше Nginx и SSL настраиваются как в шагах 7–9 (proxy_pass на `http://127.0.0.1:3000`).

**Обновление при Docker-деплое:**

```bash
cd /var/www/portfolio
git pull origin ВЕТКА
docker compose up -d --build
```

Или снова через скрипт (он подтянет ветку и пересоберёт контейнер):

```bash
cd /var/www/portfolio && BRANCH=new-site ./deploy.sh
```

---

## 5. Переменные окружения (Telegram и прочее)

Форма обратной связи отправляет уведомления в Telegram. Без настроенного бота заявки не будут доходить.

На сервере создайте файл `.env` в корне проекта:

```bash
cd /var/www/portfolio
nano .env
```

Добавьте (подставьте свои значения):

```env
TELEGRAM_BOT_TOKEN=123456:ABCdef...
TELEGRAM_CHAT_ID=123456789
```

**Как получить:**
- **TELEGRAM_BOT_TOKEN** — в Telegram откройте [@BotFather](https://t.me/BotFather), создайте бота командой `/newbot`, скопируйте выданный токен.
- **TELEGRAM_CHAT_ID** — напишите боту любое сообщение, затем откройте [@userinfobot](https://t.me/userinfobot), отправьте ему любое сообщение — он пришлёт ваш `Id` (это и есть chat_id для личных сообщений). Для группы: добавьте бота в группу, отправьте сообщение в группу, откройте в браузере `https://api.telegram.org/bot<ВАШ_ТОКЕН>/getUpdates` и найдите `"chat":{"id":-123456789}`.

После изменения `.env` перезапустите приложение: `pm2 restart portfolio`.

**Админка:** в проекте нет встроенной веб-админки. Все заявки с формы приходят в Telegram — это и есть ваш канал уведомлений. При необходимости позже можно добавить отдельную страницу `/admin` с авторизацией.

---

## 6. Сборка и запуск приложения на сервере

```bash
cd /var/www/portfolio

# Зависимости
npm install --production=false
npm run build

# Запуск через PM2 (порт 3000 по умолчанию)
pm2 start npm --name "portfolio" -- start

# Автозапуск при перезагрузке сервера
pm2 startup
pm2 save
```

Проверка: откройте в браузере `http://ВАШ_IP:3000`. Если видите сайт — переходите к Nginx.

---

## 7. Настройка Nginx (reverse proxy)

Создайте конфиг сайта (замените `yourdomain.com` на свой домен):

```bash
sudo nano /etc/nginx/sites-available/portfolio
```

Содержимое (пока без SSL):

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Включите сайт и проверьте конфиг:

```bash
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## 8. Подключение домена (DNS)

В панели управления доменом (где купили домен) создайте A-записи:

| Тип | Имя  | Значение   | TTL  |
|-----|------|------------|------|
| A   | @    | ВАШ_IP_VPS| 300  |
| A   | www  | ВАШ_IP_VPS| 300  |

Подождите 5–30 минут (иногда до 24 часов), затем проверьте:

```bash
ping yourdomain.com
ping www.yourdomain.com
```

Когда пинг идёт на ваш IP — можно запрашивать SSL.

---

## 9. SSL-сертификат (Let's Encrypt)

Установите Certbot и получите сертификат:

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Certbot спросит email (для уведомлений) и согласие с условиями. После этого он сам изменит конфиг Nginx и добавит редирект HTTP → HTTPS.

Проверка автообновления сертификата:

```bash
sudo certbot renew --dry-run
```

Обычно обновление уже настроено по таймеру (раз в ~90 дней).

---

## 10. Итоговая проверка

- Откройте в браузере: `https://yourdomain.com` и `https://www.yourdomain.com`.
- Убедитесь, что нет предупреждений о сертификате.

---

## 11. Обновление сайта после изменений

**Без Docker (PM2):**

```bash
cd /var/www/portfolio
git pull
npm install
npm run build
pm2 restart portfolio
```

**С Docker:**

```bash
cd /var/www/portfolio
git pull origin ВЕТКА
docker compose up -d --build
```

---

## Краткий чеклист

**Вариант без Docker:**  
1. VPS Ubuntu 24.04 + SSH.  
2. Установить: Node.js 20, Nginx, PM2, Git.  
3. Клонировать нужную ветку в `/var/www/portfolio`: `git clone -b ВЕТКА URL /var/www/portfolio`. Создать `.env`, затем `npm install`, `npm run build`, `pm2 start`.  
4. Nginx: конфиг в `sites-available`, `proxy_pass` на `http://127.0.0.1:3000`.  
5. DNS: A-записи @ и www на IP VPS.  
6. Certbot: `certbot --nginx -d yourdomain.com -d www.yourdomain.com`.

**Вариант с Docker (одной командой после настройки):**  
1. Установить Docker и Docker Compose на VPS.  
2. Один раз: `REPO=... BRANCH=new-site ./deploy.sh`, затем создать/заполнить `.env`, снова `docker compose up -d --build`.  
3. Nginx и SSL — как выше (proxy_pass на 3000, certbot).

Если что-то пойдёт не так — проверьте логи:

- Приложение: `pm2 logs portfolio`
- Nginx: `sudo tail -f /var/log/nginx/error.log`
