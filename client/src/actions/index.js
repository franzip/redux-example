import fetch from 'isomorphic-fetch';

const baseUrl = 'http://localhost:3000';

// get all articles
export const RECEIVE_ARTICLES = 'RECEIVE_ARTICLES';

function receiveArticles(articles) {
  return {
    type: RECEIVE_ARTICLES,
    articles
  };
}

export function fetchArticles() {
  return dispatch => fetch(`${baseUrl}/articles`, { method: 'GET', mode: 'cors' })
    .then(response => response.json())
    .then(articles => dispatch(receiveArticles(articles)));
}

// get a single article
export const RECEIVE_ARTICLE = 'RECEIVE_ARTICLE';

function receiveArticle(article) {
  return {
    type: RECEIVE_ARTICLE,
    article
  };
}

export function fetchArticle(id) {
  return dispatch => fetch(`${baseUrl}/articles/${id}`, { method: 'GET', mode: 'cors' })
    .then(response => response.json())
    .then(json => dispatch(receiveArticle(json)));
}

// add an article
export function addArticle(header, body) {
  const payload = JSON.stringify({ header, body });
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Content-Length', payload.length);

  const reqOpts = {
    method: 'POST',
    headers,
    body: payload,
    mode: 'cors'
  };

  return dispatch => fetch(`${baseUrl}/articles`, reqOpts)
    .then(response => response.json())
    .then(json => dispatch(receiveArticle(json)));
}

// edit an article
export function editArticle(id, header, body) {
  const payload = JSON.stringify({ header, body });
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Content-Length', payload.length);

  const reqOpts = {
    method: 'PUT',
    headers,
    body: payload,
    mode: 'cors'
  };

  return dispatch => fetch(`${baseUrl}/articles/${id}`, reqOpts)
    .then(() => dispatch(fetchArticles()));
}

// remove an article
export function removeArticle(id) {
  const reqOpts = {
    method: 'DELETE',
    mode: 'cors'
  };

  return dispatch => fetch(`${baseUrl}/articles/${id}`, reqOpts)
    .then(() => dispatch(fetchArticles()));
}

// set visibility filters
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

export function setVisibilityFilter(filter) {
  return dispatch => dispatch({
    type: SET_VISIBILITY_FILTER,
    filter
  });
}
