# Проект "Mesto"

Это учебный проект в рамках курса **Веб-Разработчик** на платформе [Яндекс Практикум](https://practicum.yandex.ru/).
Это завершающий этап создания интерактивного сервиса просмотра карточек с фотографиями, включающего в себя **фронтенд** и **бэкенд**, в котором можно регистрировать и авторизировать пользователя, редактировать его данные, а также можно просматривать фотографии других пользователей, ставить лайки, добавлять свои фотографии и удалять их. Ссылка на репозиторий проекта: [https://github.com/MaximNabiulin/react-mesto-api-full](https://github.com/MaximNabiulin/react-mesto-api-full).

* Публичный IP: 130.193.48.76
* Бэкенд сайта: [api.mesto.nabiulin.nomoredomains.icu](api.mesto.nabiulin.nomoredomains.icu)
* Фронтенд сайта: [mesto.nabiulin.nomoredomains.icu](mesto.nabiulin.nomoredomains.icu)

## Фронтенд
------

Фронтенд часть расположена в дирректории `frontend/` и написана на [JavaScript](https://developer.mozilla.org/ru/docs/Web/JavaScript) с использованием фреймворка [React](https://reactjs.org/) и утилиты [Create React App](https://create-react-app.dev/).

Верстка проекта осуществлялась по макету в Figma:
* [Часть 1](https://www.figma.com/file/2cn9N9jSkmxD84oJik7xL7/JavaScript.-Sprint-4?node-id=0%3A1)
* [Часть 2](https://www.figma.com/file/bjyvbKKJN2naO0ucURl2Z0/JavaScript.-Sprint-5?node-id=0%3A1)
* [Часть 3](https://www.figma.com/file/kRVLKwYG3d1HGLvh7JFWRT/JavaScript.-Sprint-6?node-id=0%3A1)
* [Часть 4](https://www.figma.com/file/5H3gsn5lIGPwzBPby9jAOo/Sprint-14-RU?node-id=0%3A1)

### Использование
------
* Установите [Node js](https://nodejs.org/en/)
* Установите [Git](https://git-scm.com/download/)
* Клонируйте [Проект](https://github.com/MaximNabiulin/react-mesto-api-full) используя **Tерминал** или **GitBash** (для Windows)
* Установите необходимые зависимости из package.json используя команду 'npm i'
* Для локального запуска в файле auth.js в папке utils необходимо раскомментировать сроку 2 и закомментировать строку 4 чтобы значение baseUrl стало равным 'http://localhost:3001' и и в терминале запустите команду 'npm run start'
* Для сборки проекта используйте команду 'npm run build'

## Технологии
------
### Верстка
* Flexbox-верстка
* Grid Layout
* Адаптивная верстка
* Трансформация и плавный переход
* Верстка форм
* Медиазапросы

### React
* Разметка страницы с использованием JSX
* Функциональные компоненты.
* Использованы хуки React.useState, React.useEffect, React.createContext.

### API
С помощью запросов на сервер методом fetch
* Осуществляется регистрация и авторизация пользователя.
* Загружаются, изменяются и хранятся данные профиля и аватар пользователя.
* Загружаются карточки с сервера, осуществляется добавление и удаление карточек, загружаются и изменяются лайки пользователей.

Файловая структура организована по БЭМу.

## Бэкенд
------
Бэкэнд - серверная часть проекта, написанная с помощью веб-фреймворка [Express](https://expressjs.com/ru/) для приложений [Node js](https://nodejs.org/en/) и взаимодействующую с базой данных [MongoDB](https://www.mongodb.com/).

### Использование
------
* Установите [Node js](https://nodejs.org/en/)
* Установите [Git](https://git-scm.com/download/)
* Клонируйте [Проект](https://github.com/MaximNabiulin/react-mesto-api-full) используя **Tерминал** или **GitBash** (для Windows)
* Установите необходимые зависимости из package.json используя команду 'npm install'
* Для локального запуска в файле users.js в папке controllers необходимо раскомментировать сроку 26 и закомментировать строку 27 чтобы значение domain стало равным 'http://localhost:3000' и и в терминале запустите команду 'npm run start'. Для запуска в режиме разработчика с горячим перезапуском введите команду 'npm run dev'.
* Для тестирования сервера можно использовать утилиту [Postman](https://www.postman.com/api-platform/api-testing/).

### Запросы и эндпоинты
------
* POST /signup - регистрация пользователя
* POST /signin - вход пользователя
------
* GET /users/me - найти текущего пользователя
* GET /users — найти всех пользователей
* GET /users/:userId - найти пользователя по _id
* POST /users — создать пользователя
* PATCH /users/me — обновить данные профиля
* PATCH /users/me/avatar — обновить аватар
------
* GET /cards — найти все карточки
* POST /cards — создать карточку
* DELETE /cards/:cardId — удалить карточку по _id
* PUT /cards/:cardId/likes — поставить лайк карточке по _id
* DELETE /cards/:cardId/likes — убрать лайк с карточки по _id

## Технологии
------
* Модули express, mongoose, route
* Схемы и модели mongoose
* Контроллеры и роуты
* Шифрование пароля с bcryptjs
* Передача данных через Куки
* Централизованная обработка ошибок
* Логирование запросов и ошибок с помощью winston и expressWinston
* Валидация приходящих данных с Joi и celebrate
* Поддержка CORS
* Использование Middlewares

