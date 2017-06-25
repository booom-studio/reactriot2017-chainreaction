import React, { Component } from 'react';
import { dataToJS } from 'react-redux-firebase';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { Grid, Row, Col, Glyphicon } from 'react-bootstrap';

import UserBadgeSet from './UserBadgeSet';
import Skills from './Skills/index';

class BadgeSetDetails extends Component {
  render() {
    const badgeSetId = this.props.match.params.badgeSetId;
    // const badgeIds = this.props.badgeSet ? this.props.badgeSet.badgeIds : [];
    // badges where skillId in this.props.skills.map(x => x.id)
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
            <Col md={6} sm={6} xs={12}>
              <Skills skills={this.props.skills}
                      categories={this.props.categories}
                      badgeIds={this.props.badgeSet.badgeIds}
                      badges={this.props.badges}
              />
            </Col>
          </Row>
        </Grid> :
        <div>Loading...</div>;
  }
}

const mapStateToProps = ({firebase, app: {namespace}}, {match}) => ({
  badgeSet: dataToJS(firebase, `/${namespace}/badge-sets/${match.params.badgeSetId}`),
  badges: dataToJS(firebase, `/${namespace}/badges`),
  skills: dataToJS(firebase, `/${namespace}/skills`),
  categories: dataToJS(firebase, `/${namespace}/categories`),
});

export default connect(mapStateToProps, dispatch => ({}))(BadgeSetDetails);