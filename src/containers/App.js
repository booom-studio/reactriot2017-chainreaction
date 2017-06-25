import React, { Component } from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux'
import { Route } from 'react-router'

import { namespaceChange } from '../actions';
import List from './List';
import Details from './Details';

class App extends Component {
  componentWillReceiveProps(nextProps) {
    if(this.props.match.params.namespace !== nextProps.match.params.namespace) {
      this.props.namespaceChange(nextProps.match.params.namespace);
    }
  }

  componentWillMount() {
    this.props.namespaceChange(this.props.match.params.namespace);
  }

  render() {
    const { url } = this.props.match;
    return (<div>
      <Route path={`${url}/badge-sets/:badgeSetId`} component={Details} />
      <Route exact path={`${url}`} component={List} />
    </div>);
  }
}

const mapDispatchToProps = dispatch => ({
  namespaceChange: namespace => {
    dispatch(namespaceChange(namespace));
  }
});

const ConnectedApp = connect(null, mapDispatchToProps)(App);
export default firebaseConnect(({
  match: {
    params: {
      namespace = 'badge-system'
    }
  }
}, firebase) => [`/${namespace}`])(ConnectedApp);
