import { combineReducers } from 'redux';
import redditReducer from './reducers';
import dataReducer from '../../hoc/reducers';

const rootReducer = combineReducers({
  reddit: redditReducer,
  datastore: dataReducer,
});

export default rootReducer;
