import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IDriver } from 'app/shared/model/driver.model';
import { getEntities as getDrivers } from 'app/entities/driver/driver.reducer';
import { IInsurance } from 'app/shared/model/insurance.model';
import { getEntities as getInsurances } from 'app/entities/insurance/insurance.reducer';
import { getEntity, updateEntity, createEntity, reset } from './vehicle.reducer';
import { IVehicle } from 'app/shared/model/vehicle.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IVehicleUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IVehicleUpdateState {
  isNew: boolean;
  driverId: string;
  autoInsuranceId: string;
}

export class VehicleUpdate extends React.Component<IVehicleUpdateProps, IVehicleUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      driverId: '0',
      autoInsuranceId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getDrivers();
    this.props.getInsurances();
  }

  saveEntity = (event, errors, values) => {
    values.registrationExpDate = convertDateTimeToServer(values.registrationExpDate);

    if (errors.length === 0) {
      const { vehicleEntity } = this.props;
      const entity = {
        ...vehicleEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/vehicle');
  };

  render() {
    const { vehicleEntity, drivers, insurances, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="happywheelersapiApp.vehicle.home.createOrEditLabel">Create or edit a Vehicle</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : vehicleEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="vehicle-id">ID</Label>
                    <AvInput id="vehicle-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="typeLabel" for="vehicle-type">
                    Type
                  </Label>
                  <AvInput
                    id="vehicle-type"
                    type="select"
                    className="form-control"
                    name="type"
                    value={(!isNew && vehicleEntity.type) || 'SEDAN'}
                  >
                    <option value="SEDAN">SEDAN</option>
                    <option value="SUV">SUV</option>
                    <option value="PICKUP">PICKUP</option>
                    <option value="VAN">VAN</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="makeLabel" for="vehicle-make">
                    Make
                  </Label>
                  <AvField
                    id="vehicle-make"
                    type="text"
                    name="make"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="modelLabel" for="vehicle-model">
                    Model
                  </Label>
                  <AvField
                    id="vehicle-model"
                    type="text"
                    name="model"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="yearLabel" for="vehicle-year">
                    Year
                  </Label>
                  <AvField
                    id="vehicle-year"
                    type="text"
                    name="year"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="plateNumberLabel" for="vehicle-plateNumber">
                    Plate Number
                  </Label>
                  <AvField
                    id="vehicle-plateNumber"
                    type="text"
                    name="plateNumber"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="supportHeavyTransportLabel" check>
                    <AvInput id="vehicle-supportHeavyTransport" type="checkbox" className="form-control" name="supportHeavyTransport" />
                    Support Heavy Transport
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="vinNumberLabel" for="vehicle-vinNumber">
                    Vin Number
                  </Label>
                  <AvField id="vehicle-vinNumber" type="text" name="vinNumber" />
                </AvGroup>
                <AvGroup>
                  <Label id="registrationExpDateLabel" for="vehicle-registrationExpDate">
                    Registration Exp Date
                  </Label>
                  <AvInput
                    id="vehicle-registrationExpDate"
                    type="datetime-local"
                    className="form-control"
                    name="registrationExpDate"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.vehicleEntity.registrationExpDate)}
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="vehicle-driver">Driver</Label>
                  <AvInput id="vehicle-driver" type="select" className="form-control" name="driver.id">
                    <option value="" key="0" />
                    {drivers
                      ? drivers.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="vehicle-autoInsurance">Auto Insurance</Label>
                  <AvInput id="vehicle-autoInsurance" type="select" className="form-control" name="autoInsurance.id">
                    <option value="" key="0" />
                    {insurances
                      ? insurances.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/vehicle" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">Back</span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp; Save
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  drivers: storeState.driver.entities,
  insurances: storeState.insurance.entities,
  vehicleEntity: storeState.vehicle.entity,
  loading: storeState.vehicle.loading,
  updating: storeState.vehicle.updating,
  updateSuccess: storeState.vehicle.updateSuccess
});

const mapDispatchToProps = {
  getDrivers,
  getInsurances,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VehicleUpdate);
