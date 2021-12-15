import {ElevatorView} from '../../models/elevator';
import {ServiceOrderView} from '../../models/service-order';
import {Address} from '../../models/misc';

export interface ElevatorOrderPair {
  elevator: ElevatorView;
  serviceOrder?: ServiceOrderView;
}

export interface ElevatorsByAddress {
  elevators: ElevatorOrderPair[];
  address: Address;
}
