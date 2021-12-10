import {Address, Meta, TechnicianEventType, TimeWindowRecord} from './misc';
import {UserAccountSimpleView, UserAccountView} from './user';

export interface TechnicianTimeWindowRecord extends TimeWindowRecord {
  id: string;
  technicianId: string;
}

export interface Technician {
  id: string;
  address: Address;
  workingHours: TechnicianTimeWindowRecord[];
  userAccount: UserAccountView;
  meta: Meta;
}

export interface TechEventAdditionalInfo {
  leftVacationDays: number;
}

export interface TechnicianView {
  id: string;
  address: Address;
  userAccount: UserAccountView;
  workingHours: TechnicianTimeWindowRecord[];
  meta: Meta;
}

export interface MaintainerView {
  technician: TechnicianView;
  weight: number;
}

export interface TechnicianSimpleView {
  id: string;
  userAccount: UserAccountSimpleView;
  meta: Meta;
}

export interface TechnicianEventView {
  id: string;
  technician: TechnicianSimpleView;
  startTime: string;
  endTime: string;
  eventType: TechnicianEventType;
  notes: string;
  meta: Meta;
}

export interface TechnicianAvailabilityView {
  start: string;
  end: string;
}

export interface TechnicianWithAvailabilityView {
  userAccount: UserAccountView;
  time: string;
  totalHours: string;
}

export interface TechnicianWithUnAvailabilityView {
  userAccount: UserAccountView;
  time: string;
  totalHours: string;
  eventType: string;
}
