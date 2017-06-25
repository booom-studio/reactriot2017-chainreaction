import React from 'react';
import { dataToJS } from 'react-redux-firebase';
import { connect } from 'react-redux'
import { Grid, Col, Row } from 'react-bootstrap';

import pickBy from 'lodash.pickby';
import map from 'lodash.map';

import { namespaceChange } from '../actions';

import UserBadgeSet from './UserBadgeSet';
import TopNavigation from '../components/TopNavigation';


class List extends React.Component {
  state = { normalizedFilter: '' };

  onSearch = (filter) => {
    this.setState({ normalizedFilter: filter.toLowerCase() })
  };

  pickBy = (badgeSet) => (badgeSet.name || '').toLowerCase().indexOf(this.state.normalizedFilter) > -1;

  render() {
    const { badgeSets = {} } = this.props;

    return (
      <div>
        <TopNavigation onSearch={this.onSearch}/>
        <Grid>
          <Row>
            {map(pickBy(badgeSets, this.pickBy), (badgeSet, id) => (
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
