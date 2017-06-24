import React, { Component } from 'react';
import { InputGroup, Button, Glyphicon } from 'react-bootstrap';

export default class SearchField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    };
  }

  handleChange(event) {
    const search = event.target.value;
    if (event.key === 'Enter') this.handleSearch(search);
    this.setState({search});
  }

  handleSearch(search) {
    search = search === undefined ? this.state.search : search;
    console.log(`Searching for "${search}"...`); // TODO
  }

  render() {
    return <InputGroup>
      <input type='text'
             onKeyPress={this.handleChange.bind(this)}
             className='form-control' placeholder='Search' />
      <span className='input-group-btn'
            onClick={() => this.handleSearch()}>
              <Button>
                <Glyphicon glyph='search' />
              </Button>
            </span>
    </InputGroup>;
  }
}
