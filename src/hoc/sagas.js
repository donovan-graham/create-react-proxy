import { call, put, takeLatest } from 'redux-saga/effects';

import { REQUEST_DATA, receiveData } from './actions';

export function fetchUrl(subreddit) {
  return fetch(`https://www.reddit.com/r/${subreddit}.json`).then(response => response.json());
}

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* onRequestData(action) {
  try {
    const json = yield call(fetchUrl, action.subreddit);
    yield put(receiveData(action.subreddit, json));
  } catch (e) {
    yield put({ type: 'USER_FETCH_FAILED', message: e.message });
  }
}

function* watchSaga() {
  yield takeLatest(REQUEST_DATA, onRequestData);
}

export default [watchSaga];
