import React, { Component } from 'react';
import { InputGroup, Glyphicon } from 'react-bootstrap';

export default class SearchField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    };
  }

  handleChange(event) {
    const search = event.target.value;
    this.handleSearch(search);
    this.setState({search});
  }

  handleSearch(search) {
    search = search === undefined ? this.state.search : search;
    console.log(`Searching for "${search}"...`); // TODO
  }

  render() {
    return <InputGroup>
      <InputGroup.Addon onClick={() => this.handleSearch()}>
        <Glyphicon glyph='search' />
      </InputGroup.Addon>
      <input type='text'
             onChange={this.handleChange.bind(this)}
             className='form-control' placeholder='Search' />
    </InputGroup>;
  }
}
