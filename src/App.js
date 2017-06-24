import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { firebaseConnect } from 'react-redux-firebase';
import map from 'lodash.map';
import { connect } from 'react-redux'

import { namespaceChange } from './actions';

import UserBadgeSet from './containers/UserBadgeSet';


import { Grid, Col, Row } from 'react-bootstrap';
import TopNavigation from './TopNavigation';

class App extends Component {
  static propTypes = {
    namespace: PropTypes.string.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if(this.props.namespace !== nextProps.namespace) {
      this.props.namespaceChange(nextProps.namespace);
    }
  }

  componentWillMount() {
    this.props.namespaceChange(this.props.namespace);
  }

  render() {
    const {
      namespace
    } = this.props;

    return (
      <div>
        <TopNavigation />
        <Grid>
          <Col md={12}>
            <Row>
            	  <UserBadgeSet badgeSetId='badge-set-1' />
              <h1>H1 for hello!</h1>
            </Row>
          </Col>
        </Grid>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  namespaceChange: namespace => {
    dispatch(namespaceChange(namespace));
  }
});

const ConnectedApp = connect(null, mapDispatchToProps)(App);
export default firebaseConnect(({ namespace }) => `/${namespace}`)(ConnectedApp);
