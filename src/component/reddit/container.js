import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectSubreddit } from './actions';
import Picker from './Picker';
import Posts from './Posts';
import fetchable from '../../hoc/fetchable';
// import { requestData } from '../../hoc/actions';

class AsyncApp extends Component {
  // constructor(props) {
  //   super(props);
  //   // this.handleChange = this.handleChange.bind(this);
  //   // this.handleRefreshClick = this.handleRefreshClick.bind(this);
  // }

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

  // handleChange(nextSubreddit) {
  //   this.props.dispatch(selectSubreddit(nextSubreddit));
  //   //this.props.dispatch(fetchPostsIfNeeded(nextSubreddit));
  // }


  render() {
    const { selectedSubreddit, payload, isFetching, lastUpdated, fetchCacheKey, onInvalidateCache, onSelectSubreddit } = this.props;
    return (
      <div>
        <Picker value={selectedSubreddit} onChange={(nextSubreddit) => onSelectSubreddit(nextSubreddit)} options={['reactjs', 'frontend']} />
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>}
          {!isFetching &&
            <button onClick={() => onInvalidateCache(fetchCacheKey)}>
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
};

function mapStateToProps(state) {
  const selectedSubreddit = state.reddit;
  return {
    selectedSubreddit,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onSelectSubreddit: (subreddit) => dispatch(selectSubreddit(subreddit)),
  };
};


function redditApi(subreddit = 'reactjs') {
  return {
    uri: `https://www.reddit.com/r/${subreddit}.json`,
  };
}

// Fetchable can take either a api service object, or
// a function which recieves props and state, and returns an api service object

/* using default loading component */
// export default connect(mapStateToProps, mapDispatchToProps)(fetchable(props => redditApi(props.selectedSubreddit), AsyncApp));


/* Passing a custom loading component */
const CustomLoader = () => <h1>Whoop !!!</h1>;
export default connect(mapStateToProps, mapDispatchToProps)(fetchable(props => redditApi(props.selectedSubreddit), AsyncApp, CustomLoader));

/* Wrapped component handles loading states */
// export default connect(mapStateToProps, mapDispatchToProps)(fetchable(props => redditApi(props.selectedSubreddit), AsyncApp, null));



// export default fetchable({ uri: 'https://www.reddit.com/r/reactjs.json' }, AsyncApp);
