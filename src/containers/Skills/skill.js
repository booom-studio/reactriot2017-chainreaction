import React, { Component } from 'react';
import Slider from '../../components/Slider';
import { Button, Glyphicon, Collapse } from 'react-bootstrap';
import Color from 'color';

const blackOrWhiteOn = (color) => Color(color).dark() ? 'white' : 'black';

export const SkillContainer = ({
    skill,
    badgeIds,
    showsDetails,
    showsAll,
    isEarned,
    color,
    updateSkillLevel,
    handleSelectSkillDetails=()=>{}
}) => {
  const skillLevel = 1 + (
      skill.badges
          .map(b => b.key)
          .findIndex(skillBadgeId => badgeIds.includes(skillBadgeId)) || 0
      );
  return <Collapse key={skill.key} in={showsAll || isEarned}>
    <div onClick={() => handleSelectSkillDetails(skill.key)}>
      <strong>{skill.name}</strong>
      <Slider
          onChange={(newLevel, oldLevel) => {
            const oldKey = (oldLevel > 0) && skill.badges[oldLevel - 1].key;
            const newKey = (newLevel > 0) && skill.badges[newLevel - 1].key;
            updateSkillLevel(skill.key, {oldKey, newKey});
          }}
          currentLevel={skillLevel}
          levelCount={skill.badges.length}
          color={color}
          active={!!showsDetails}
      />
    </div>
  </Collapse>
};

export const SkillCategoryPanelHeader = ({
    category,
    handleToggle,
    handleToggleShowAll,
    isOpen,
    showsAll,
    earnedCategoryBadgeCount=0,
    earnedCategoryStarCount=0
}) => <div className="panel-heading" style={{
  backgroundColor: category.color,
  color: blackOrWhiteOn(category.color)
}}>
    <span className='skillPanelHeader'>
      <span onClick={() => handleToggle(category.key)}>
        <Glyphicon glyph={`triangle-${isOpen ? 'top' : 'bottom'}`} style={{marginRight: 5}} />
        {category.name}
        <Glyphicon className='skillPanelHeaderGlyph' glyph='tag' /> {earnedCategoryBadgeCount}
        <Glyphicon className='skillPanelHeaderGlyph' glyph='star' /> {earnedCategoryStarCount}
      </span>

      <span>
        <Button onClick={() => handleToggleShowAll(category.key)}
                type='button' bsSize={'sm'}
                className={`${blackOrWhiteOn(category.color)}SkillPanelHeaderButton`}>
          <Glyphicon glyph='tag' /> {showsAll ? 'Hide unused' : 'See all skills'}
        </Button>
      </span>
    </span>
</div>;

/*
<Button type='button' bsSize={'sm'} className={`${blackOrWhiteOn(category.color)}SkillPanelHeaderButton`}>
  <Glyphicon glyph='plus' /> Add
</Button>
 */