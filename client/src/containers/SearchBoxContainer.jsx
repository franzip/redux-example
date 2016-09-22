import { connect } from 'react-redux';
import SearchBox from '../components/SearchBox.jsx';
import { setVisibilityFilter } from '../actions';

const mapStateToProps = state => ({
  visibilityFilter: state.visibilityFilter
});

const mapDispatchToProps = dispatch => ({
  onChangeFilter: (e) => {
    dispatch(setVisibilityFilter(e.target.value));
  }
});

const SearchBoxContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBox);

export default SearchBoxContainer;
