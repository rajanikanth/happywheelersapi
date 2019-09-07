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
import { getEntity, updateEntity, createEntity, reset } from './services.reducer';
import { IServices } from 'app/shared/model/services.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IServicesUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IServicesUpdateState {
  isNew: boolean;
  driverId: string;
}

export class ServicesUpdate extends React.Component<IServicesUpdateProps, IServicesUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      driverId: '0',
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
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { servicesEntity } = this.props;
      const entity = {
        ...servicesEntity,
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
    this.props.history.push('/entity/services');
  };

  render() {
    const { servicesEntity, drivers, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="happywheelersapiApp.services.home.createOrEditLabel">Create or edit a Services</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : servicesEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="services-id">ID</Label>
                    <AvInput id="services-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="typeLabel" for="services-type">
                    Type
                  </Label>
                  <AvInput
                    id="services-type"
                    type="select"
                    className="form-control"
                    name="type"
                    value={(!isNew && servicesEntity.type) || 'FoodDelivery'}
                  >
                    <option value="FoodDelivery">FoodDelivery</option>
                    <option value="Errands">Errands</option>
                    <option value="Airport">Airport</option>
                    <option value="Hotel">Hotel</option>
                    <option value="HeavyItems">HeavyItems</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="services-driver">Driver</Label>
                  <AvInput id="services-driver" type="select" className="form-control" name="driver.id">
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
                <Button tag={Link} id="cancel-save" to="/entity/services" replace color="info">
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
  servicesEntity: storeState.services.entity,
  loading: storeState.services.loading,
  updating: storeState.services.updating,
  updateSuccess: storeState.services.updateSuccess
});

const mapDispatchToProps = {
  getDrivers,
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
)(ServicesUpdate);
