import React, { Component } from 'react';
import { Button, Glyphicon, Collapse, Navbar, Nav, NavItem } from 'react-bootstrap';
import './Skills.css';

import sortBy from 'lodash.sortby';

const skillCategoryPanelHeader = ({
  category,
  handleToggle,
  handleToggleShowAll,
  isOpen,
  showsAll,
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
    <Button onClick={() => handleToggleShowAll(category.key)}
        type='button' bsSize={'sm'} className='skillPanelHeaderButton'>
      <Glyphicon glyph='tag' /> {showsAll ? 'Hide unused' : 'See all skills'}
    </Button>
  </span>
</span>;

const skillContainer = ({
  skill,
  showsDetails,
  showsAll,
  isEarned,
  category,
  handleSelectSkillDetails=()=>{}
}) => (
    <Collapse in={showsAll || isEarned}>
      <div onClick={() => handleSelectSkillDetails(skill.key)}
           key={skill.key}>
        <strong>{JSON.stringify({skill}, null, 2)}</strong>
        <Collapse in={!!showsDetails}>
          <div>Details...</div>
        </Collapse>
      </div>
    </Collapse>
);

export default class Skills extends Component {
  state = {
    panelOpen: {},
    panelShowsAll: {},
    activeSkillId: false
  };

  handleToggle = (key) => {
    this.setState({
      panelOpen: Object.assign({}, this.state.panelOpen, {[key]: !this.state.panelOpen[key]})
    });
  };

  handleToggleShowAll = (key) => {
    this.setState({
      panelOpen: Object.assign({}, this.state.panelOpen, {[key]: true}),
      panelShowsAll: Object.assign({}, this.state.panelShowsAll, {[key]: !this.state.panelShowsAll[key]})
    });
  };

  handleSelectSkillDetails = (skillId) => {
    this.setState({
      activeSkillId: skillId === this.state.activeSkillId ? false : skillId
    });
  };

  render() {
    const skills = Object.keys(this.props.skills || {}).map(key => ({key, ...this.props.skills[key]}));
    const badges = Object.keys(this.props.badges || {}).map(key => ({key, ...this.props.badges[key]}));
    const earnedBadges = this.props.badgeIds.map(badgeId => this.props.badges[badgeId]);
    const earnedSkillIds = earnedBadges.map(badge => badge.skillId);
    const categories = Object.keys(this.props.categories || {}).map(key => {
      return {
        key,
        ...this.props.categories[key],
        skills: skills.filter(skill => skill.categoryId === key).map(skill => Object.assign(skill, {
          badges: sortBy(badges.filter(badge => badge.skillId === skill.key), 'value')
        }))
      };
    });
    const earnedStars = earnedBadges.reduce((sum, {value}) => sum + value, 0);
    return <div>
      <Navbar>
        <Nav>
          <Navbar.Text>
            ALPACCA WHATEVER
          </Navbar.Text>
          <Navbar.Text>
            <Glyphicon className='skillPanelHeaderGlyph' glyph='tag' /> {earnedBadges.length}
            <Glyphicon className='skillPanelHeaderGlyph' glyph='star' /> {earnedStars}
          </Navbar.Text>
        </Nav>
      </Navbar>
      {categories.map((category) => {
        const categorySkillIds = category.skills.map(skill => skill.key)
        const categoryBadges = earnedBadges.filter(badge => categorySkillIds.includes(badge.skillId));
        const isOpen = this.state.panelOpen[category.key];
        const showsAll = this.state.panelShowsAll[category.key];
        return <div className="panel panel-default">
          <div className="panel-heading" style={{backgroundColor: category.color}}>
            {skillCategoryPanelHeader({
              category,
              earnedCategoryBadgeCount: categoryBadges.length,
              earnedCategoryStarCount: categoryBadges.reduce((sum, {value}) => sum + value, 0),
              handleToggle: this.handleToggle,
              handleToggleShowAll: this.handleToggleShowAll,
              isOpen,
              showsAll
            })}
          </div>
          <Collapse in={isOpen}>
            <div className="panel-body">
              {category.skills.map((skill, idx) => skillContainer({
                skill,
                showsAll,
                isEarned: earnedSkillIds.includes(skill.key),
                showsDetails: this.state.activeSkillId === skill.key,
                handleSelectSkillDetails: this.handleSelectSkillDetails
              }))}
            </div>
          </Collapse>
        </div>;
      })}
    </div>;
  }
}