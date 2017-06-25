import React from 'react';
import Slider from '../../../components/Slider';
import { Collapse, Glyphicon, Label, Well } from 'react-bootstrap';
import classNames from 'classnames';
import Color from 'color';

export default class ListItem extends React.Component {
  state = {
    level: 0
  };

  componentWillMount() {
    this.setState({ level: this.getSkillLevel() })
  }

  getSkillLevel = () => {
    return 1 + (
      this.props.skill.badges
          .map(b => b.key)
          .findIndex(skillBadgeId => (this.props.badgeIds || []).includes(skillBadgeId)) || 0
      );
  }

  render() {
    const {
      skill,
      badgeIds,
      showsDetails,
      showsAll,
      isEarned,
      color,
      updateSkillLevel,
      handleSelectSkillDetails=()=>{},
      photoUrl
    } = this.props;

    const skillLevel = this.getSkillLevel();

    const style = {
      backgroundColor: showsDetails ? Color(color).alpha(.1) : 'white'
    };

    const badge = skill.badges[this.state.level - 1];
    const description = (badge || {}).description;

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
              this.setState({ level: newLevel });
              showsDetails || handleSelectSkillDetails(skill.key);
            }}
            currentLevel={skillLevel}
            levelCount={skill.badges.length}
            color={color}
            active={!!showsDetails}
            photoUrl={photoUrl}
          />
          { (showsDetails && this.state.level) && (
            <div className='SkillDescription'>
              <h4><Label style={{ backgroundColor: color }}>Level {this.state.level}</Label></h4>
              { description && <Well>{description}</Well> }
            </div>
            )
          }
        </div>
      </Collapse>
    );
  }
}