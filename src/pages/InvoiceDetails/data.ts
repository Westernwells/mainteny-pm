import {ElevatorCategory, ElevatorStatus} from 'models/elevator';
import {Address, Meta, Priority, State} from 'models/misc';
import {
  ServiceOrderStatus,
  ServiceOrderType,
  ServiceOrderView,
} from 'models/service-order';

const meta: Meta = {
  createdAt: '2021-01-12',
  creator: 'mainteny-admin',
  lastUpdatedAt: '2021-01-12',
  state: State.ACTIVE,
};
const address: Address = {
  id: 'add-001',
  fullName: 'McDonald',
  countryCode: 'DE',
  location: {
    longitude: 0,
    latitude: 0,
  },
};
export const serviceOrder: ServiceOrderView = {
  id: 'abc123',
  number: 'ISS-12012',
  externalID: 'abc123',
  serviceCompany: {
    id: 'sc-001',
    name: 'AstraLift BV',
    meta,
  },
  elevator: {
    id: 'ele-001',
    propertyOwner: {
      id: 'cus-001',
      name: 'McDonald',
      serviceCompanyId: 'sc-001',
      address,
      contact: {
        phone: '+12 12345 67890',
        email: 'de@mcdonalds.com',
      },
      labels: [],
      additionalInfo: {
        priority: Priority.A,
      },
      meta,
    },
    number: '001',
    model: 'Schinder',
    type: 'Elevator',
    capacity: '200kg',
    category: ElevatorCategory.ELEVATOR,
    address,
    lastVisitDate: '2020-11-01',
    serviceTime: 10,
    status: ElevatorStatus.BROKEN,
    labels: [],
    additionalInfo: {
      isServiceOrderGenerationEnabled: true,
      priority: Priority.A,
    },
    meta,
  },
  description: 'Broken Elevator. 20 People struck inside.',
  type: ServiceOrderType.EMERGENCY,
  status: ServiceOrderStatus.COMPLETED,
  lastVisitDate: '2020-11-01',
  actualEndTime: '2021-01-13',
  dueDate: '2021-02-01',
  expectedVisitDate: '2021-02-01',
  schedules: [],
  search: '',
  labels: [],
  meta,
  additionalInfo: {
    appointmentConfirmed: true,
    appointmentNotificationRequired: true,
    appointmentNotificationSent: false,
    priority: Priority.A,
  },
};
export const workReportText = `10 / 6-2020: Secured lift and counterweight for disconnection of engine and brake. Disassembled engine with brake and
delivered it to a workshop in Råde.

22 / 6-2020: Picked up engine at workshop. Mounted motor with brake and removed securing of lift and counterweight. Refilled oil on the gear unit between the hoist and the shaft for chains. Controlled brake, ok. Controlled stop length in the
event of a breakdown of photocells. Average stop length: 7.5 cm. Max stop length: 16.5 cm. Elevator put into operation

10 / 6-2020: Secured lift and counterweight for disconnection of engine and brake. Disassembled engine with brake and
delivered it to a workshop in Råde.

22 / 6-2020: Picked up engine at workshop. Mounted motor with brake and removed securing of lift and counterweight. Refilled oil on the gear unit between the hoist and the shaft for chains. Controlled brake, ok. Controlled stop length in the
event of a breakdown of photocells. Average stop length: 7.5 cm. Max stop length: 16.5 cm. Elevator put into operation`;
export const invoiceUrl = '/pm/INV000128.pdf';
