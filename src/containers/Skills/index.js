import React, { Component } from 'react';
import { Glyphicon, Collapse, Navbar } from 'react-bootstrap';
import sortBy from 'lodash.sortby';
import { skillContainer, skillCategoryPanelHeader } from './skill';
import './style.css';

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
          <Navbar.Text>
            ALPACCA WHATEVER
          </Navbar.Text>
          <Navbar.Text>
            <Glyphicon className='skillPanelHeaderGlyph' glyph='tag' /> {earnedBadges.length}
            <Glyphicon className='skillPanelHeaderGlyph' glyph='star' /> {earnedStars}
          </Navbar.Text>
      </Navbar>
      {categories.map((category) => {
        const categorySkillIds = category.skills.map(skill => skill.key);
        const categoryBadges = earnedBadges.filter(badge => categorySkillIds.includes(badge.skillId));
        const isOpen = this.state.panelOpen[category.key];
        const showsAll = this.state.panelShowsAll[category.key];
        return <div key={category.key} className="panel panel-default">
          {skillCategoryPanelHeader({
            category,
            earnedCategoryBadgeCount: categoryBadges.length,
            earnedCategoryStarCount: categoryBadges.reduce((sum, {value}) => sum + value, 0),
            handleToggle: this.handleToggle,
            handleToggleShowAll: this.handleToggleShowAll,
            isOpen,
            showsAll
          })}
          <Collapse in={isOpen}>
            <div className="panel-body">
              {category.skills.map((skill, idx) => skillContainer({
                color: category.color,
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