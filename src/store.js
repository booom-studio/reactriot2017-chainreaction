import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { routerMiddleware } from 'react-router-redux'
import { history } from '.'

const initialState = {};
const middlewares = [
  thunk,
  routerMiddleware(history)
];
const enhancers = [];

// devtools
if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window && window.devToolsExtension;
  if (typeof devToolsExtension === 'function') enhancers.push(devToolsExtension())
}

const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middlewares),
    ...enhancers
));

export default store;