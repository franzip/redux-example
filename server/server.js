'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const idFactory = require('./helpers').idFactory;
const validateArticle = require('./helpers').validateArticle;
const headers = { 'Content-Type': 'application/json' };

// load articles in memory
const articles = require('../data/articles.json');

app.use(bodyParser.json());

// CORS settings
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  next();
});

app.use((req, res, next) => {
  res.set(headers);
  next();
})

app.get('/articles', (req, res) => {
  res.send(articles);
});

app.post('/articles', (req, res) => {
  const header = req.body.header;
  const body = req.body.body;

  const error = validateArticle({ header, body });

  if (error) {
    return res.status(400).send(error);
  }

  const id = idFactory();
  const article = { id, header, body, timestamp: new Date() };
  articles.push(article);

  res.status(201).send(article);
});

app.get('/articles/:id', (req, res) => {
  // find article by id
  const article = articles.filter((article) => article.id === req.params.id)[0];

  if (article) {
    res.send(article);
  } else {
    res.status(404).send('Not found');
  }
});

app.put('/articles/:id', (req, res) => {
  // retrieve article index
  const articleIdx = articles
    .map((article, idx) => ({ id: article.id, idx: idx }))
    .filter((metadata) => metadata.id === req.params.id)[0];

  if (!articleIdx) {
    return res.status(404).send('Not found');
  }

  let article = articles[articleIdx.idx];
  const header = req.body.header || article.header;
  const body = req.body.body || article.body;

  const error = validateArticle({ header, body });

  if (error) {
    return res.status(400).send(error);
  }

  article.body = body;
  article.header = header;
  // overwrite in memory article
  articles[articleIdx.idx] = article;
  res.send(article);
});

app.delete('/articles/:id', (req, res) => {
  // retrieve article index
  const articleIdx = articles
    .map((article, idx) => ({ id: article.id, idx: idx }))
    .filter((metadata) => metadata.id === req.params.id)[0];

  if (articleIdx) {
    articles.splice(articleIdx.idx, 1);
  }

  res.status(204).send();
});

function start() {
  var port = process.env.PORT || 3000;
  app.listen(port, () => {
    /* eslint-disable */
    console.log('API Server started');
    /* eslint-enable */
  });
}

exports.start = start;
exports.app = app;
