import React from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'react-highcharts';
import isEqual from 'lodash.isequal';

import getHighchartsSeriesConfig from './getHighchartsSeriesConfig';
import './style.css'

export default class BadgeSet extends React.Component {
  static propTypes = {
    badges: PropTypes.objectOf(
      PropTypes.shape({
        name: PropTypes.string,
        value: PropTypes.number,
        color: PropTypes.string,
        skillName: PropTypes.string
      })
    ).isRequired,
    photoUrl: PropTypes.string,
    animate: PropTypes.bool
  };

  static defaultProps = {
    animate: false
  };

  static nextId = 1;
  state = {
    width: null
  };

  constructor(props) {
    super(props);

    this.id = `chart-${this.constructor.nextId++}`;
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(!isEqual(this.props.badges, nextProps.badges) ||
      this.state.width !== nextState.width) {
      return true;
    }

    return false;
  }

  componentDidMount() {
    this.updateChartWidth();
    window.addEventListener('resize', this.updateChartWidth);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateChartWidth);
  }

  updateChartWidth = () => {
    const rect = this.container.getBoundingClientRect();
    this.setState({ width: rect.width });
  }

  getChartConfig = badges => ({
    series: getHighchartsSeriesConfig(badges, {
      size: {
        inner: this.state.width / 2,
        minHeight: this.state.width / 2 + 10,
        maxHeight: this.state.width
      }
    }),
    chart: {
      renderTo: this.id,
      width: this.state.width,
      height: this.state.width + 10,
      backgroundColor: 'transparent'
    },
    plotOptions: {
      pie: {
        animation: this.props.animate,
        slicedOffset: 0,
        borderColor: 'black',
        borderWidth: 0,
        dataLabels: { enabled: false },
        events: {
          click: function(evt, x) {
            console.log(evt, x, this);
          }
        }
      }
    },
    credits: { enabled: false },
    title: { text: null }
  })

  render() {
    let chart = null;

    if(this.state.width) {
      const config = this.getChartConfig(this.props.badges);
      chart = <Highcharts ref={chart => { this.chart = chart }} config={config} />;
    }

    return (
      <div id={this.id}
           className='badgeSetContainer'
           ref={container => { this.container = container } } >
        <img src={this.props.photoUrl}
             width={this.state.width / 2}
             className='badgeSetPhoto' />
        {chart}
      </div>
    );
  }
}
