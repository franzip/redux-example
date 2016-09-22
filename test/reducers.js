import expect from 'expect'
import * as ActionTypes from '../client/src/actions';
import reducer from '../client/src/reducers';
import articles from '../data/articles.json';

describe('Blog reducers', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
      articles: [],
      visibilityFilter: ''
    });
  });

  it('should handle RECEIVE_ARTICLES', () => {
    expect(
      reducer([], {
        type: ActionTypes.RECEIVE_ARTICLES,
        articles
      }).articles
    ).toEqual(articles);
  });

  it('should handle RECEIVE_ARTICLE', () => {
    expect(
      reducer({ articles: [] }, {
        type: ActionTypes.RECEIVE_ARTICLE,
        article: articles[0]
      }).articles
    ).toEqual([articles[0]]);
  });

  it('should handle SET_VISIBILITY_FILTER', () => {
    expect(
      reducer({ visibilityFilter: '' }, {
        type: ActionTypes.SET_VISIBILITY_FILTER,
        filter: 'foo'
      })
    ).toEqual({ visibilityFilter: 'foo' });
  });
})
