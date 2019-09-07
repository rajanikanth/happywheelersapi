import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './driver.reducer';
import { IDriver } from 'app/shared/model/driver.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDriverDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class DriverDetail extends React.Component<IDriverDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { driverEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Driver [<b>{driverEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="firstName">First Name</span>
            </dt>
            <dd>{driverEntity.firstName}</dd>
            <dt>
              <span id="lastName">Last Name</span>
            </dt>
            <dd>{driverEntity.lastName}</dd>
            <dt>
              <span id="email">Email</span>
            </dt>
            <dd>{driverEntity.email}</dd>
            <dt>
              <span id="password">Password</span>
            </dt>
            <dd>{driverEntity.password}</dd>
            <dt>
              <span id="phoneNumber">Phone Number</span>
            </dt>
            <dd>{driverEntity.phoneNumber}</dd>
            <dt>
              <span id="status">Status</span>
            </dt>
            <dd>{driverEntity.status}</dd>
            <dt>
              <span id="oneTimeCode">One Time Code</span>
            </dt>
            <dd>{driverEntity.oneTimeCode}</dd>
            <dt>
              <span id="oneTimeExpirationTime">One Time Expiration Time</span>
            </dt>
            <dd>
              <TextFormat value={driverEntity.oneTimeExpirationTime} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="driverLicense">Driver License</span>
            </dt>
            <dd>{driverEntity.driverLicense}</dd>
            <dt>
              <span id="phoneType">Phone Type</span>
            </dt>
            <dd>{driverEntity.phoneType}</dd>
            <dt>
              <span id="duiConviction">Dui Conviction</span>
            </dt>
            <dd>{driverEntity.duiConviction ? 'true' : 'false'}</dd>
            <dt>
              <span id="felonyConviction">Felony Conviction</span>
            </dt>
            <dd>{driverEntity.felonyConviction ? 'true' : 'false'}</dd>
            <dt>Location</dt>
            <dd>{driverEntity.location ? driverEntity.location.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/driver" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/driver/${driverEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ driver }: IRootState) => ({
  driverEntity: driver.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DriverDetail);
