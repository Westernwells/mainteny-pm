import React, {useEffect, useState} from 'react';
import * as _ from 'lodash';
import {ElevatorView} from '../../models/elevator';
import {ServiceOrderView} from '../../models/service-order';
import {fetchElevators} from '../../hooks/useElevator';
import {fetchServiceOrders} from '../../hooks/useServiceOrder';
import {Resource} from '../../models/misc';
import {ElevatorsByAddress, ElevatorOrderPair} from './Models';
import {UnitsSection} from './UnitsSection';

export const MyUnits = () => {
  const [isLoading, setLoading] = useState(true);
  const [elevatorsByAddressList, setElevatorsByAddressList] = useState<
    ElevatorsByAddress[]
  >([]);

  useEffect(() => {
    async function loadData() {
      const data = await Promise.all([fetchElevators(), fetchServiceOrders()]);
      const elevatorRes: Resource<ElevatorView> = data[0];
      const serviceOrderRes: Resource<ServiceOrderView> = data[1];
      const serviceOrderMap = _.groupBy(
        serviceOrderRes.data,
        (order: ServiceOrderView) => order.elevator.id,
      );
      const elevatorWithOrders = elevatorRes.data.map((elevator) => {
        const orders = serviceOrderMap[elevator.id];
        const elevatorWithOrder: ElevatorOrderPair = {
          elevator,
          serviceOrder: orders && orders[0],
        };
        return elevatorWithOrder;
      });
      const elevatorByAddressList: ElevatorsByAddress[] = _.values(
        _.groupBy(elevatorWithOrders, (record) => record.elevator.address.id),
      ).map((elevators) => ({
        elevators,
        address: elevators[0].elevator.address,
      }));

      setElevatorsByAddressList(elevatorByAddressList);
      setLoading(false);
    }

    loadData();
  }, []);

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      {elevatorsByAddressList.map((elevatorsByAddress) => (
        <UnitsSection
          key={elevatorsByAddress.address.id}
          elevatorsByAddress={elevatorsByAddress}
        />
      ))}
    </div>
  );
};
