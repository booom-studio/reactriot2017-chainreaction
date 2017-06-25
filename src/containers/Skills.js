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

const skillContainer = ({
  skill,
  showsDetails,
  category,
  handleSelectSkillDetails=()=>{}
}) => (
    <div onClick={() => handleSelectSkillDetails(skill.key)}
         key={skill.key}>
      <strong>{JSON.stringify({skill}, null, 2)}</strong>
      <Collapse in={!!showsDetails}>
        <div>Details...</div>
      </Collapse>
    </div>
);

export default class Skills extends Component {
  state = {
    panelOpen: {},
    activeSkillId: false
  };

  handleToggle = (key) => {
    this.setState({
      panelOpen: Object.assign({}, this.state.panelOpen, {[key]: !this.state.panelOpen[key]})
    });
  };

  handleSelectSkillDetails = (skillId) => {
    this.setState({
      activeSkillId: skillId === this.state.activeSkillId ? false : skillId
    });
  };

  render() {
    const categories = Object.keys(this.props.categories || {}).map(key => ({key, ...this.props.categories[key]}));
    const skills = Object.keys(this.props.skills || {}).map(key => ({key, ...this.props.skills[key]}));
    const earnedBadges = this.props.badgeIds.map(badgeId => this.props.badges[badgeId]);
    const earnedStars = earnedBadges.reduce((sum, {value}) => sum + value, 0);
    return <div>
      <div>
        <Glyphicon className='skillPanelHeaderGlyph' glyph='tag' /> {earnedBadges.length}
        <Glyphicon className='skillPanelHeaderGlyph' glyph='star' /> {earnedStars}
      </div>
      {categories.map((category) => {
        const categorySkills = skills.filter(skill => skill.categoryId === category.key);
        const categorySkillIds = categorySkills.map(skill => skill.key)
        const categoryBadges = earnedBadges.filter(badge => categorySkillIds.includes(badge.skillId));
        const isOpen =this.state.panelOpen[category.key];
        return <div className="panel panel-default">
          <div className="panel-heading" style={{backgroundColor: category.color}}>
            {skillCategoryPanelHeader({
              category,
              earnedCategoryBadgeCount: categorySkills.length,
              earnedCategoryStarCount: categoryBadges.reduce((sum, {value}) => sum + value, 0),
              handleToggle: this.handleToggle,
              isOpen })}
          </div>
          <Collapse in={isOpen}>
            <div className="panel-body">
              {categorySkills.map((skill, idx) => skillContainer({
                skill,
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