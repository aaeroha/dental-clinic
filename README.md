# Dr. Bochenkov — Стоматолог-хирург, имплантолог, ортопед

Современный адаптивный сайт врача-стоматолога **Боченкова Романа Викторовича** (Москва, м. Калужская, ул. Обручева, 34/63с1).

## Предварительный просмотр (Live Preview)

- **GitHub Pages (Preview):** [https://aaeroha.github.io/dental-clinic/](https://aaeroha.github.io/dental-clinic/)
- **Основной домен:** [https://drbochenkov.ru/](https://drbochenkov.ru/)

## Стек и ключевые возможности

- **Frontend:** React 18, React Router 6, Bootstrap 5, Sass (CSS-переменные), Swiper
- **Дизайн и UX:**
  - Переключение **светлой и тёмной темы** (с сохранением выбора в `localStorage`)
  - Интерактивный **Scrollytelling** в блоке «Как проходит лечение» с синхронизированной 3D-визуализацией
  - Кастомная карусель **«До и После»** с перетаскиваемым ползунком и полноэкранным просмотром
  - Галерея сертификатов с Lightbox-просмотром и анимированным фоном
  - Единое окно выбора записи (**WhatsApp**, **Telegram**, **прямой звонок**)
  - Оптимизированные адаптивные WebP-изображения отдельно для Desktop и Mobile
- **SEO и аналитика:**
  - Полная SEO-разметка для Google и Яндекса (`Schema.org` JSON-LD: `Dentist`, `Person`, `FAQPage`), `robots.txt`, `sitemap.xml`
  - **Яндекс.Метрика** запускается строго после подтверждения согласия в cookie-баннере, с настроенными целями (`click_whatsapp`, `click_telegram`, `click_phone`, `view_portfolio_ba`, `open_certificate`, `faq_open` и др.)

## Локальный запуск

```bash
npm install
npm start
```

## Сборка для продакшена

```bash
npm run build
```
