import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PropTypes from 'prop-types';

import { firebaseConnect, dataToJS } from 'react-redux-firebase';

import { connect } from 'react-redux'

class App extends Component {
  static propTypes = {
    dataNamespace: PropTypes.string.isRequired
  };

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <ul>
          {Object.values(this.props.skills || []).map(skill => <li key={skill.name}>{skill.name}</li>)}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = ({firebase}, {dataNamespace}) => ({
  skills: dataToJS(firebase, `/${dataNamespace}/skills`),
  categories: dataToJS(firebase, `/${dataNamespace}/categories`)
});
const mapDispatchToProps = dispatch => ({});
export default firebaseConnect(({dataNamespace}) => `/${dataNamespace}`)(
    connect(mapStateToProps, mapDispatchToProps)(App));

