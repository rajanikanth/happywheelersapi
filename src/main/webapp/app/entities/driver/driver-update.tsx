import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ILocation } from 'app/shared/model/location.model';
import { getEntities as getLocations } from 'app/entities/location/location.reducer';
import { getEntity, updateEntity, createEntity, reset } from './driver.reducer';
import { IDriver } from 'app/shared/model/driver.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IDriverUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IDriverUpdateState {
  isNew: boolean;
  locationId: string;
}

export class DriverUpdate extends React.Component<IDriverUpdateProps, IDriverUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      locationId: '0',
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

    this.props.getLocations();
  }

  saveEntity = (event, errors, values) => {
    values.oneTimeExpirationTime = convertDateTimeToServer(values.oneTimeExpirationTime);

    if (errors.length === 0) {
      const { driverEntity } = this.props;
      const entity = {
        ...driverEntity,
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
    this.props.history.push('/entity/driver');
  };

  render() {
    const { driverEntity, locations, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="happywheelersapiApp.driver.home.createOrEditLabel">Create or edit a Driver</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : driverEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="driver-id">ID</Label>
                    <AvInput id="driver-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="firstNameLabel" for="driver-firstName">
                    First Name
                  </Label>
                  <AvField id="driver-firstName" type="text" name="firstName" />
                </AvGroup>
                <AvGroup>
                  <Label id="lastNameLabel" for="driver-lastName">
                    Last Name
                  </Label>
                  <AvField id="driver-lastName" type="text" name="lastName" />
                </AvGroup>
                <AvGroup>
                  <Label id="emailLabel" for="driver-email">
                    Email
                  </Label>
                  <AvField id="driver-email" type="text" name="email" />
                </AvGroup>
                <AvGroup>
                  <Label id="passwordLabel" for="driver-password">
                    Password
                  </Label>
                  <AvField id="driver-password" type="text" name="password" />
                </AvGroup>
                <AvGroup>
                  <Label id="phoneNumberLabel" for="driver-phoneNumber">
                    Phone Number
                  </Label>
                  <AvField
                    id="driver-phoneNumber"
                    type="text"
                    name="phoneNumber"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="statusLabel" for="driver-status">
                    Status
                  </Label>
                  <AvInput
                    id="driver-status"
                    type="select"
                    className="form-control"
                    name="status"
                    value={(!isNew && driverEntity.status) || 'INVITED'}
                  >
                    <option value="INVITED">INVITED</option>
                    <option value="CONFIRMED">CONFIRMED</option>
                    <option value="DENIED">DENIED</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="oneTimeCodeLabel" for="driver-oneTimeCode">
                    One Time Code
                  </Label>
                  <AvField id="driver-oneTimeCode" type="text" name="oneTimeCode" />
                </AvGroup>
                <AvGroup>
                  <Label id="oneTimeExpirationTimeLabel" for="driver-oneTimeExpirationTime">
                    One Time Expiration Time
                  </Label>
                  <AvInput
                    id="driver-oneTimeExpirationTime"
                    type="datetime-local"
                    className="form-control"
                    name="oneTimeExpirationTime"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.driverEntity.oneTimeExpirationTime)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="driverLicenseLabel" for="driver-driverLicense">
                    Driver License
                  </Label>
                  <AvField id="driver-driverLicense" type="text" name="driverLicense" />
                </AvGroup>
                <AvGroup>
                  <Label id="phoneTypeLabel" for="driver-phoneType">
                    Phone Type
                  </Label>
                  <AvInput
                    id="driver-phoneType"
                    type="select"
                    className="form-control"
                    name="phoneType"
                    value={(!isNew && driverEntity.phoneType) || 'IPHONE'}
                  >
                    <option value="IPHONE">IPHONE</option>
                    <option value="ANDROID">ANDROID</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="duiConvictionLabel" check>
                    <AvInput id="driver-duiConviction" type="checkbox" className="form-control" name="duiConviction" />
                    Dui Conviction
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="felonyConvictionLabel" check>
                    <AvInput id="driver-felonyConviction" type="checkbox" className="form-control" name="felonyConviction" />
                    Felony Conviction
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label for="driver-location">Location</Label>
                  <AvInput id="driver-location" type="select" className="form-control" name="location.id">
                    <option value="" key="0" />
                    {locations
                      ? locations.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/driver" replace color="info">
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
  locations: storeState.location.entities,
  driverEntity: storeState.driver.entity,
  loading: storeState.driver.loading,
  updating: storeState.driver.updating,
  updateSuccess: storeState.driver.updateSuccess
});

const mapDispatchToProps = {
  getLocations,
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
)(DriverUpdate);
