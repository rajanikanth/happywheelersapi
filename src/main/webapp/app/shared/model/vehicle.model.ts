import { Moment } from 'moment';
import { IDriver } from 'app/shared/model/driver.model';
import { IInsurance } from 'app/shared/model/insurance.model';

export const enum VehicleType {
  SEDAN = 'SEDAN',
  SUV = 'SUV',
  PICKUP = 'PICKUP',
  VAN = 'VAN'
}

export interface IVehicle {
  id?: string;
  type?: VehicleType;
  make?: string;
  model?: string;
  year?: string;
  plateNumber?: string;
  supportHeavyTransport?: boolean;
  vinNumber?: string;
  registrationExpDate?: Moment;
  driver?: IDriver;
  autoInsurance?: IInsurance;
}

export const defaultValue: Readonly<IVehicle> = {
  supportHeavyTransport: false
};
