import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectSubreddit } from './actions';
import Picker from './Picker';
import Posts from './Posts';
import fetchable from '../../hoc/fetchable';
import { requestData } from '../../hoc/actions';

class AsyncApp extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  // componentDidMount() {
  //   const { dispatch, selectedSubreddit } = this.props;
  //   dispatch(fetchPostsIfNeeded(selectedSubreddit));
  // }

  // componentDidUpdate(prevProps) {
  //   if (this.props.selectedSubreddit !== prevProps.selectedSubreddit) {
  //     const { dispatch, selectedSubreddit } = this.props;
  //     dispatch(fetchPostsIfNeeded(selectedSubreddit));
  //   }
  // }

  handleChange(nextSubreddit) {
    this.props.dispatch(selectSubreddit(nextSubreddit));
    //this.props.dispatch(fetchPostsIfNeeded(nextSubreddit));
  }

  handleRefreshClick(e) {
    e.preventDefault();
    const { dispatch, fetchInvalidate } = this.props;
    dispatch(fetchInvalidate); // nice trick here
  }

  render() {
    const { selectedSubreddit, payload, isFetching, lastUpdated } = this.props;
    return (
      <div>
        <Picker value={selectedSubreddit} onChange={this.handleChange} options={['reactjs', 'frontend']} />
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>}
          {!isFetching &&
            <button onClick={this.handleRefreshClick}>
              Refresh
            </button>}
        </p>
        {isFetching && payload.length === 0 && <h2>Loading...</h2>}
        {!isFetching && payload.length === 0 && <h2>Empty.</h2>}
        {payload.length > 0 &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Posts posts={payload} />
          </div>}
      </div>
    );
  }
}

AsyncApp.propTypes = {
  selectedSubreddit: PropTypes.string.isRequired,
  payload: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const selectedSubreddit = state.reddit;
  return {
    fetchAction: requestData(selectedSubreddit),
    selectedSubreddit,
  };
}

// 'function'
// 'object'
function redditApi(subreddit = 'reactjs') {
  return {
    uri: `https://www.reddit.com/r/${subreddit}.json`,
  };
}

// Fetchable can take either a api service object, or
// a function which recieves props and state, and returns an api service object
export default connect(mapStateToProps)(fetchable(props => redditApi(props.selectedSubreddit), AsyncApp));
// export default connect(mapStateToProps)(fetchable({ uri: 'https://www.reddit.com/r/reactjs.json' }, AsyncApp));
