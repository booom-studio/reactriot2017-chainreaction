import { combineReducers } from 'redux';

export default combineReducers({
  someValue: (state='val', action) => state
});