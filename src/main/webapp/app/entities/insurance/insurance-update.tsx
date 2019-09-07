import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './insurance.reducer';
import { IInsurance } from 'app/shared/model/insurance.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IInsuranceUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IInsuranceUpdateState {
  isNew: boolean;
}

export class InsuranceUpdate extends React.Component<IInsuranceUpdateProps, IInsuranceUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
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
  }

  saveEntity = (event, errors, values) => {
    values.insuranceExpDate = convertDateTimeToServer(values.insuranceExpDate);

    if (errors.length === 0) {
      const { insuranceEntity } = this.props;
      const entity = {
        ...insuranceEntity,
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
    this.props.history.push('/entity/insurance');
  };

  render() {
    const { insuranceEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="happywheelersapiApp.insurance.home.createOrEditLabel">Create or edit a Insurance</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : insuranceEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="insurance-id">ID</Label>
                    <AvInput id="insurance-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="typeLabel" for="insurance-type">
                    Type
                  </Label>
                  <AvInput
                    id="insurance-type"
                    type="select"
                    className="form-control"
                    name="type"
                    value={(!isNew && insuranceEntity.type) || 'AUTO'}
                  >
                    <option value="AUTO">AUTO</option>
                    <option value="HOME">HOME</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="insuranceProviderLabel" for="insurance-insuranceProvider">
                    Insurance Provider
                  </Label>
                  <AvField
                    id="insurance-insuranceProvider"
                    type="text"
                    name="insuranceProvider"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="insuranceExpDateLabel" for="insurance-insuranceExpDate">
                    Insurance Exp Date
                  </Label>
                  <AvInput
                    id="insurance-insuranceExpDate"
                    type="datetime-local"
                    className="form-control"
                    name="insuranceExpDate"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.insuranceEntity.insuranceExpDate)}
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/insurance" replace color="info">
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
  insuranceEntity: storeState.insurance.entity,
  loading: storeState.insurance.loading,
  updating: storeState.insurance.updating,
  updateSuccess: storeState.insurance.updateSuccess
});

const mapDispatchToProps = {
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
)(InsuranceUpdate);
