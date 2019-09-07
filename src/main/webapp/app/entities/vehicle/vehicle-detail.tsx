import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './vehicle.reducer';
import { IVehicle } from 'app/shared/model/vehicle.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVehicleDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class VehicleDetail extends React.Component<IVehicleDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { vehicleEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Vehicle [<b>{vehicleEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="type">Type</span>
            </dt>
            <dd>{vehicleEntity.type}</dd>
            <dt>
              <span id="make">Make</span>
            </dt>
            <dd>{vehicleEntity.make}</dd>
            <dt>
              <span id="model">Model</span>
            </dt>
            <dd>{vehicleEntity.model}</dd>
            <dt>
              <span id="year">Year</span>
            </dt>
            <dd>{vehicleEntity.year}</dd>
            <dt>
              <span id="plateNumber">Plate Number</span>
            </dt>
            <dd>{vehicleEntity.plateNumber}</dd>
            <dt>
              <span id="supportHeavyTransport">Support Heavy Transport</span>
            </dt>
            <dd>{vehicleEntity.supportHeavyTransport ? 'true' : 'false'}</dd>
            <dt>
              <span id="vinNumber">Vin Number</span>
            </dt>
            <dd>{vehicleEntity.vinNumber}</dd>
            <dt>
              <span id="registrationExpDate">Registration Exp Date</span>
            </dt>
            <dd>
              <TextFormat value={vehicleEntity.registrationExpDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>Driver</dt>
            <dd>{vehicleEntity.driver ? vehicleEntity.driver.id : ''}</dd>
            <dt>Auto Insurance</dt>
            <dd>{vehicleEntity.autoInsurance ? vehicleEntity.autoInsurance.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/vehicle" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/vehicle/${vehicleEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ vehicle }: IRootState) => ({
  vehicleEntity: vehicle.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VehicleDetail);
