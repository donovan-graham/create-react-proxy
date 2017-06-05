import { combineReducers } from 'redux';
import redditReducer from './component/reddit/reducers';
import dataReducer from './hoc/reducers';

const rootReducer = combineReducers({
  reddit: redditReducer,
  datastore: dataReducer,
});

export default rootReducer;
