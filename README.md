# Sergey Korolev — Portfolio

Портфолио AI Product Engineer: Playable Ads, отдельный шоурил, игры и кейсы сервисов.
Тёмная тема, неоновые акценты, анимации (Framer Motion + GSAP).

## Стек

- **Next.js 14** (App Router)
- **React 18**, **TypeScript**
- **Tailwind CSS**
- **Framer Motion** — микро-анимации, появление блоков, переходы
- **GSAP** — параллакс, ScrollTrigger (опционально)

## Запуск

```bash
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

## Сборка и деплой

```bash
npm run build
npm start
```

Актуальная Next.js-версия находится в ветке `new-site`; `main` содержит прежний сайт.
Скрипт `deploy.sh` по умолчанию использует `new-site` для деплоя через Docker Compose.

## Контент

### Видео на главной (Hero)

Положите в папку `public/`:

- **showreel.mp4** — зацикленное видео 5–10 сек без звука для фона Hero.  
  Если файла нет, фон останется градиентом.

### Изображения проектов

Скопируйте папку **res** с превью проектов в **public/res/**.

Имена файлов должны совпадать с путями в `data/projects.json` (например: `image LD57.png`, `image robby island escape.png` и т.д.).

### Редактирование проектов

Все проекты задаются в **data/projects.json**:

- `slug` — URL страницы проекта (`/projects/slug`)
- `category`: `gamedev` | `motion` | `cross`
- `cover` — путь к обложке в `public/`
- `videoUrl` — ссылка на YouTube для встраивания
- `links` — кнопки (Play, Watch video, Itch.io, Ludum Dare и т.д.)

### Контакты и соцсети

- **Email**: адрес задан в компоненте `Footer`. Контакты — почта и соцсети; форма отключена.
- Ссылки на соцсети уже подставлены из текущего портфолио (Telegram, Itch.io, LinkedIn, GitHub, Ludum Dare). При необходимости добавьте ArtStation, Behance в `components/Footer.tsx`.

### Фото и текст «Обо мне»

В `components/About.tsx`:

- Фото и голографическая карточка заданы в `components/About.tsx`.
- Тексты на русском и английском находятся в `lib/i18n.ts`; навыки и таймлайн — в `components/About.tsx`.

## Структура

- `app/` — страницы (главная, проект по slug)
- `components/` — Header, Hero, Portfolio, About, Footer
- `data/projects.json` — данные проектов
- `lib/youtube.ts` — преобразование ссылок YouTube в embed

## Адаптивность

Вёрстка рассчитана на мобильные и десктоп; навигация и сетка портфолио подстраиваются под ширину экрана.

## Playable Ads

Каталог плейблов находится в `data/playables.json`, HTML-сборки — в `public/playables/<slug>/index.html`.
По клику открывается модальный плеер с перезапуском, полноэкранным режимом и закрытием по Escape.
Игры загружаются только при открытии и выгружаются при закрытии.

Импортировать исходные HTML-сборки и удалить встроенные прелоудеры:

```powershell
node scripts/import-playables.mjs "E:\WORK\Playables\my"
```

Скрипт сохраняет оригиналы, извлекает иконки, удаляет разметку, стили и анимацию прелоудера,
а также не относящийся к игре Cloudflare-скрипт, добавленный при сохранении HTML.
Код движка и игровые ресурсы остаются в HTML. Событие `luna:started` сообщает плееру о готовности игры.
Обложки `preview.jpg` сняты из работающих игр; повторный импорт их сохраняет.
Git не меняет переводы строк в HTML-сборках, чтобы не повредить встроенные сжатые ресурсы.

## Шоурил и игры

Шоурил берётся из записи со `slug: "showreel"` в `data/projects.json` и показывается отдельным
крупным блоком. Сетка игр показывает записи с `category: "gamedev"`.

## Сервисы и AI-продукты

Кейсы сервисов добавляются в `data/services.json`. Пока каталог пуст, отображается блок будущих кейсов.
Формат одной записи:

```json
{
  "slug": "service-name",
  "title": "Название сервиса",
  "description": "Problem, solution and result in English.",
  "descriptionRu": "Задача, решение и результат на русском.",
  "tags": ["AI", "Web"],
  "url": "https://your-service.example",
  "cover": "/res/service-cover.webp"
}
```

`cover` необязателен. Запись сразу появится в разделе сервисов без правок компонентов.
