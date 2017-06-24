import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';

import registerServiceWorker from './registerServiceWorker';
import './index.css';

import { Provider } from 'react-redux'
import store from './store';

import { ConnectedRouter } from 'react-router-redux';
import { Route, Redirect } from 'react-router'
import createBrowserHistory from 'history/createBrowserHistory'

export const history = createBrowserHistory();

ReactDOM.render(<Provider store={store}>
  <ConnectedRouter history={history}>
    <div>
      <Route path='/:namespace' component={App} />
      <Route exact path='/' render={() => <Redirect to='/badge-system'/>}/>
    </div>
  </ConnectedRouter>
</Provider>, document.getElementById('root'));

registerServiceWorker();
