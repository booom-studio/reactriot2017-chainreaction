import React, { Component } from 'react';
import { Button, Glyphicon, Collapse } from 'react-bootstrap';

const accordionHeader = ({category, handleToggle}) => <span>
  <span onClick={() => handleToggle(category.key)}>{category.name}</span>
  <Button type='button' bsStyle='primary-outline' bsSize={'sm'}>

  </Button>
</span>;

export default class Skills extends Component {
  state = {
    panelOpen: {}
  };

  handleToggle = (key) => {
    this.setState({
      panelOpen: Object.assign({}, this.state.panelOpen, {[key]: !this.state.panelOpen[key]})
    });
  };

  render() {
    const categories = Object.keys(this.props.categories || {}).map(key => ({key, ...this.props.categories[key]}));
    const skills = Object.keys(this.props.skills || {}).map(key => ({key, ...this.props.skills[key]}));
    return <div>
      {categories.map((category) => {
        const categorySkills = skills.filter(skill => skill.categoryId === category.key);
        return <div className="panel panel-default">
          <div className="panel-heading" style={{backgroundColor: category.color}}>
            {accordionHeader({category, handleToggle: this.handleToggle})}
          </div>
          <Collapse in={this.state.panelOpen[category.key]}>
            <div className="panel-body">
              <ul>{categorySkills.map((s, idx) => <li key={idx}>{JSON.stringify(s, null, 2)}</li>)}</ul>
            </div>
          </Collapse>
        </div>;
      })}
    </div>;
  }
}