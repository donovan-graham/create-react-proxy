import { SELECT_SUBREDDIT } from './actions';

function redditReducer(state = 'reactjs', action) {
  switch (action.type) {
    case SELECT_SUBREDDIT:
      return action.subreddit;
    default:
      return state;
  }
}

export default redditReducer;
