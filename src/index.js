import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import { Provider } from 'react-redux'
import store from './store';

import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router'
import createBrowserHistory from 'history/createBrowserHistory'

export const history = createBrowserHistory();

ReactDOM.render(<Provider store={store}>
  <ConnectedRouter history={history}>
    <Route exact path="/" component={App} />
  </ConnectedRouter>
</Provider>, document.getElementById('root'));

registerServiceWorker();
