import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { firebaseConnect, dataToJS } from 'react-redux-firebase';
import { connect } from 'react-redux'

import { namespaceChange } from './actions';

import UserBadgeSet from './containers/UserBadgeSet';


import { Grid, Col, Row } from 'react-bootstrap';
import TopNavigation from './TopNavigation';

class App extends Component {
  static propTypes = {
    namespace: PropTypes.string.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if(this.props.namespace !== nextProps.namespace) {
      this.props.namespaceChange(nextProps.namespace);
    }
  }

  componentWillMount() {
    this.props.namespaceChange(this.props.namespace);
  }

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

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default firebaseConnect(({ namespace }) => [
  `/${namespace}`
])(ConnectedApp);
