import getHighchartsSeriesConfig from './getHighchartsSeriesConfig';

describe('getHighchartsSeriesConfig', () => {
  it('should create a valid configuration object', () => {
    const badges = {
      'badge-a': {
        order: 0,
        name: 'Badge A',
        value: 5,
        skillName: 'Skill A',
        color: '#f00'
      },
      'badge-b': {
        order: 1,
        name: 'Badge B',
        value: 10,
        skillName: 'Skill A',
        color: '#a00'
      },
      'badge-c': {
        order: 2,
        name: 'Badge C',
        value: 12,
        skillName: 'Skill B',
        color: '#0f0'
      }
    };

    const settings = {
      size: {
        inner: 100,
        minHeight: 120,
        maxHeight: 200
      }
    };

    const total = 5 + 10 + 12;
    const expected = [{
      name: 'Badge A',
      data: [{
        name: 'Skill A',
        color: '#f00',
        y: 5
      }],
      size: 157,
      startAngle: -60,
      endAngle: 60,
      type: 'pie',
      innerSize: 100,
      // TODO animation: {}
    }, {
      name: 'Badge B',
      data: [{
        name: 'Skill A',
        color: '#a00',
        y: 10
      }],
      size: 194,
      startAngle: 60,
      endAngle: 180,
      type: 'pie',
      innerSize: 100,
      // TODO animation: {}
    }, {
      name: 'Badge C',
      data: [{
        name: 'Skill B',
        color: '#0f0',
        y: 12
      }],
      size: 208,
      startAngle: 180,
      endAngle: 300,
      type: 'pie',
      innerSize: 100,
      // TODO animation: {}
    }];

    expect(getHighchartsSeriesConfig(badges, settings)).toMatchObject(expected);
  });
});
