import React from 'react';
import { connect } from 'react-redux';
import Reddit from './Reddit';
import { selectSubreddit } from './actions';
import fetchable from '../../hoc/fetchable';

function mapStateToProps(state) {
  const selectedSubreddit = state.reddit;
  return {
    selectedSubreddit,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onSelectSubreddit: subreddit => dispatch(selectSubreddit(subreddit)),
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

export default connect(mapStateToProps, mapDispatchToProps)(
  fetchable(props => redditApi(props.selectedSubreddit), Reddit, CustomLoader)
);

/* Wrapped component handles loading states */
// export default connect(mapStateToProps, mapDispatchToProps)(fetchable(props => redditApi(props.selectedSubreddit), AsyncApp, null));

// export default fetchable({ uri: 'https://www.reddit.com/r/reactjs.json' }, AsyncApp);
