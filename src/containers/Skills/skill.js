import React, { Component } from 'react';
import Slider from '../../components/Slider';
import { Button, Glyphicon, Collapse } from 'react-bootstrap';

export const skillContainer = ({
    skill,
    showsDetails,
    showsAll,
    isEarned,
    color,
    handleSelectSkillDetails=()=>{}
}) => {
  return <Collapse key={skill.key} in={showsAll || isEarned}>
    <div onClick={() => handleSelectSkillDetails(skill.key)}>
      <strong>{skill.name}</strong>
      <Slider
          currentLevel={1}
          levelCount={skill.badges.length}
          color={color}
          active={!!showsDetails}
      />
    </div>
  </Collapse>
};

export const skillCategoryPanelHeader = ({
    category,
    handleToggle,
    handleToggleShowAll,
    isOpen,
    showsAll,
    earnedCategoryBadgeCount=0,
    earnedCategoryStarCount=0
}) => <div className="panel-heading" style={{backgroundColor: category.color}}>
    <span className='skillPanelHeader'>
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
    </span>
</div>;