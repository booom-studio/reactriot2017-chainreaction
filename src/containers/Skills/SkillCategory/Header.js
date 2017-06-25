import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import Color from 'color';

const blackOrWhiteOn = (color) => Color(color).dark() ? 'white' : 'black';

// SkillCategoryPanelHeader

export default ({
    category,
    handleToggle,
    handleToggleShowAll,
    isOpen,
    showsAll,
    earnedCategoryBadgeCount=0,
    earnedCategoryStarCount=0
}) => <div className="SkillHeader panel-heading" style={{
  backgroundColor: category.color,
  color: blackOrWhiteOn(category.color)
}}>
    <span className='SkillHeaderContent'>
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
