import map from 'lodash.map';
import sortBy from 'lodash.sortby';

export default (badges, { size: { inner, minHeight, maxHeight }}) => {
  const values = map(badges, 'value').reduce(({ total, min, max }, value) => ({
    total: total + value,
    min: Math.min(value, min),
    max: Math.max(value, max)
  }), {
    total: 0,
    min: Number.MAX_VALUE,
    max: -1
  });

  const count = Object.keys(badges).length;
  const width = 360 / count;

  const ordered = sortBy(badges, 'order');

  const getSize = value => (value - values.min) / (values.max - values.min) * ( maxHeight - minHeight ) + minHeight;

  const series = map(ordered, ({ name, value, color, skillName }, idx) => {
    const startAngle = -60 + idx * width;

    return {
      name,
      size: Math.floor(getSize(value)),
      startAngle,
      endAngle: startAngle + width,
      type: 'pie',
      innerSize: inner,
      data: [{
        name: skillName,
        color,
        y: value
      }],
    };
  });

  return series;
};
