export const REQUEST_DATA = 'REQUEST_DATA';
export const RECEIVE_DATA = 'RECEIVE_DATA';
export const INVALIDATE_DATA = 'INVALIDATE_DATA';

export function invalidateData(service) {
  return {
    type: INVALIDATE_DATA,
    service,
  };
}

export function requestData(service) {
  return {
    type: REQUEST_DATA,
    service,
  };
}

export function receiveData(service, json) {
  return {
    type: RECEIVE_DATA,
    service,
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
