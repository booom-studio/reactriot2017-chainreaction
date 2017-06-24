import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};
const middlewares = [
    thunk
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