import React from 'react';
import Slider from '../../../components/Slider';
import { Collapse, Glyphicon } from 'react-bootstrap';
import classNames from 'classnames';
import Color from 'color';

export default ({
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

  const style = {
    backgroundColor: showsDetails ? Color(color).alpha(.1) : 'white'
  };

  return (
    <Collapse className={classNames('Skill', { open: showsDetails })} style={style} in={showsAll || isEarned}>
      <div>
        <div className='SkillTitle'>
          <Glyphicon onClick={() => { handleSelectSkillDetails(skill.key) }} glyph={`triangle-${showsDetails ? 'bottom' : 'right' }`} />
          <strong>{skill.name}</strong>
        </div>
        <Slider
          onAfterChange={(newLevel, oldLevel) => {
            const oldKey = (oldLevel > 0) && skill.badges[oldLevel - 1].key;
            const newKey = (newLevel > 0) && skill.badges[newLevel - 1].key;
            updateSkillLevel(skill.key, {oldKey, newKey});
          }}
          onChange={newLevel => {
            showsDetails || handleSelectSkillDetails(skill.key);
          }}
          currentLevel={skillLevel}
          levelCount={skill.badges.length}
          color={color}
          active={!!showsDetails}
        />
      </div>
    </Collapse>
  );
};