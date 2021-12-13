import {Client, ClientSimpleView} from './client';
import {ServiceCompany, ServiceCompanySimpleView} from './service-company';
import {Meta, TimeWindowRecord, TimeWindowType} from './misc';
import {Elevator} from './elevator';

export enum ContractStatus {
  PENDING = 'PENDING',
  VALID = 'VALID',
  EXPIRED = 'EXPIRED',
}

export enum ContractType {
  BASIC = 'BASIC',
  MEDIUM = 'MEDIUM',
  PREMIUM = 'PREMIUM',
}

export enum ContractOrderField {
  EXPIRY_TIME = 'EXPIRY_TIME',
  CREATED_TIME = 'CREATED_TIME',
}

export interface ContractTimeWindow {
  id: string;
  contractId: string;
  fromTime: string;
  toTime: string;
  type: TimeWindowType;
}

export interface ContractElevator {
  id: string;
  contractId: string;
  elevator: Elevator;
}

export interface Contract {
  id: string;
  propertyOwner: Client;
  serviceCompany: ServiceCompany;
  type: ContractType;
  elevators: ContractElevator[];
  visitsNumber: number;
  sla: number;
  spendingLimit: number;
  price: number;
  hourlyRate: number;
  currency: string;
  startTime: string;
  endTime: string;
  timePreference: ContractTimeWindow[];
  status: ContractStatus;
  meta: Meta;
}

export interface ContractView {
  id: string;
  propertyOwner: ClientSimpleView;
  serviceCompany: ServiceCompanySimpleView;
  type: ContractType;
  visitsNumber: number;

  sla: number;
  spendingLimit: number;
  price: number;

  hourlyRate: number;
  currency: string;
  startTime: string;
  endTime: string;

  status: ContractStatus;
  search: string;
  meta: Meta;
}

export interface ContractViewWithUnits {
  contractView: ContractView;
  units: number;
}

export interface ContractSimpleView {
  id: string;
  type: ContractType;
  visitsNumber: number;
  sla: number;
  spendingLimit: number;
  price: number;
  hourlyRate: number;
  currency: string;
  startTime: string;
  endTime: string;
  search: string;
  status: ContractStatus;
  meta: Meta;
}

export interface CreateContractRecord {
  propertyOwnerId: string;
  serviceCompanyId: string;
  type: ContractType;
  elevators: string[];
  visitsNumber: number;
  sla: number;
  spendingLimit: number;
  price: number;
  hourlyRate: number;
  currency: string;
  startDate: string;
  endDate: string;
  timePreference: TimeWindowRecord[];
}

export interface UpdateContractRecord {
  id: string;
  type: ContractType;
  visitsNumber: number;
  sla: number;
  spendingLimit: number;
  price: number;
  hourlyRate: number;
  currency: string;
  startDate: string;
  endDate: string;
  timePreference: TimeWindowRecord[];
}
