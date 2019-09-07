import { Moment } from 'moment';
import { ILocation } from 'app/shared/model/location.model';
import { IVehicle } from 'app/shared/model/vehicle.model';
import { IServices } from 'app/shared/model/services.model';
import { IDeviceDetails } from 'app/shared/model/device-details.model';

export const enum Status {
  INVITED = 'INVITED',
  CONFIRMED = 'CONFIRMED',
  DENIED = 'DENIED'
}

export const enum PhoneType {
  IPHONE = 'IPHONE',
  ANDROID = 'ANDROID'
}

export interface IDriver {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  phoneNumber?: string;
  status?: Status;
  oneTimeCode?: string;
  oneTimeExpirationTime?: Moment;
  driverLicense?: string;
  phoneType?: PhoneType;
  duiConviction?: boolean;
  felonyConviction?: boolean;
  location?: ILocation;
  cars?: IVehicle[];
  services?: IServices[];
  devices?: IDeviceDetails[];
}

export const defaultValue: Readonly<IDriver> = {
  duiConviction: false,
  felonyConviction: false
};
