import {
  MessageType,
  ContractExpiryAlertData,
  ServiceOrderScheduleAlertData,
} from 'models/notification';
import {useUserSession} from 'hooks/reactQuery/useUserSession';
import {formatDate} from './datetime';

export const convertServiceOrderScheduleAlert = (
  data: string,
): ServiceOrderScheduleAlertData =>
  <ServiceOrderScheduleAlertData>JSON.parse(data);

export const convertContractExpiryAlert = (
  data: string,
): ContractExpiryAlertData => <ContractExpiryAlertData>JSON.parse(data);

export const notificationJSONDataToObject = (
  messageType: MessageType | string,
  data: string,
) => {
  switch (messageType) {
    case MessageType.SERVICE_ORDER_SCHEDULE_ALERT:
      return convertServiceOrderScheduleAlert(data);
    case MessageType.CONTRACT_EXPIRY_ALERT:
      return convertContractExpiryAlert(data);
    default:
      return convertServiceOrderScheduleAlert(data);
  }
};

export const notificationTypeToString = (type: MessageType | string) => {
  switch (type) {
    case MessageType.SERVICE_ORDER_SCHEDULE_ALERT:
      return 'Upcoming Maintenance';
    case MessageType.CONTRACT_EXPIRY_ALERT:
      return 'Contract Expiry';
    default:
      return '-';
  }
};

export const notificationTitle = (
  type: MessageType | string,
  notificationData: ContractExpiryAlertData | ServiceOrderScheduleAlertData,
) => {
  const {user} = useUserSession();

  switch (type) {
    case MessageType.SERVICE_ORDER_SCHEDULE_ALERT:
      return (notificationData as ServiceOrderScheduleAlertData).serviceOrder
        .elevator.propertyOwner.name;
    case MessageType.CONTRACT_EXPIRY_ALERT:
      return user?.userAccount.serviceCompany.name;
    default:
      return '-';
  }
};

export const notificationSubtitle = (
  type: MessageType | string,
  notificationData: ContractExpiryAlertData | ServiceOrderScheduleAlertData,
) => {
  switch (type) {
    case MessageType.SERVICE_ORDER_SCHEDULE_ALERT: {
      const data = notificationData as ServiceOrderScheduleAlertData;
      const scheduledTime = data.serviceOrder?.scheduledTime;
      const date = formatDate(data.serviceOrder?.scheduledTime?.from ?? '');
      const from = formatDate(scheduledTime?.from ?? '', 'HH:mm');
      const to = formatDate(scheduledTime?.to ?? '', 'HH:mm');
      return `There will be a maintenance visit for the unit on ${date} between ${from} to ${to} CEST.`;
    }
    case MessageType.CONTRACT_EXPIRY_ALERT: {
      const data = notificationData as ContractExpiryAlertData;
      const {user} = useUserSession();
      const serviceCompanyName = user?.userAccount.serviceCompany.name;
      return `${serviceCompanyName}'s contract for the unit will be expiring in ${data.days} days.`;
    }
    default:
      return '-';
  }
};

export const notificationButtonLabel = (type: MessageType | string) => {
  switch (type) {
    case MessageType.SERVICE_ORDER_SCHEDULE_ALERT:
      return 'View Order';
    case MessageType.CONTRACT_EXPIRY_ALERT:
      return 'View Contract';
    default:
      return '-';
  }
};
