export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT';

export const REQUEST_DATA = 'REQUEST_DATA';
export const RECEIVE_DATA = 'RECEIVE_DATA';
export const INVALIDATE_DATA = 'INVALIDATE_DATA';

export function selectSubreddit(subreddit) {
  return {
    type: SELECT_SUBREDDIT,
    subreddit,
  };
}

export function invalidateData(subreddit) {
  return {
    type: INVALIDATE_DATA,
    subreddit,
  };
}

export function requestData(subreddit) {
  return {
    type: REQUEST_DATA,
    subreddit,
  };
}

export function receiveData(subreddit, json) {
  return {
    type: RECEIVE_DATA,
    subreddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now(),
  };
}

// function shouldFetchPosts(state, subreddit) {
//   const posts = state.postsBySubreddit[subreddit];
//   if (!posts) {
//     return true;
//   } else if (posts.isFetching) {
//     return false;
//   } else {
//     return posts.didInvalidate;
//   }
// }
