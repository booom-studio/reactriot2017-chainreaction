import map from 'lodash.map';
import sortBy from 'lodash.sortby';

export default (badges, { size: { inner, minHeight, maxHeight }}) => {
  const totalValue = map(badges, 'value').reduce((total, value) => total + value, 0);
  const count = Object.keys(badges).length;
  const width = 360 / count;

  const ordered = sortBy(badges, 'order');

  const series = map(ordered, ({ name, value, color, skillName }, idx) => {
    const startAngle = -60 + idx * width;

    return {
      name,
      size: Math.floor(minHeight + maxHeight * value / totalValue),
      startAngle,
      endAngle: startAngle + width,
      type: 'pie',
      innerSize: 100,
      data: [{
        name: skillName,
        color,
        y: value
      }],
    };
  });

  return series;
};
