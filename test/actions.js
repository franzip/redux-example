import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import expect from 'expect';
import * as ActionTypes from '../client/src/actions';
import articles from '../data/articles.json';

const article = { id: '123', header: 'Lorem', body: 'Ipsum', timestamp: (new Date()).toString() };

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('Blog actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('creates RECEIVE_ARTICLES when fetching articles has been done', () => {
    nock('http://localhost:3000')
      .get('/articles')
      .reply(200, articles);

    const store = mockStore({ articles: [], visibilityFilter: '' });
    const expectedActions = [ { type: ActionTypes.RECEIVE_ARTICLES, articles } ];

    return store.dispatch(ActionTypes.fetchArticles())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      });
  });

  it('creates RECEIVE_ARTICLE when fetching a single article has been done', () => {
    nock('http://localhost:3000')
      .get('/articles/123')
      .reply(200, article);

    const store = mockStore({ articles: [], visibilityFilter: '' });
    const expectedActions = [ { type: ActionTypes.RECEIVE_ARTICLE, article } ];

    return store.dispatch(ActionTypes.fetchArticle('123'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
