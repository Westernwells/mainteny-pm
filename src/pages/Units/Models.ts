import {FormikErrors} from 'formik';
import {ElevatorView} from '../../models/elevator';
import {ServiceOrderView} from '../../models/service-order';
import {Address} from '../../models/misc';
import {getDateObject} from '../../utils/datetime';

export interface ElevatorDataGrid {
  address: string;
  showAddress: boolean;
}

export interface ElevatorOrderPair {
  elevator: ElevatorView;
  serviceOrder?: ServiceOrderView;
}

export interface ElevatorsByAddress {
  elevators: ElevatorOrderPair[];
  address: Address;
}
export interface ElevatorByAddr {
  [key: string]: ElevatorView[];
}

export interface UnitsSectionProperty {
  elevators: ElevatorView[];
  address: string;
  setDrawerOpen: (state: boolean) => void;
  setField: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => Promise<void> | Promise<FormikErrors<any>>;
}

export interface DataGridElevatorView extends ElevatorView {
  showAddress: boolean;
}

// TODO: this is the mocked call to get date in the future
export function calculateNextVisitDate(time: string): Date {
  return getDateObject(time);
}
