import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './location.reducer';
import { ILocation } from 'app/shared/model/location.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ILocationDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class LocationDetail extends React.Component<ILocationDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { locationEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Location [<b>{locationEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="addressLine1">Address Line 1</span>
            </dt>
            <dd>{locationEntity.addressLine1}</dd>
            <dt>
              <span id="addressLine2">Address Line 2</span>
            </dt>
            <dd>{locationEntity.addressLine2}</dd>
            <dt>
              <span id="city">City</span>
            </dt>
            <dd>{locationEntity.city}</dd>
            <dt>
              <span id="state">State</span>
            </dt>
            <dd>{locationEntity.state}</dd>
            <dt>
              <span id="zip">Zip</span>
            </dt>
            <dd>{locationEntity.zip}</dd>
            <dt>
              <span id="country">Country</span>
            </dt>
            <dd>{locationEntity.country}</dd>
            <dt>
              <span id="latitude">Latitude</span>
            </dt>
            <dd>{locationEntity.latitude}</dd>
            <dt>
              <span id="longitue">Longitue</span>
            </dt>
            <dd>{locationEntity.longitue}</dd>
          </dl>
          <Button tag={Link} to="/entity/location" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/location/${locationEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ location }: IRootState) => ({
  locationEntity: location.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationDetail);
