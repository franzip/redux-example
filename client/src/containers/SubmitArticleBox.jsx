import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { addArticle } from '../actions';

const SubmitArticleComponent = ({ dispatch }) => {
  let header;
  let body;

  return (
    <div className="submit-article-container">
      <div className="submit-article">
        <h3>Add a New Article</h3>
        <fieldset>
          <p>
            <label htmlFor="input-header">Header</label>
            <textarea
              cols="30"
              rows="10"
              id="input-header"
              ref={(node) => { header = node; }}
            />
          </p>
          <p>
            <label htmlFor="input-body">Body</label>
            <textarea
              cols="30"
              rows="10"
              type="text"
              id="input-body"
              ref={(node) => { body = node; }}
            />
          </p>
          <div className="btn-container">
            <button
              className="btn btn-standard"
              onClick={(e) => {
                e.preventDefault();

                const headerContent = header.value.trim();
                const bodyContent = body.value.trim();

                if (!headerContent || !bodyContent) {
                  return;
                }
                // add article through API call
                dispatch(addArticle(headerContent, bodyContent));
                header.value = '';
                body.value = '';
                // show newly created article
                window.scrollTo(0, 0);
              }}
            >Add Article
            </button>
          </div>
        </fieldset>
      </div>
    </div>
  );
};

SubmitArticleComponent.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const SubmitArticleBox = connect()(SubmitArticleComponent);

export default SubmitArticleBox;
