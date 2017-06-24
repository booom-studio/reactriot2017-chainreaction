import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import BadgeSetDetails from './BadgeSetDetails';

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
      <Route path='/badge-sets/:badgeSetKey'
             component={BadgeSetDetails} />
      <Route path='/react-riot'
             render={() => <App namespace='react-riot' />} />
      <Route path='/'
             render={() => <App namespace='badge-system' />} />
    </Switch>
  </ConnectedRouter>
</Provider>, document.getElementById('root'));

registerServiceWorker();
