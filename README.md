## API NODE.JS NOTE

---

A nodejs Typescript API with user authentication management, using JWT, mongodb Atlas and express

---

## Table of Contents

1. [Install](#install)
2. [.env](#env)
3. [Run Project](#run)
4. [Run Test](#run-test)

---

<a name="install"></a>

## Install

- clone le projet

```
$ git clone https://github.com/JKS9/api-nodejs-note.git
```

- change la route

```
$ cd ./api-nodejs-note/
```

- installe les dépendences

```
$ npm install
```

<a name="env"></a>

## .env

```
MONGODB_URL="XXXXXXXXXXXXXXXXXXXXXXXXX" (string)

PORT=XXXX (number)

ACCESS_TOKEN_PRIVATE_KEY="XXXXXXXXXXXXX" (string)

REFRESH_TOKEN_PRIVATE_KEY="XXXXXXXXXXXXXXX" (string)

SALT=XX (number)
```

<a name="run"></a>

## Run Project

```
$ npm run start
```

<a name="run-test"></a>

## Run tests

```
$ npm run tests
```
