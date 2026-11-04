# Калькулятор типографии (React JS)

Профессиональное модульное приложение для расчета стоимости полиграфической продукции на основе прайсов «Апрош», офсета «Камзол» и каталога вырубных форм бумажных пакетов.

## Быстрый старт локально:
1. Распакуйте архив в любую удобную папку.
2. В терминале папки выполните:
```bash
npm install
npm run dev
```
3. Откройте адрес `http://localhost:5173` в браузере.

## Публикация на GitHub Pages:
1. Загрузите файлы репозитория на GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/ВАШ_ЛОГИН/ИМЯ_РЕПОЗИТОРИЯ.git
git push -u origin main
```
2. Для автоматической сборки создайте ветку `gh-pages` через скрипт `npm run build` или включите GitHub Actions:
В настройках репозитория: **Settings -> Pages -> Build and deployment**:
- Source: **GitHub Actions** -> Выберите шаблон **Static HTML / Vite**.
Либо соберите билд локально:
```bash
npm run build
```
Папка `dist` содержит готовый сайт, который можно опубликовать напрямую!
