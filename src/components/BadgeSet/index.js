import React from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'react-highcharts';
import isEqual from 'lodash.isequal';

import getHighchartsSeriesConfig from './getHighchartsSeriesConfig';

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
    photoUrl: PropTypes.string
  };

  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(this.props.badges, nextProps.badges);
  }

  componentWillReceiveProps(nextProps) {
    // if(!isEqual(this.props.badges, nextProps.badges)) {
    //   const chart = this.chart.getChart();

    //   console.log({ chart });

    //   const config = this.getChartConfig(nextProps.badges);

    //   chart.series.map((series, idx) => {
    //     const newSeries = config.series[idx];
    //     series.update(newSeries, true);
    //     series.setData(newSeries.data);
    //   });
    // }
  }

  getChartConfig = badges => ({
    series: getHighchartsSeriesConfig(badges, {
      size: {
        inner: 100,
        minHeight: 120,
        maxHeight: 200
      }
    }),
    chart: {
      width: 400,
      height: 400,
      backgroundColor: 'transparent'
    },
    plotOptions: {
      pie: {
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
    const config = this.getChartConfig(this.props.badges);

    return (
      <Highcharts ref={chart => { this.chart = chart }} config={config} />
    );
  }
}
