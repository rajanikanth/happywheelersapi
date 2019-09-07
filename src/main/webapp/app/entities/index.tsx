import React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Driver from './driver';
import DeviceDetails from './device-details';
import Location from './location';
import Vehicle from './vehicle';
import Insurance from './insurance';
import Services from './services';
import Business from './business';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/driver`} component={Driver} />
      <ErrorBoundaryRoute path={`${match.url}/device-details`} component={DeviceDetails} />
      <ErrorBoundaryRoute path={`${match.url}/location`} component={Location} />
      <ErrorBoundaryRoute path={`${match.url}/vehicle`} component={Vehicle} />
      <ErrorBoundaryRoute path={`${match.url}/insurance`} component={Insurance} />
      <ErrorBoundaryRoute path={`${match.url}/services`} component={Services} />
      <ErrorBoundaryRoute path={`${match.url}/business`} component={Business} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
