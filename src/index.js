import React from 'react';
import ReactDOM from 'react-dom';
import List from './containers/List';
import Details from './containers/Details';

import registerServiceWorker from './registerServiceWorker';
import './index.css';

import { Provider } from 'react-redux'
import store from './store';

import { ConnectedRouter } from 'react-router-redux';
import { Route, Switch } from 'react-router'
import createBrowserHistory from 'history/createBrowserHistory'

export const history = createBrowserHistory();

ReactDOM.render(<Provider store={store}>
  <ConnectedRouter history={history}>
    <Switch>
      <Route path='/badge-sets/:badgeSetId'
             component={Details} />
      <Route path='/react-riot'
             render={() => <List namespace='react-riot' />} />
      <Route path='/'
             render={() => <List namespace='badge-system' />} />
    </Switch>
  </ConnectedRouter>
</Provider>, document.getElementById('root'));

registerServiceWorker();
