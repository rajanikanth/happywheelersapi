import { IDriver } from 'app/shared/model/driver.model';

export const enum ServiceType {
  FoodDelivery = 'FoodDelivery',
  Errands = 'Errands',
  Airport = 'Airport',
  Hotel = 'Hotel',
  HeavyItems = 'HeavyItems'
}

export interface IServices {
  id?: string;
  type?: ServiceType;
  driver?: IDriver;
}

export const defaultValue: Readonly<IServices> = {};
