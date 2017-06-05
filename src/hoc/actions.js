export const REQUEST_DATA = 'REQUEST_DATA';
export const RECEIVE_DATA = 'RECEIVE_DATA';
export const INVALIDATE_DATA = 'INVALIDATE_DATA';

export function invalidateData(cacheKey) {
  return {
    type: INVALIDATE_DATA,
    cacheKey,
  };
}

export function requestData(cacheKey, service) {
  return {
    type: REQUEST_DATA,
    cacheKey,
    service,
  };
}

export function receiveData(cacheKey, json) {
  return {
    type: RECEIVE_DATA,
    cacheKey,
    payload: json.data.children.map(child => child.data),
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
