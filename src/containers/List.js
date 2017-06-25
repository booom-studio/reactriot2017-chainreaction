import React from 'react';
import PropTypes from 'prop-types';
import { dataToJS } from 'react-redux-firebase';
import { connect } from 'react-redux'
import { Grid, Col, Row } from 'react-bootstrap';

import map from 'lodash.map';

import { namespaceChange } from '../actions';

import UserBadgeSet from './UserBadgeSet';
import TopNavigation from '../components/TopNavigation';


class List extends React.Component {
  render() {
    const { badgeSets = {} } = this.props;

    return (
      <div>
        <TopNavigation />
        <Grid>
          <Row>
            {map(badgeSets, (badgeSet, id) => (
              <Col key={id} md={2} sm={2} xs={6}>
                <UserBadgeSet badgeSetId={id} />
              </Col>
            ))}
          </Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = ({firebase, app: { namespace }}) => ({
  badgeSets: dataToJS(firebase, `/${namespace}/badge-sets`)
});
const mapDispatchToProps = dispatch => ({
  namespaceChange: namespace => {
    dispatch(namespaceChange(namespace));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
