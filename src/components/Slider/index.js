import React from 'react';
import PropTypes from 'prop-types';
import RCSlider, { Handle }  from 'rc-slider';
import Tooltip from 'rc-tooltip';
import classNames from 'classnames';

import 'rc-slider/assets/index.css';
import './style.css';

import Face from './Face';

export default class Slider extends React.Component {
  static propTypes = {
    levelCount: PropTypes.number.isRequired,
    currentLevel: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    active: PropTypes.bool,

    onChange: PropTypes.func,
    onDelete: PropTypes.func
  };

  static defaultProps = {
    active: false
  };

  handle = ({ value, dragging, index, ...restProps }) => (
    <Tooltip
      overlay={() => <Face color={this.props.color} collapsed={!this.props.active} />}
      placement='bottom'
      key={index}
      visible
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  )

  render() {
    const wrapperStyle = { width: 400, margin: 50 };

    return (
      <div className={classNames('Slider', { active: this.props.active })}>
        <RCSlider min={0} max={this.props.levelCount} defaultValue={this.props.currentLevel} handle={this.handle} />
      </div>
    );


    return (
      <div style={{ backgroundColor: 'red'}}>
      <RCSlider />
      </div>
    );
  }
}
