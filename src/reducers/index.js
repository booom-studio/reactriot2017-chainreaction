import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import { firebaseStateReducer } from 'react-redux-firebase'

import appReducer from './app';

export default combineReducers({
  router: routerReducer,
  firebase: firebaseStateReducer,
  app: appReducer
});
