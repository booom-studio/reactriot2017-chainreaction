import React, { Component } from 'react';
import { Button, Glyphicon, Collapse } from 'react-bootstrap';
import './Skills.css';



const skillCategoryPanelHeader = ({
  category,
  handleToggle,
  isOpen,
  earnedCategoryBadgeCount=0,
  earnedCategoryStarCount=0
}) => <span className='skillPanelHeader'>
  <span onClick={() => handleToggle(category.key)}>
    <Glyphicon glyph={`triangle-${isOpen ? 'top' : 'bottom'}`} style={{marginRight: 5}} />
    {category.name}
    <Glyphicon className='skillPanelHeaderGlyph' glyph='tag' /> {earnedCategoryBadgeCount}
    <Glyphicon className='skillPanelHeaderGlyph' glyph='star' /> {earnedCategoryStarCount}
  </span>

  <span>
    <Button type='button' bsSize={'sm'} className='skillPanelHeaderButton'>
      <Glyphicon glyph='plus' /> Add
    </Button>
    <Button type='button' bsSize={'sm'} className='skillPanelHeaderButton'>
      <Glyphicon glyph='tag' /> See all
    </Button>
  </span>
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
        const isOpen =this.state.panelOpen[category.key];
        return <div className="panel panel-default">
          <div className="panel-heading" style={{backgroundColor: category.color}}>
            {skillCategoryPanelHeader({category, handleToggle: this.handleToggle, isOpen })}
          </div>
          <Collapse in={isOpen}>
            <div className="panel-body">
              <ul>{categorySkills.map((s, idx) => <li key={idx}>{JSON.stringify(s, null, 2)}</li>)}</ul>
            </div>
          </Collapse>
        </div>;
      })}
    </div>;
  }
}