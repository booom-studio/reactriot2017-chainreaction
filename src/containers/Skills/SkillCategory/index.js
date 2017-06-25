import React from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'react-bootstrap';

import map from 'lodash.map';

import Header from './Header';
import ListItem from './ListItem';

import './style.css';

export default class SkillCategory extends React.Component {
  static propTypes = {
    category: PropTypes.shape({
      skills: PropTypes.array,
      color: PropTypes.string
    }).isRequired,
    earnedBadges: PropTypes.array.isRequired,
    badgeSet: PropTypes.object.isRequired,
    updateSkillLevel: PropTypes.func.isRequired,
    activeSkillId: PropTypes.string,
    onActivatedSkillChanged: PropTypes.func.isRequired
  };

  state = {
    isOpen: false,
    showAll: false
  };

  componentWillMount() {
    const {
      category,
      earnedBadges
    } = this.props;

    const categorySkillIds = map(category.skills, 'key');
    const earnedSkillIds = map(earnedBadges, 'skillId');

    const showAll = categorySkillIds.filter(skillId => earnedSkillIds.includes(skillId)).length === 0;
    this.setState({ showAll });
  }

  handleToggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  handleToggleShowAll = () => {
    this.setState({ showAll: !this.state.showAll });
  }

  render() {
    const {
      category,
      badgeSet,
      earnedBadges,
      updateSkillLevel,
      activeSkillId,
      onActivatedSkillChanged
     } = this.props;

    const categorySkillIds = map(category.skills, 'key');
    const categoryBadges = earnedBadges.filter(badge => categorySkillIds.includes(badge.skillId));
    const stars = categoryBadges.reduce((sum, { value }) => sum + value, 0);

    const earnedSkillIds = map(earnedBadges, 'skillId');

    return (
      <Panel className='SkillCategory'>
        <Header
          category={category}
          earnedCategoryBadgeCount={categoryBadges.length}
          earnedCategoryStarCount={stars}
          handleToggle={this.handleToggle}
          handleToggleShowAll={this.handleToggleShowAll}
          isOpen={this.state.isOpen}
          showsAll={this.state.showAll}
        />
        <Panel collapsible expanded={this.state.isOpen} className='List'>
          {
            category.skills.map(skill => {
              return (
                <ListItem
                  color={category.color}
                  key={skill.key}
                  skill={skill}
                  badgeIds={badgeSet.badgeIds}
                  showsAll={this.state.showAll}
                  isEarned={earnedSkillIds.includes(skill.key)}
                  showsDetails={activeSkillId === skill.key}
                  updateSkillLevel={updateSkillLevel}
                  handleSelectSkillDetails={() => { onActivatedSkillChanged(skill.key) }}/>
              );
            })
          }
          </Panel>
      </Panel>
    );
  }
}
