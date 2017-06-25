import React, { Component } from 'react';
import { InputGroup, Glyphicon } from 'react-bootstrap';

export default class SearchField extends Component {
  state = {
    search: ''
  };

  handleChange = (event) => {
    const search = event.target.value;
    this.handleSearch(search);
    this.setState({search});
  }

  handleSearch = (search) => {
    search = search === undefined ? this.state.search : search;
    this.props.onSearch(search);
  }

  render() {
    return <InputGroup>
      <InputGroup.Addon onClick={() => this.handleSearch()}>
        <Glyphicon glyph='search' />
      </InputGroup.Addon>
      <input type='text'
             onChange={this.handleChange}
             className='form-control' placeholder='Search' />
    </InputGroup>;
  }
}
