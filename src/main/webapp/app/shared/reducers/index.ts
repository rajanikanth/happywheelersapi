import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import driver, {
  DriverState
} from 'app/entities/driver/driver.reducer';
// prettier-ignore
import deviceDetails, {
  DeviceDetailsState
} from 'app/entities/device-details/device-details.reducer';
// prettier-ignore
import location, {
  LocationState
} from 'app/entities/location/location.reducer';
// prettier-ignore
import vehicle, {
  VehicleState
} from 'app/entities/vehicle/vehicle.reducer';
// prettier-ignore
import insurance, {
  InsuranceState
} from 'app/entities/insurance/insurance.reducer';
// prettier-ignore
import services, {
  ServicesState
} from 'app/entities/services/services.reducer';
// prettier-ignore
import business, {
  BusinessState
} from 'app/entities/business/business.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly driver: DriverState;
  readonly deviceDetails: DeviceDetailsState;
  readonly location: LocationState;
  readonly vehicle: VehicleState;
  readonly insurance: InsuranceState;
  readonly services: ServicesState;
  readonly business: BusinessState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  driver,
  deviceDetails,
  location,
  vehicle,
  insurance,
  services,
  business,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;
