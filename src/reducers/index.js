import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import { firebaseStateReducer } from 'react-redux-firebase'

export default combineReducers({
  router: routerReducer,
  firebase: firebaseStateReducer
});