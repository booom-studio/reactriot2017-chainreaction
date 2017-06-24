import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { firebaseConnect, dataToJS } from 'react-redux-firebase';

import { connect } from 'react-redux'

class App extends Component {
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
      </div>
    );
  }
}

const mapStateToProps = ({firebase}) => ({
  skills: dataToJS(firebase, '/badge-system/skills'),
  categories: dataToJS(firebase, '/badge-system/categories')
});
const mapDispatchToProps = dispatch => ({});
export default firebaseConnect('/badge-system')(connect(mapStateToProps, mapDispatchToProps)(App));
