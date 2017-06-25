import React from 'react';
import Slider from '../../../components/Slider';
import { Collapse } from 'react-bootstrap';

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
  return (
    <Collapse key={skill.key} in={showsAll || isEarned}>
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
  );
};