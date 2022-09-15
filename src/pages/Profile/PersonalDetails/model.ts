import {convertToText} from 'utils/utils';

export enum RolesType {
  FACILITY_MANAGER = 'FACILITY_MANAGER',
  PROPERTY_MANAGER = 'PROPERTY_MANAGER',
  CONTACT_PERSON = 'CONTACT_PERSON',
  ASSET_OWNER = 'ASSET_OWNER',
}

export const roles = Object.keys(RolesType).map((role) => ({
  label: convertToText(role),
  value: role,
}));

export interface PersonalDetailsFormModel {
  name: string;
  role: string;
  phone: string;
}
