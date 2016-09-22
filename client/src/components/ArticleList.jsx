import React, { PropTypes } from 'react';
import Article from './Article.jsx';

class ArticleList extends React.Component {
  render() {
    const { articles, onArticleRemoveClick } = this.props;

    let markup;

    if (articles.length) {
      const articleList = articles.map(article =>
        <Article
          key={article.id}
          {...article}
          onArticleRemoveClick={() => onArticleRemoveClick(article.id)}
        />
      );
      markup = (
        <section id="articles-container">{articleList}</section>
      );
    } else {
      markup = (
        <section id="articles-container">
          <p className="no-content">There are no articles to display</p>
        </section>);
    }
    return markup;
  }
}

ArticleList.propTypes = {
  articles: PropTypes.array.isRequired,
  onArticleRemoveClick: PropTypes.func.isRequired
};

export default ArticleList;
