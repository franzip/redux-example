import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { editArticle } from '../actions';

class ArticleComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false
    };
    this.onEditClick = this.onEditClick.bind(this);
  }

  onEditClick() {
    const { isEditing } = this.state;
    const { dispatch, id } = this.props;
    const header = this.header.textContent;
    const body = this.body.textContent;
    // edit article through API call
    if (isEditing && header.length && body.length) {
      dispatch(editArticle(id, header, body));
    }
    // flip article editable state
    this.setState({
      isEditing: !isEditing
    });
  }

  render() {
    const { isEditing } = this.state;
    const { onArticleRemoveClick, header, body, timestamp, id } = this.props;
    const buttonText = isEditing ? 'Save' : 'Edit';
    const posted = (new Date(timestamp)).toDateString();

    return (
      <article id={id} className="article">
        <header>
          {/* toggle element outline if content is being edited */}
          <h2
            className={isEditing ? 'editable-content' : ''}
            ref={(c) => { this.header = c; }}
            contentEditable={isEditing}
          >
            {header}
          </h2>
        </header>
        <div className="article-date">
          {posted}
        </div>
        <div className="article-body">
          <p
            className={isEditing ? 'editable-content' : ''}
            ref={(c) => { this.body = c; }}
            contentEditable={isEditing}
          >
            {body}
          </p>
        </div>
        <div className="article-inputs">
          <button className="btn btn-standard" onClick={this.onEditClick}>{buttonText}</button>
          <button className="btn btn-danger" onClick={onArticleRemoveClick}>Remove</button>
        </div>
      </article>
    );
  }
}

ArticleComponent.propTypes = {
  id: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  onArticleRemoveClick: PropTypes.func.isRequired,
  header: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired
};

const Article = connect()(ArticleComponent);

export default Article;
