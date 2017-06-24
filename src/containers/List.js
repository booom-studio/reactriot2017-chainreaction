import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { firebaseConnect, dataToJS } from 'react-redux-firebase';
import { connect } from 'react-redux'

import { namespaceChange } from '../actions';

import UserBadgeSet from './UserBadgeSet';

import { Grid, Col, Row } from 'react-bootstrap';
import TopNavigation from '../components/TopNavigation';

class List extends Component {
  render() {
    const badgeSetIds = Object.keys(this.props.badgeSets || []);
    // const badgeSets = badgeSetIds.map(key => ({key, ...this.props.badgeSets[key]}));
    return (
      <div>
        <TopNavigation />
        <Grid>
          <Row>
            {badgeSetIds.map(badgeSetId => (
                <Col key={badgeSetId} md={2} sm={2} xs={6}>
                  <UserBadgeSet badgeSetId={badgeSetId} />
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
