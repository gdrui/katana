* Create deck: POST /decks
* List decks: GET /decks
* Open deck: GET /decks/:id
* Draw cards: PATCH /decks/:id/draw?count=3



## 1. Start DB
```bash
$ docker-compose up -d
```

## 2. Setup
```bash
$ npm install
```

## 3. Run API

```bash
$ npm run start
```

## Run e2e tests

```bash
$ npm run test:e2e
```

## Run unit tests

```bash
$ npm run test
```
