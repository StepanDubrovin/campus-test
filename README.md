# Campus Todo API

## Описание

REST API для управления задачами (TODO), написанный на **Node.js** с использованием **Express**, **TypeScript** и **JWT-аутентификацией**. Поддерживает создание, обновление, удаление и получение задач. Проект контейнеризован с помощью **Docker**.

---

## Функционал

- Регистрация и вход пользователей (JWT)
- CRUD-операции с задачами
- Фильтрация задач по статусу
- Валидация входных данных через `express-validator`
- Обработка ошибок с кастомными `ApiError`
- Защищенные маршруты с middleware `authenticateJWT`

---

## Технологии

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)

---

## Быстрый старт (через Docker)

### 1. Клонировать репозиторий

```bash
git clone https://github.com/StepanDubrovin/campus-test.git
cd campus-test
```

### 2. Установить зависимости

```bash
npm install
```

### 3. Создать файл `.env` в корне проекта и заполнить переменные:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_DATABASE=campus_todo
DB_MIN=0
DB_MAX=10
DB_TIMEOUTMILLIS=30000
PORT=3000
SESSION_DURATION=3600
JWT_SECRET=your_jwt_secret
SALT_ROUNDS=10
```

### 4. Собрать и запустить контейнер

```bash
docker compose up --build
```

Приложение будет доступно по адресу: [http://localhost:3000](http://localhost:3000)

## Скрипты

```bash
npm run dev      # Запуск в режиме разработки
npm run build    # Сборка проекта
npm start        # Запуск production-версии
```
