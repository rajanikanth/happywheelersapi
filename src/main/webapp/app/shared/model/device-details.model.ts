import { IDriver } from 'app/shared/model/driver.model';

export interface IDeviceDetails {
  id?: string;
  deviceId?: string;
  driver?: IDriver;
}

export const defaultValue: Readonly<IDeviceDetails> = {};
