import React from 'react';
import PropTypes from 'prop-types';
import { dataToJS } from 'react-redux-firebase';
import { connect } from 'react-redux';

import BadgeSet from '../../components/BadgeSet';

class UserBadgeSet extends React.Component {
  static propTypes = {
    badgeSetId: PropTypes.string.isRequired
  };

  render() {
    const {
      badgeSetId,
      skills = {},
      categories = {},
      badges = {},
      badgeSets = {}
    } = this.props;

    const badgeSet = badgeSets[badgeSetId];

    if(!badgeSet) {
      return (
        <pre>'{badgeSetId}' is empty</pre>
      );
    }

    const badgeData = badgeSet.badges.reduce((badgeData, badgeId, idx) => {
      const { description, value, skillId } = badges[badgeId];
      const { name: skillName, categoryId } = skills[skillId];
      const { color } = categories[categoryId];

      return {
        ...badgeData,
        [badgeId]: {
          name: description,
          value,
          order: idx,
          skillName,
          color
        }
      };
    }, {});

    return (
      <div>
        <h4>{badgeSet.name}</h4>
        <BadgeSet badges={badgeData} />
      </div>
    );
  }
}

const mapStateToProps = ({ firebase, app: { namespace } }) => ({
  skills: dataToJS(firebase, `/${namespace}/skills`),
  categories: dataToJS(firebase, `/${namespace}/categories`),
  badges: dataToJS(firebase, `/${namespace}/badges`),
  badgeSets: dataToJS(firebase, `/${namespace}/badge-sets`)
});

export default connect(mapStateToProps, null)(UserBadgeSet);
