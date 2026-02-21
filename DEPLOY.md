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

**Вариант A: через Git (рекомендуется)**

На сервере:

```bash
# Установка Git, если ещё нет
sudo apt install -y git

# Клонирование (подставьте свой репозиторий)
cd /var/www
sudo mkdir -p portfolio && sudo chown $USER:$USER portfolio
cd portfolio
git clone https://github.com/ВАШ_ЮЗЕР/Portfolio.git .

# Или по SSH
# git clone git@github.com:ВАШ_ЮЗЕР/Portfolio.git .
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

На сервере:

```bash
cd /var/www/portfolio
git pull
npm install
npm run build
pm2 restart portfolio
```

---

## Краткий чеклист

1. VPS Ubuntu 24.04 + SSH.
2. Установить: Node.js 20, Nginx, PM2, Git.
3. Клонировать проект в `/var/www/portfolio`, создать `.env` с `TELEGRAM_BOT_TOKEN` и `TELEGRAM_CHAT_ID`, затем `npm install`, `npm run build`, `pm2 start`.
4. Nginx: конфиг в `sites-available`, симлинк в `sites-enabled`, `server_name` = ваш домен, `proxy_pass` на `http://127.0.0.1:3000`.
5. DNS: A-записи @ и www на IP VPS.
6. Certbot: `certbot --nginx -d yourdomain.com -d www.yourdomain.com`.

Если что-то пойдёт не так — проверьте логи:

- Приложение: `pm2 logs portfolio`
- Nginx: `sudo tail -f /var/log/nginx/error.log`
