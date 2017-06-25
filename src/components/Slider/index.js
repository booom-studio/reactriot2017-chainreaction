import React from 'react';
import PropTypes from 'prop-types';
import RCSlider, { Handle }  from 'rc-slider';
import Tooltip from 'rc-tooltip';
import classNames from 'classnames';

import 'rc-slider/assets/index.css';
import './style.css';

import Face from './Face';

export default class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLevel: props.currentLevel
    }
  }

  static propTypes = {
    levelCount: PropTypes.number.isRequired,
    currentLevel: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    active: PropTypes.bool,

    onChange: PropTypes.func,
    onDelete: PropTypes.func
  };

  static defaultProps = {
    active: false,
    onChange: () => {},
    onDelete: () => {}
  };

  handle = ({ value, dragging, index, ...restProps }) => (
    <Tooltip
      overlay={() => <Face color={this.props.color} collapsed={!this.props.active} />}
      placement='bottom'
      key={index}
      visible={this.props.active}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  )

  marks = () => {
    const { active, levelCount } = this.props;

    if(!active) return {};

    const levels = Array(levelCount).fill().map((_, idx) => idx + 1);
    const marks = levels.reduce((acc, level) => ({
      ...acc,
      [level]: <span>{level}</span>
    }), {});

    return {
      ...marks,
      0: <span className='rc-slider-mark-text-remove'>&#x2715;</span>
    };
  }

  render() {
    const { color } = this.props;

    return (
      <div className={classNames('Slider', { active: this.props.active })}>
        <RCSlider
          onAfterChange={(newLevel) => {
            this.props.onChange(newLevel, this.state.currentLevel);
            this.setState({currentLevel: newLevel})
          }}
          style={{ borderColor: color, color }}
          trackStyle={{ backgroundColor: color }}
          min={0}
          max={this.props.levelCount}
          defaultValue={this.props.currentLevel}
          marks={this.marks()}
          dots
          handle={this.handle} />
      </div>
    );
  }
}
