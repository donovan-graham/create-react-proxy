import { INVALIDATE_DATA, REQUEST_DATA, RECEIVE_DATA } from './actions';

function posts(
  state = {
    isFetching: false,
    didInvalidate: false,
    payload: [],
  },
  action
) {
  switch (action.type) {
    case INVALIDATE_DATA:
      return Object.assign({}, state, {
        didInvalidate: true,
      });
    case REQUEST_DATA:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
      });
    case RECEIVE_DATA:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        payload: action.payload,
        lastUpdated: action.receivedAt,
      });
    default:
      return state;
  }
}

function dataReducer(state = {}, action) {
  switch (action.type) {
    case INVALIDATE_DATA:
    case RECEIVE_DATA:
    case REQUEST_DATA:
      return Object.assign({}, state, {
        [action.cacheKey]: posts(state[action.cacheKey], action),
      });
    default:
      return state;
  }
}

export default dataReducer;
