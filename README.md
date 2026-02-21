# Sergey Korolev — Portfolio

Портфолио Game Developer & Motion Designer. Тёмная тема, неоновые акценты, анимации (Framer Motion + GSAP).

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

Рекомендуется деплой на **Vercel** (поддержка Next.js из коробки).

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

- **Email**: в компоненте `Footer` замените `your@email.com` на свой.
- Ссылки на соцсети уже подставлены из текущего портфолио (Telegram, Itch.io, LinkedIn, GitHub, Ludum Dare). При необходимости добавьте ArtStation, Behance в `components/Footer.tsx`.

### Фото и текст «Обо мне»

В `components/About.tsx`:

- Замените плейсхолдер «Ваше фото» на `<Image>` с вашим изображением.
- Отредактируйте текст, Hard/Soft Skills и таймлайн опыта.

## Структура

- `app/` — страницы (главная, проект по slug)
- `components/` — Header, Hero, Portfolio, About, Footer
- `data/projects.json` — данные проектов
- `lib/youtube.ts` — преобразование ссылок YouTube в embed

## Адаптивность

Вёрстка рассчитана на мобильные и десктоп; навигация и сетка портфолио подстраиваются под ширину экрана.
