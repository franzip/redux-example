import { connect } from 'react-redux';
import ArticleList from '../components/ArticleList.jsx';
import { removeArticle } from '../actions';

// simple article filtering (matching text filter against header or body)
const filterArticles = (filter, articles) => {
  return !filter ? articles : articles.filter((article) => {
    const insensitiveFilter = filter.toLowerCase();
    let { header, body } = article;
    header = header.toLowerCase();
    body = body.toLowerCase();
    return ~header.indexOf(insensitiveFilter) || ~body.indexOf(insensitiveFilter);
  });
};
// show latest articles first
const sortArticles = (articles) => {
  const sortedArticles = articles;
  sortedArticles.sort((a, b) => {
    const dateA = new Date(b.timestamp).getTime();
    const dateB = new Date(a.timestamp).getTime();
    return dateA > dateB ? 1 : -1;
  });
  return sortedArticles;
};
// feed articles list componente with filtered and sorted articles
const mapStateToProps = state => ({
  articles: sortArticles(filterArticles(state.visibilityFilter, state.articles))
});

const mapDispatchToProps = dispatch => ({
  onArticleRemoveClick: (id) => {
    if (confirm('Are you sure?')) {
      dispatch(removeArticle(id));
    }
  }
});

const VisibleArticleList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleList);

export default VisibleArticleList;
