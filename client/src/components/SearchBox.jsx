import React, { PropTypes } from 'react';

// bind search input value to visibilityFilter passed through as prop
const SearchBox = ({ visibilityFilter, onChangeFilter }) => (
  <div className="search-container">
    <div className="group">
      <input id="search-box" onChange={onChangeFilter} value={visibilityFilter} type="text" />
      <span className="highlight" />
      <span className="bar" />
      <label htmlFor="search-box">Search in articles</label>
    </div>
  </div>
);

SearchBox.propTypes = {
  visibilityFilter: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func.isRequired
};

export default SearchBox;
