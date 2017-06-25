import React from 'react';
import PropTypes from 'prop-types';
import { dataToJS } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import reduce from 'lodash.reduce';
import isEmpty from 'lodash.isempty';

import BadgeSet from '../../components/BadgeSet';

class UserBadgeSet extends React.Component {
  static propTypes = {
    badgeSetId: PropTypes.string.isRequired
  };

  render() {
    const {
      namespace,
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

    const badgeData = reduce(badgeSet.badgeIds, (badgeData, badgeId, idx) => {
      const badge = badges[badgeId];

      if(isEmpty(badge)) {
        return badgeData;
      }

      const { description, value, skillId } = badge;
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
        <h4><Link to={`/${namespace}/badge-sets/${badgeSetId}`}>{badgeSet.name}</Link></h4>
        <BadgeSet badges={badgeData} />
      </div>
    );
  }
}

const mapStateToProps = ({ firebase, app: { namespace } }) => {
  return {
    namespace,
    skills: dataToJS(firebase, `/${namespace}/skills`),
    categories: dataToJS(firebase, `/${namespace}/categories`),
    badges: dataToJS(firebase, `/${namespace}/badges`),
    badgeSets: dataToJS(firebase, `/${namespace}/badge-sets`)
  };
};

export default connect(mapStateToProps, null)(UserBadgeSet);
