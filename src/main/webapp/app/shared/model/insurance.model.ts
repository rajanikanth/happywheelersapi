import { Moment } from 'moment';

export const enum InsuranceType {
  AUTO = 'AUTO',
  HOME = 'HOME'
}

export interface IInsurance {
  id?: string;
  type?: InsuranceType;
  insuranceProvider?: string;
  insuranceExpDate?: Moment;
}

export const defaultValue: Readonly<IInsurance> = {};
