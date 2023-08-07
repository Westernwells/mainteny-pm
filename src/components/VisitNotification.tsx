import React from 'react';
import {formatDistance, formatDistanceStrict, isAfter} from 'date-fns';
import {ServiceOrderStatus, ServiceOrderView} from 'models/service-order';
import {calculateNextVisitDate} from 'pages/Units/Models';
import {CardAlert} from './CardAlert';

interface Props {
  serviceOrder?: ServiceOrderView;
}

export const VisitNotification = ({serviceOrder}: Props) => {
  const renderText = () => {
    if (
      isAfter(new Date(serviceOrder!.schedules[0].startTime), new Date()) &&
      serviceOrder &&
      serviceOrder.status === ServiceOrderStatus.SCHEDULED
    ) {
      return `${serviceOrder?.schedules[0].technician.userAccount.firstName} ${
        serviceOrder?.schedules[0].technician.userAccount.lastName
      } will be visiting your location in ${formatDistance(
        calculateNextVisitDate(serviceOrder?.schedules[0].startTime!),
        new Date(),
      )}`;
    }

    if (serviceOrder?.status === ServiceOrderStatus.COMPLETED) {
      return `${serviceOrder?.schedules[0].technician.userAccount.firstName} ${
        serviceOrder?.schedules[0].technician.userAccount.lastName
      } visited your location ${formatDistanceStrict(
        new Date(),
        calculateNextVisitDate(serviceOrder?.actualEndTime!),
      )} ago`;
    }

    return null;
  };
  return <CardAlert message={renderText()} />;
};
