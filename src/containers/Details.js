import React, { Component } from 'react';
import { firebaseConnect, dataToJS } from 'react-redux-firebase';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { Grid, Row, Col, Glyphicon } from 'react-bootstrap';

import UserBadgeSet from './UserBadgeSet';
import Skills from './Skills';

class BadgeSetDetails extends Component {
  render() {
    const badgeSetId = this.props.match.params.badgeSetId;
    return this.props.badgeSet ?
        <Grid>
          <Row>
            <Col md={6} sm={6} xs={12}>
              <Link to={`/`}>
                <Glyphicon glyph='arrow-left' />
              </Link>
              <span>{this.props.badgeSet.name}</span>
              <UserBadgeSet badgeSetId={badgeSetId} />
            </Col>
          </Row>
        </Grid> :
        <div>Loading...</div>;
  }
}

const mapStateToProps = ({firebase, app: {namespace}}, {match}) => ({
  badgeSet: dataToJS(firebase, `/${namespace}/badge-sets/${match.params.badgeSetId}`)
});

export default connect(mapStateToProps, dispatch => ({}))(BadgeSetDetails);