import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import SearchField from './SearchField';

export default class TopNavigation extends Component {
  render() {
    return <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/">React devs, unite !!1</Link>
        </Navbar.Brand>
      </Navbar.Header>
      <ul className="nav navbar-nav pull-right">
        <li className='navbar-form'>
          <SearchField onSearch={this.props.onSearch} />
        </li>
      </ul>
    </Navbar>;
  }
}