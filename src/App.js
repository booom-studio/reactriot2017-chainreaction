import React, { Component } from 'react';
import './App.css';
import PropTypes from 'prop-types';

import { firebaseConnect, dataToJS } from 'react-redux-firebase';

import { connect } from 'react-redux'

import { Grid, Col, Row } from 'react-bootstrap';
import TopNavigation from './TopNavigation';

class App extends Component {
  static propTypes = {
    dataNamespace: PropTypes.string.isRequired
  };

  render() {
    return (
      <div>
        <TopNavigation />
        <Grid>
          <Col md={12}>
            <Row>
              <h1>H1 for hello!</h1>
            </Row>
          </Col>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = ({firebase}, {dataNamespace}) => ({
  skills: dataToJS(firebase, `/${dataNamespace}/skills`),
  categories: dataToJS(firebase, `/${dataNamespace}/categories`)
});
const mapDispatchToProps = dispatch => ({});
export default firebaseConnect(({dataNamespace}) => [
  `/${dataNamespace}/categories`,
  `/${dataNamespace}/skills`
])(
    connect(mapStateToProps, mapDispatchToProps)(App));

