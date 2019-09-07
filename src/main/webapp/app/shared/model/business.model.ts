export interface IBusiness {
  id?: string;
  name?: string;
  type?: string;
  address?: string;
  phoneNumber?: string;
}

export const defaultValue: Readonly<IBusiness> = {};
