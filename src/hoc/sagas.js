import { call, put, takeLatest } from 'redux-saga/effects';

import { REQUEST_DATA, receiveData } from './actions';

export function fetchUrl(uri) {
  return fetch(uri).then(response => response.json());
}

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* onRequestData(action) {
  try {
    const json = yield call(fetchUrl, action.service.uri);
    yield put(receiveData(action.service, json));
  } catch (e) {
    yield put({ type: 'USER_FETCH_FAILED', message: e.message });
  }
}

function* watchSaga() {
  yield takeLatest(REQUEST_DATA, onRequestData);
}

export default [watchSaga];
