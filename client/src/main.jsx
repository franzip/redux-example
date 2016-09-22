import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import App from './components/App.jsx';
import reducer from './reducers';
import { fetchArticles } from './actions';

// use Thunk middleware to perform API calls
const store = createStore(reducer, applyMiddleware(thunkMiddleware));
// populate store on load
setTimeout(() => store.dispatch(fetchArticles()), 1000);
// start polling
setInterval(() => store.dispatch(fetchArticles()), 30000);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
