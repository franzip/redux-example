import * as ActionTypes from '../actions';

const initialState = {
  visibilityFilter: '',
  articles: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.RECEIVE_ARTICLES:
      return Object.assign({}, state, {
        articles: action.articles
      });
    case ActionTypes.RECEIVE_ARTICLE:
      return Object.assign({}, state, {
        articles: [
          ...state.articles,
          action.article
        ]
      });
    case ActionTypes.SET_VISIBILITY_FILTER:
      return Object.assign({}, state, {
        visibilityFilter: action.filter
      });
    default:
      return state;
  }
};
