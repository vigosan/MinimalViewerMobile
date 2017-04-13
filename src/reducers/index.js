import { combineReducers } from 'redux';
import entries from './entries';
import viewers from './viewers';

export default combineReducers({
  entries,
  viewers
});
