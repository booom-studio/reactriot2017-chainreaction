import React, { Component } from 'react';

import sortBy from 'lodash.sortby';
import isEmpty from 'lodash.isempty';

import SkillCategory from './SkillCategory';
import Header from './Header';

import './style.css';

export default class Skills extends Component {
  state = {
    badgeSet: {},
    panelOpen: {},
    panelShowsAll: {},
    activeSkillId: null
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
      activeSkillId: skillId === this.state.activeSkillId ? null : skillId
    });
  };

  render() {
    const skills = Object.keys(this.props.skills || {}).map(key => ({key, ...this.props.skills[key]}));
    const badges = Object.keys(this.props.badges || {}).map(key => ({key, ...this.props.badges[key]}));
    const earnedBadges = Object.values(this.props.badgeSet.badgeIds).map(badgeId => this.props.badges[badgeId])
      .filter(badge => !isEmpty(badge));
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

    return (
      <div className='Skills'>
        <Header profile='TODO: ALPACCA WHATEVER' badges={earnedBadges.length} stars={earnedStars} />
        <div className='list'>
          { categories.map(category =>(
            <SkillCategory
              category={category}
              earnedBadges={earnedBadges}
              key={category.key}
              badgeSet={this.props.badgeSet}
              updateSkillLevel={this.props.updateSkillLevel}
              activeSkillId={this.state.activeSkillId}
              onActivatedSkillChanged={this.handleSelectSkillDetails}
            />
          )) }
        </div>
      </div>
    );
  }
}
