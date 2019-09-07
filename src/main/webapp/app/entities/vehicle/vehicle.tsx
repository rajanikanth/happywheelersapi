import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudSearchAction, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './vehicle.reducer';
import { IVehicle } from 'app/shared/model/vehicle.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVehicleProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IVehicleState {
  search: string;
}

export class Vehicle extends React.Component<IVehicleProps, IVehicleState> {
  state: IVehicleState = {
    search: ''
  };

  componentDidMount() {
    this.props.getEntities();
  }

  search = () => {
    if (this.state.search) {
      this.props.getSearchEntities(this.state.search);
    }
  };

  clear = () => {
    this.setState({ search: '' }, () => {
      this.props.getEntities();
    });
  };

  handleSearch = event => this.setState({ search: event.target.value });

  render() {
    const { vehicleList, match } = this.props;
    return (
      <div>
        <h2 id="vehicle-heading">
          Vehicles
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Vehicle
          </Link>
        </h2>
        <Row>
          <Col sm="12">
            <AvForm onSubmit={this.search}>
              <AvGroup>
                <InputGroup>
                  <AvInput type="text" name="search" value={this.state.search} onChange={this.handleSearch} placeholder="Search" />
                  <Button className="input-group-addon">
                    <FontAwesomeIcon icon="search" />
                  </Button>
                  <Button type="reset" className="input-group-addon" onClick={this.clear}>
                    <FontAwesomeIcon icon="trash" />
                  </Button>
                </InputGroup>
              </AvGroup>
            </AvForm>
          </Col>
        </Row>
        <div className="table-responsive">
          {vehicleList && vehicleList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Type</th>
                  <th>Make</th>
                  <th>Model</th>
                  <th>Year</th>
                  <th>Plate Number</th>
                  <th>Support Heavy Transport</th>
                  <th>Vin Number</th>
                  <th>Registration Exp Date</th>
                  <th>Driver</th>
                  <th>Auto Insurance</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {vehicleList.map((vehicle, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${vehicle.id}`} color="link" size="sm">
                        {vehicle.id}
                      </Button>
                    </td>
                    <td>{vehicle.type}</td>
                    <td>{vehicle.make}</td>
                    <td>{vehicle.model}</td>
                    <td>{vehicle.year}</td>
                    <td>{vehicle.plateNumber}</td>
                    <td>{vehicle.supportHeavyTransport ? 'true' : 'false'}</td>
                    <td>{vehicle.vinNumber}</td>
                    <td>
                      <TextFormat type="date" value={vehicle.registrationExpDate} format={APP_DATE_FORMAT} />
                    </td>
                    <td>{vehicle.driver ? <Link to={`driver/${vehicle.driver.id}`}>{vehicle.driver.id}</Link> : ''}</td>
                    <td>
                      {vehicle.autoInsurance ? <Link to={`insurance/${vehicle.autoInsurance.id}`}>{vehicle.autoInsurance.id}</Link> : ''}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${vehicle.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${vehicle.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${vehicle.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Vehicles found</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ vehicle }: IRootState) => ({
  vehicleList: vehicle.entities
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Vehicle);
