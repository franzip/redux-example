import React from 'react';
import SearchBoxContainer from '../containers/SearchBoxContainer.jsx';
import VisibleArticleList from '../containers/VisibleArticleList.jsx';
import SubmitArticleBox from '../containers/SubmitArticleBox.jsx';

const App = () => (
  <div id="app-container">
    <SearchBoxContainer />
    <VisibleArticleList />
    <SubmitArticleBox />
  </div>
);

export default App;
