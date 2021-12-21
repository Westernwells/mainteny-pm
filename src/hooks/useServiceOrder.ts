import {useQuery} from 'react-query';
import * as _ from 'lodash';
import {
  JobScheduleType,
  ServiceOrderStatus,
  ServiceOrderType,
  ServiceOrderView,
} from '../models/service-order';
import {Priority, Resource, RestError, State} from '../models/misc';
import {
  ElevatorCategory,
  ElevatorStatus,
  ElevatorView,
} from '../models/elevator';
import {ContractStatus, ContractType} from '../models/contract';
import {UserAccountStatus} from '../models/user';
import {ElevatorOrderPair, ElevatorsByAddress} from '../pages/Units/Models';
import {createResource} from '../utils/paging-utils';

const serviceOrders: Resource<ServiceOrderView> = {
  data: [
    {
      id: '4f9c4552-089f-4447-9bfd-fd604ba35eec',
      number: 'MT-0004261',
      externalID: 'system',
      serviceCompany: {
        id: '9d85be2d-ceb9-4b19-a350-9f512b4b57e4',
        name: 'Maintenance Experts GmbH',
        meta: {
          createdAt: '2021-05-31T08:32:55.193896Z',
          lastUpdatedAt: '2021-05-31T08:32:55.193897Z',
          state: State.ACTIVE,
        },
      },
      elevator: {
        id: '2488ea54-bd6f-4ea3-84e9-333820a870d0',
        number: '475',
        model: 'Johnsen',
        type: '-',
        capacity: '-',
        category: ElevatorCategory.MOVING_WALKWAY,
        address: {
          id: '5db19fde-2d40-4c70-b539-ae0a477deefb',
          fullName: 'Baerwaldstraße 56, 10961 Berlin, Germany',
          countryCode: 'DE',
          location: {longitude: 13.4022805, latitude: 52.49287390000001},
        },
        propertyOwner: {
          id: '816fb0f2-fdb7-4207-8933-b5fa0bda7cf1',
          name: 'August Storck',
          serviceCompanyId: '9d85be2d-ceb9-4b19-a350-9f512b4b57e4',
          address: {
            id: '5db19fde-2d40-4c70-b539-ae0a477deefb',
            fullName: 'Baerwaldstraße 56, 10961 Berlin, Germany',
            countryCode: 'DE',
            location: {longitude: 13.4022805, latitude: 52.49287390000001},
          },
          contact: {phone: '2512026', email: 'email@company.com'},
          labels: [],
          additionalInfo: {priority: Priority.NONE},
          meta: {
            createdAt: '2021-06-01T12:11:01.069590Z',
            lastUpdatedAt: '2021-06-01T12:11:01.069590Z',
            state: State.ACTIVE,
          },
        },
        lastVisitDate: '2021-03-18',
        serviceTime: 60,
        status: ElevatorStatus.RUNNING,
        labels: [],
        additionalInfo: {
          priority: Priority.NONE,
          isServiceOrderGenerationEnabled: true,
        },
        meta: {
          createdAt: '2021-06-01T12:11:01.343449Z',
          lastUpdatedAt: '2021-06-01T12:11:01.343449Z',
          state: State.ACTIVE,
        },
      },
      contract: {
        id: '8c0f4634-2e86-4332-9336-b0b36d017e51',
        type: ContractType.BASIC,
        visitsNumber: 4,
        sla: 0,
        spendingLimit: 0,
        price: 0,
        hourlyRate: 0,
        currency: 'EUR',
        startTime: '2020-12-03T00:00:00Z',
        endTime: '2023-01-01T00:00:00Z',
        status: ContractStatus.VALID,
        search: 'august storck basic eur valid',
        meta: {
          createdAt: '2021-06-01T12:11:01.637260Z',
          lastUpdatedAt: '2021-06-01T12:11:01.637260Z',
          state: State.ACTIVE,
        },
      },
      description: 'Regular Maintenance',
      type: ServiceOrderType.REGULAR,
      status: ServiceOrderStatus.SCHEDULED,
      lastVisitDate: '2021-03-18',
      expectedVisitDate: '2021-06-17',
      dueDate: '2021-07-17',
      serviceTime: 0,
      schedules: [
        {
          id: '82b9d185-9240-42aa-be0a-25a70611238d',
          serviceOrderId: '4f9c4552-089f-4447-9bfd-fd604ba35eec',
          technician: {
            id: '69e3348a-0bc1-4e38-a6dd-614d7f7c6715',
            address: {
              id: '247d0978-bfa8-4c17-ac7a-9a68fac8cb5f',
              fullName: 'Parkstraße 24, Trebbin, Germany',
              countryCode: 'DE',
              location: {longitude: 13.22624, latitude: 52.21742},
            },
            userAccount: {
              id: '78d843b4-382b-49cb-8e33-c21c714da7d3',
              username: 'robert@maintenance.com',
              firstName: 'Robert',
              lastName: 'Muller',
              photoUrl: '',
              contact: {
                phone: ' +4900000000000',
                email: 'robert@maintenance.com',
              },
              roles: ['TECHNICIAN'],
              status: UserAccountStatus.RESET_PASSWORD,
              meta: {
                createdAt: '2021-05-31T21:57:27.948955Z',
                lastUpdatedAt: '2021-11-06T08:46:47.922103Z',
                state: State.ACTIVE,
              },
            },
            isOnline: true,
            additionalInfo: {
              leftVacationDays: 30.0,
              assignedServiceOrderTypes: [],
            },
            meta: {
              createdAt: '2021-05-31T21:57:28.005282Z',
              lastUpdatedAt: '2021-11-06T08:46:47.927659Z',
              state: State.ACTIVE,
            },
          },
          startTime: '2021-12-19T13:00:00',
          endTime: '2021-12-19T14:00:00',
          type: JobScheduleType.AUTO,
          source: 'NIGHTLY_SHUFFLE',
          createdAt: '2021-12-19T00:08:01.374983Z',
        },
      ],
      additionalInfo: {
        appointmentNotificationSent: false,
        appointmentConfirmed: false,
        appointmentNotificationRequired: false,
        priority: Priority.NONE,
      },
      labels: [],
      search:
        'system, baerwaldstraße 56, 10961 berlin, germany de august storck running 475 johnsen - - moving_walkway [], august storck basic eur valid, regular, scheduled, []',
      meta: {
        createdAt: '2021-06-01T12:12:08.888752Z',
        lastUpdatedAt: '2021-12-19T00:08:01.893710Z',
        state: State.ACTIVE,
      },
    },
    {
      id: '7adf15ff-42cb-4c2a-a477-0c4e8fdef093',
      number: 'MT-0004212',
      externalID: 'system',
      serviceCompany: {
        id: '9d85be2d-ceb9-4b19-a350-9f512b4b57e4',
        name: 'Maintenance Experts GmbH',
        meta: {
          createdAt: '2021-05-31T08:32:55.193896Z',
          lastUpdatedAt: '2021-05-31T08:32:55.193897Z',
          state: State.ACTIVE,
        },
      },
      elevator: {
        id: 'add6168d-d7c4-4434-975b-8fdcc72b7546',
        number: '437',
        model: 'Schindler',
        type: '-',
        capacity: '-',
        category: ElevatorCategory.ESCALATOR,
        address: {
          id: '6d73dd20-e271-4532-a6a2-54d113df8c29',
          fullName: 'Scharnweberstraße 35, 10247 Berlin, Germany',
          countryCode: 'DE',
          location: {longitude: 13.4631665, latitude: 52.5131019},
        },
        propertyOwner: {
          id: 'a9e347f7-0a63-44d0-946d-b4099d257c74',
          name: 'August Storck',
          serviceCompanyId: '9d85be2d-ceb9-4b19-a350-9f512b4b57e4',
          address: {
            id: '6d73dd20-e271-4532-a6a2-54d113df8c29',
            fullName: 'Scharnweberstraße 35, 10247 Berlin, Germany',
            countryCode: 'DE',
            location: {longitude: 13.4631665, latitude: 52.5131019},
          },
          contact: {phone: '86338421', email: 'email@company.com'},
          labels: [],
          additionalInfo: {priority: Priority.NONE},
          meta: {
            createdAt: '2021-06-01T12:09:56.941483Z',
            lastUpdatedAt: '2021-06-01T12:09:56.941484Z',
            state: State.ACTIVE,
          },
        },
        lastVisitDate: '2021-01-10',
        serviceTime: 60,
        status: ElevatorStatus.RUNNING,
        labels: [],
        additionalInfo: {
          priority: Priority.NONE,
          isServiceOrderGenerationEnabled: true,
        },
        meta: {
          createdAt: '2021-06-01T12:09:57.208542Z',
          lastUpdatedAt: '2021-06-01T12:09:57.208543Z',
          state: State.ACTIVE,
        },
      },
      contract: {
        id: 'a2d4e00f-0e44-49d9-844d-c791c47e3b87',
        type: ContractType.BASIC,
        visitsNumber: 4,
        sla: 0,
        spendingLimit: 0,
        price: 0,
        hourlyRate: 0,
        currency: 'EUR',
        startTime: '2020-12-03T00:00:00Z',
        endTime: '2022-05-01T00:00:00Z',
        status: ContractStatus.VALID,
        search: 'august storck basic eur valid',
        meta: {
          createdAt: '2021-06-01T12:09:57.502411Z',
          lastUpdatedAt: '2021-06-01T12:09:57.502411Z',
          state: State.ACTIVE,
        },
      },
      description: 'The door can not open',
      type: ServiceOrderType.REPAIR,
      status: ServiceOrderStatus.SCHEDULED,
      lastVisitDate: '2021-01-10',
      expectedVisitDate: '2021-04-11',
      dueDate: '2021-05-11',
      serviceTime: 0,
      schedules: [
        {
          id: 'd59126dd-dcaa-4934-b724-bf09a33d4b6b',
          serviceOrderId: '7adf15ff-42cb-4c2a-a477-0c4e8fdef093',
          technician: {
            id: 'd861d168-c508-473a-9085-a07d249a9ea4',
            address: {
              id: '6c9b9ae4-2a58-4238-8372-4391060c0858',
              fullName: 'Parkstraße 30, Trebbin, Germany',
              countryCode: 'DE',
              location: {longitude: 13.22216, latitude: 52.21791},
            },
            userAccount: {
              id: '89e05506-7456-4835-aba3-ed0c30e90e05',
              username: 'herman@gunther.com',
              firstName: 'Herman',
              lastName: 'Gunther',
              photoUrl: '',
              contact: {phone: ' +4900000000000', email: 'herman@gunther.com'},
              roles: ['TECHNICIAN'],
              status: UserAccountStatus.NORMAL,
              meta: {
                createdAt: '2021-05-31T22:02:19.425181Z',
                lastUpdatedAt: '2021-11-06T08:44:27.431991Z',
                state: State.ACTIVE,
              },
            },
            isOnline: true,
            additionalInfo: {
              leftVacationDays: 30.0,
              assignedServiceOrderTypes: [],
            },
            meta: {
              createdAt: '2021-05-31T22:02:19.462518Z',
              lastUpdatedAt: '2021-11-06T08:44:27.453031Z',
              state: State.ACTIVE,
            },
          },
          startTime: '2021-06-07T14:00:00',
          endTime: '2021-06-07T15:00:00',
          type: JobScheduleType.AUTO,
          source: 'UNKNOWN',
          createdAt: '2021-06-21T21:36:00.523006Z',
        },
      ],
      additionalInfo: {
        appointmentNotificationSent: false,
        appointmentConfirmed: false,
        appointmentNotificationRequired: false,
        priority: Priority.NONE,
      },
      labels: [],
      search:
        'system, scharnweberstraße 35, 10247 berlin, germany de august storck running 437 schindler - -, august storck basic eur valid, regular, scheduled',
      meta: {
        createdAt: '2021-06-01T12:12:08.429760Z',
        lastUpdatedAt: '2021-06-08T06:49:02.468364Z',
        state: State.ACTIVE,
      },
    },
    {
      id: '6f0fea62-91ad-4f4d-8736-3d6ec0eb7c33',
      number: 'MT-0004143',
      externalID: 'system',
      serviceCompany: {
        id: '9d85be2d-ceb9-4b19-a350-9f512b4b57e4',
        name: 'Maintenance Experts GmbH',
        meta: {
          createdAt: '2021-05-31T08:32:55.193896Z',
          lastUpdatedAt: '2021-05-31T08:32:55.193897Z',
          state: State.ACTIVE,
        },
      },
      elevator: {
        id: 'a992d7a3-b58b-469e-944f-758f14d40f0c',
        number: '356',
        model: 'Schindler',
        type: '-',
        capacity: '-',
        category: ElevatorCategory.FACADE_ACCESS_SYSTEM,
        address: {
          id: '2caa6bf6-8bcf-4c5b-8eb2-71fccb68a594',
          fullName: 'Richard-Sorge-Straße 44, 10249 Berlin, Germany',
          countryCode: 'DE',
          location: {longitude: 13.4445769, latitude: 52.5241427},
        },
        propertyOwner: {
          id: 'f5e13e10-9e09-4e0c-878d-a2cbc0e8ee00',
          name: 'August Storck',
          serviceCompanyId: '9d85be2d-ceb9-4b19-a350-9f512b4b57e4',
          address: {
            id: '2caa6bf6-8bcf-4c5b-8eb2-71fccb68a594',
            fullName: 'Richard-Sorge-Straße 44, 10249 Berlin, Germany',
            countryCode: 'DE',
            location: {longitude: 13.4445769, latitude: 52.5241427},
          },
          contact: {phone: '25562629', email: 'email@company.com'},
          labels: [],
          additionalInfo: {priority: Priority.NONE},
          meta: {
            createdAt: '2021-06-01T12:07:51.503721Z',
            lastUpdatedAt: '2021-06-01T12:07:51.503721Z',
            state: State.ACTIVE,
          },
        },
        lastVisitDate: '2021-01-25',
        serviceTime: 60,
        status: ElevatorStatus.RUNNING,
        labels: [],
        additionalInfo: {
          priority: Priority.NONE,
          isServiceOrderGenerationEnabled: true,
        },
        meta: {
          createdAt: '2021-06-01T12:07:51.766909Z',
          lastUpdatedAt: '2021-06-01T12:07:51.766909Z',
          state: State.ACTIVE,
        },
      },
      contract: {
        id: '636c9893-a26b-4ea3-82e4-89d191656e15',
        type: ContractType.BASIC,
        visitsNumber: 4,
        sla: 0,
        spendingLimit: 0,
        price: 0,
        hourlyRate: 0,
        currency: 'EUR',
        startTime: '2020-12-03T00:00:00Z',
        endTime: '2022-05-01T00:00:00Z',
        status: ContractStatus.VALID,
        search: 'august storck basic eur valid',
        meta: {
          createdAt: '2021-06-01T12:07:52.068670Z',
          lastUpdatedAt: '2021-06-01T12:07:52.068670Z',
          state: State.ACTIVE,
        },
      },
      description: 'The elevator stopped working',
      type: ServiceOrderType.CALLOUT,
      status: ServiceOrderStatus.SCHEDULED,
      lastVisitDate: '2021-01-25',
      expectedVisitDate: '2021-04-26',
      dueDate: '2021-05-26',
      serviceTime: 0,
      schedules: [
        {
          id: 'e07ec3ad-403c-4052-b811-1aa12752e254',
          serviceOrderId: '6f0fea62-91ad-4f4d-8736-3d6ec0eb7c33',
          technician: {
            id: '1b0ce491-6cb8-4ca6-b9a4-8895c3c1c467',
            address: {
              id: '2061de69-4af5-4838-902e-192b20c21a3e',
              fullName: 'Andreasstraße 10, Berlin, Germany',
              countryCode: 'DE',
              location: {longitude: 13.4312722, latitude: 52.512482},
            },
            userAccount: {
              id: 'c84d05f7-d08b-4aba-9b78-bf0f260f9e78',
              username: 'juergen@ardal.com',
              firstName: 'Juergen',
              lastName: 'Ardal',
              photoUrl: '',
              contact: {phone: ' +4900000000000', email: 'juergen@ardal.com'},
              roles: ['TECHNICIAN'],
              status: UserAccountStatus.RESET_PASSWORD,
              meta: {
                createdAt: '2021-05-31T22:00:35.209083Z',
                lastUpdatedAt: '2021-11-06T08:44:38.845345Z',
                state: State.ACTIVE,
              },
            },
            isOnline: true,
            additionalInfo: {
              leftVacationDays: 30.0,
              assignedServiceOrderTypes: [],
            },
            meta: {
              createdAt: '2021-05-31T22:00:35.241368Z',
              lastUpdatedAt: '2021-11-06T08:44:38.868622Z',
              state: State.ACTIVE,
            },
          },
          startTime: '2021-12-19T08:01:00',
          endTime: '2021-12-19T09:01:00',
          type: JobScheduleType.AUTO,
          source: 'NIGHTLY_SHUFFLE',
          createdAt: '2021-12-19T00:08:01.369268Z',
        },
      ],
      additionalInfo: {
        appointmentNotificationSent: false,
        appointmentConfirmed: false,
        appointmentNotificationRequired: false,
        priority: Priority.NONE,
      },
      labels: [],
      search:
        'system, richard-sorge-straße 44, 10249 berlin, germany de august storck running 356 schindler - - facade_access_system [], august storck basic eur valid, regular, scheduled, []',
      meta: {
        createdAt: '2021-06-01T12:12:07.584359Z',
        lastUpdatedAt: '2021-12-19T00:08:01.758360Z',
        state: State.ACTIVE,
      },
    },
    {
      id: '59da767b-9f08-485b-8f50-b9e1c3a98069',
      number: 'MT-0004115',
      externalID: 'system',
      serviceCompany: {
        id: '9d85be2d-ceb9-4b19-a350-9f512b4b57e4',
        name: 'Maintenance Experts GmbH',
        meta: {
          createdAt: '2021-05-31T08:32:55.193896Z',
          lastUpdatedAt: '2021-05-31T08:32:55.193897Z',
          state: State.ACTIVE,
        },
      },
      elevator: {
        id: 'f4544d09-a3cf-4d46-905a-521d0dad0a04',
        number: '337',
        model: 'Lutz',
        type: '-',
        capacity: '-',
        category: ElevatorCategory.GARAGE_DOOR,
        address: {
          id: '00edc0d9-f9cf-4a4f-aecf-1441edb0ca79',
          fullName: 'Bänschstraße 78, 10247 Berlin, Germany',
          countryCode: 'DE',
          location: {longitude: 13.4697826, latitude: 52.5171409},
        },
        propertyOwner: {
          id: '5c4e2965-9809-4fa5-9c67-bb3b5602ac54',
          name: 'August Storck',
          serviceCompanyId: '9d85be2d-ceb9-4b19-a350-9f512b4b57e4',
          address: {
            id: '00edc0d9-f9cf-4a4f-aecf-1441edb0ca79',
            fullName: 'Bänschstraße 78, 10247 Berlin, Germany',
            countryCode: 'DE',
            location: {longitude: 13.4697826, latitude: 52.5171409},
          },
          contact: {phone: '426 93 12', email: 'email@company.com'},
          labels: [],
          additionalInfo: {priority: Priority.NONE},
          meta: {
            createdAt: '2021-06-01T12:07:22.785218Z',
            lastUpdatedAt: '2021-06-01T12:07:22.785218Z',
            state: State.ACTIVE,
          },
        },
        lastVisitDate: '2021-03-02',
        serviceTime: 60,
        status: ElevatorStatus.RUNNING,
        labels: [],
        additionalInfo: {
          priority: Priority.NONE,
          isServiceOrderGenerationEnabled: true,
        },
        meta: {
          createdAt: '2021-06-01T12:07:23.062120Z',
          lastUpdatedAt: '2021-06-01T12:07:23.062121Z',
          state: State.ACTIVE,
        },
      },
      contract: {
        id: 'b389aca5-6256-43df-b3a1-e84cc7555f36',
        type: ContractType.BASIC,
        visitsNumber: 4,
        sla: 0,
        spendingLimit: 0,
        price: 0,
        hourlyRate: 0,
        currency: 'EUR',
        startTime: '2020-12-03T00:00:00Z',
        endTime: '2023-01-01T00:00:00Z',
        status: ContractStatus.VALID,
        search: 'august storck basic eur valid',
        meta: {
          createdAt: '2021-06-01T12:07:23.340216Z',
          lastUpdatedAt: '2021-06-01T12:07:23.340216Z',
          state: State.ACTIVE,
        },
      },
      description: 'Some one is stuck in the elevator',
      type: ServiceOrderType.EMERGENCY,
      status: ServiceOrderStatus.SCHEDULED,
      lastVisitDate: '2021-03-02',
      expectedVisitDate: '2021-06-01',
      dueDate: '2021-07-01',
      serviceTime: 0,
      schedules: [
        {
          id: 'ea79eae8-1425-44fa-8971-3cd8718c78cc',
          serviceOrderId: '59da767b-9f08-485b-8f50-b9e1c3a98069',
          technician: {
            id: 'c9f4c03d-fe10-4a31-b8cf-10de99a568b9',
            address: {
              id: '1da409b0-0c52-4a58-8d49-f3526b1c9427',
              fullName: 'Parkstraße 26, Berlin, Germany',
              countryCode: 'DE',
              location: {longitude: 13.457503, latitude: 52.5536048},
            },
            userAccount: {
              id: 'e8230f8f-1975-4aa0-84bc-113d9d6097bd',
              username: 'peter@parker.com',
              firstName: 'Peter',
              lastName: 'Parker',
              photoUrl: '',
              contact: {phone: ' +4900000000000', email: 'peter@parker.com'},
              roles: ['TECHNICIAN'],
              status: UserAccountStatus.RESET_PASSWORD,
              meta: {
                createdAt: '2021-05-31T22:01:26.339415Z',
                lastUpdatedAt: '2021-11-06T08:46:14.414184Z',
                state: State.ACTIVE,
              },
            },
            isOnline: true,
            additionalInfo: {
              leftVacationDays: 30.0,
              assignedServiceOrderTypes: [],
            },
            meta: {
              createdAt: '2021-05-31T22:01:26.394534Z',
              lastUpdatedAt: '2021-11-06T08:46:14.423118Z',
              state: State.ACTIVE,
            },
          },
          startTime: '2021-12-19T09:05:00',
          endTime: '2021-12-19T10:05:00',
          type: JobScheduleType.AUTO,
          source: 'NIGHTLY_SHUFFLE',
          createdAt: '2021-12-19T00:08:01.376123Z',
        },
      ],
      additionalInfo: {
        appointmentNotificationSent: false,
        appointmentConfirmed: false,
        appointmentNotificationRequired: false,
        priority: Priority.NONE,
      },
      labels: [],
      search:
        'system, bänschstraße 78, 10247 berlin, germany de august storck running 337 lutz - - garage_door [], august storck basic eur valid, regular, scheduled, []',
      meta: {
        createdAt: '2021-06-01T12:12:07.394525Z',
        lastUpdatedAt: '2021-12-19T00:08:01.528330Z',
        state: State.ACTIVE,
      },
    },
    {
      id: '655699c6-cf21-419a-9719-2aaf262af974',
      number: 'MT-0004071',
      externalID: 'system',
      serviceCompany: {
        id: '9d85be2d-ceb9-4b19-a350-9f512b4b57e4',
        name: 'Maintenance Experts GmbH',
        meta: {
          createdAt: '2021-05-31T08:32:55.193896Z',
          lastUpdatedAt: '2021-05-31T08:32:55.193897Z',
          state: State.ACTIVE,
        },
      },
      elevator: {
        id: 'a48858cc-0f31-498e-9571-3089b425d7ac',
        number: '291',
        model: 'Mitsubishi',
        type: '-',
        capacity: '-',
        category: ElevatorCategory.GARAGE_DOOR,
        address: {
          id: '3db76dd0-259b-4ecf-b283-3a8eaf989ee5',
          fullName: 'Barfusstraße 13, 13349 Berlin, Germany',
          countryCode: 'DE',
          location: {longitude: 13.3465356, latitude: 52.555736},
        },
        propertyOwner: {
          id: '219f432f-8f32-4c28-8261-1b6f0793bfad',
          name: 'August Storck',
          serviceCompanyId: '9d85be2d-ceb9-4b19-a350-9f512b4b57e4',
          address: {
            id: '3db76dd0-259b-4ecf-b283-3a8eaf989ee5',
            fullName: 'Barfusstraße 13, 13349 Berlin, Germany',
            countryCode: 'DE',
            location: {longitude: 13.3465356, latitude: 52.555736},
          },
          contact: {phone: '45082694', email: 'email@company.com'},
          labels: [],
          additionalInfo: {priority: Priority.NONE},
          meta: {
            createdAt: '2021-06-01T12:06:19.361576Z',
            lastUpdatedAt: '2021-06-01T12:06:19.361576Z',
            state: State.ACTIVE,
          },
        },
        lastVisitDate: '2021-01-25',
        serviceTime: 60,
        status: ElevatorStatus.RUNNING,
        labels: [],
        additionalInfo: {
          priority: Priority.NONE,
          isServiceOrderGenerationEnabled: true,
        },
        meta: {
          createdAt: '2021-06-01T12:06:19.630961Z',
          lastUpdatedAt: '2021-06-01T12:06:19.630962Z',
          state: State.ACTIVE,
        },
      },
      contract: {
        id: '8f49f1c1-083e-4c3b-85e9-f6a7af35cf64',
        type: ContractType.BASIC,
        visitsNumber: 4,
        sla: 0,
        spendingLimit: 0,
        price: 0,
        hourlyRate: 0,
        currency: 'EUR',
        startTime: '2020-12-03T00:00:00Z',
        endTime: '2022-04-01T00:00:00Z',
        status: ContractStatus.VALID,
        search: 'august storck basic eur valid',
        meta: {
          createdAt: '2021-06-01T12:06:19.940524Z',
          lastUpdatedAt: '2021-06-01T12:06:19.940524Z',
          state: State.ACTIVE,
        },
      },
      description: 'Regular Maintenance',
      type: ServiceOrderType.REGULAR,
      status: ServiceOrderStatus.SCHEDULED,
      lastVisitDate: '2021-01-25',
      expectedVisitDate: '2021-04-26',
      dueDate: '2021-05-26',
      serviceTime: 0,
      schedules: [
        {
          id: '49d3f8b2-05b0-4f2c-8f43-47fabfc82114',
          serviceOrderId: '655699c6-cf21-419a-9719-2aaf262af974',
          technician: {
            id: 'd861d168-c508-473a-9085-a07d249a9ea4',
            address: {
              id: '6c9b9ae4-2a58-4238-8372-4391060c0858',
              fullName: 'Parkstraße 30, Trebbin, Germany',
              countryCode: 'DE',
              location: {longitude: 13.22216, latitude: 52.21791},
            },
            userAccount: {
              id: '89e05506-7456-4835-aba3-ed0c30e90e05',
              username: 'herman@gunther.com',
              firstName: 'Herman',
              lastName: 'Gunther',
              photoUrl: '',
              contact: {phone: ' +4900000000000', email: 'herman@gunther.com'},
              roles: ['TECHNICIAN'],
              status: UserAccountStatus.NORMAL,
              meta: {
                createdAt: '2021-05-31T22:02:19.425181Z',
                lastUpdatedAt: '2021-11-06T08:44:27.431991Z',
                state: State.ACTIVE,
              },
            },
            isOnline: true,
            additionalInfo: {
              leftVacationDays: 30.0,
              assignedServiceOrderTypes: [],
            },
            meta: {
              createdAt: '2021-05-31T22:02:19.462518Z',
              lastUpdatedAt: '2021-11-06T08:44:27.453031Z',
              state: State.ACTIVE,
            },
          },
          startTime: '2021-12-19T08:00:00',
          endTime: '2021-12-19T09:00:00',
          type: JobScheduleType.AUTO,
          source: 'NIGHTLY_SHUFFLE',
          createdAt: '2021-12-19T00:08:01.376299Z',
        },
      ],
      additionalInfo: {
        appointmentNotificationSent: false,
        appointmentConfirmed: false,
        appointmentNotificationRequired: false,
        priority: Priority.NONE,
      },
      labels: [],
      search:
        'system, barfusstraße 13, 13349 berlin, germany de august storck running 291 mitsubishi - - garage_door [], august storck basic eur valid, regular, scheduled, []',
      meta: {
        createdAt: '2021-06-01T12:12:07.058112Z',
        lastUpdatedAt: '2021-12-19T00:08:01.741759Z',
        state: State.ACTIVE,
      },
    },
    {
      id: '955ba80a-1128-475e-8171-ff5277687927',
      number: 'MT-0004023',
      externalID: 'system',
      serviceCompany: {
        id: '9d85be2d-ceb9-4b19-a350-9f512b4b57e4',
        name: 'Maintenance Experts GmbH',
        meta: {
          createdAt: '2021-05-31T08:32:55.193896Z',
          lastUpdatedAt: '2021-05-31T08:32:55.193897Z',
          state: State.ACTIVE,
        },
      },
      elevator: {
        id: 'fb22372b-b20e-4a87-a4f7-e51e236a1096',
        number: '245',
        model: 'Schindler',
        type: '-',
        capacity: '-',
        category: ElevatorCategory.HOMELIFT,
        address: {
          id: 'c7d2d2cd-9eb9-47d9-ae25-58cec65c3de0',
          fullName: 'Türkenstraße 20, 13349 Berlin, Germany',
          countryCode: 'DE',
          location: {longitude: 13.3486916, latitude: 52.55425839999999},
        },
        propertyOwner: {
          id: '410cea4b-1f93-453c-b7be-92e8076f96e6',
          name: 'August Storck',
          serviceCompanyId: '9d85be2d-ceb9-4b19-a350-9f512b4b57e4',
          address: {
            id: 'c7d2d2cd-9eb9-47d9-ae25-58cec65c3de0',
            fullName: 'Türkenstraße 20, 13349 Berlin, Germany',
            countryCode: 'DE',
            location: {longitude: 13.3486916, latitude: 52.55425839999999},
          },
          contact: {phone: '2903 53 30', email: 'email@company.com'},
          labels: [],
          additionalInfo: {priority: Priority.NONE},
          meta: {
            createdAt: '2021-06-01T12:05:12.480537Z',
            lastUpdatedAt: '2021-06-01T12:05:12.480537Z',
            state: State.ACTIVE,
          },
        },
        lastVisitDate: '2021-01-25',
        serviceTime: 60,
        status: ElevatorStatus.RUNNING,
        labels: [],
        additionalInfo: {
          priority: Priority.NONE,
          isServiceOrderGenerationEnabled: true,
        },
        meta: {
          createdAt: '2021-06-01T12:05:12.760374Z',
          lastUpdatedAt: '2021-06-01T12:05:12.760374Z',
          state: State.ACTIVE,
        },
      },
      contract: {
        id: '77a4e9e3-1719-4d50-b736-100f7fa69c4b',
        type: ContractType.BASIC,
        visitsNumber: 4,
        sla: 0,
        spendingLimit: 0,
        price: 0,
        hourlyRate: 0,
        currency: 'EUR',
        startTime: '2020-12-03T00:00:00Z',
        endTime: '2023-01-01T00:00:00Z',
        status: ContractStatus.VALID,
        search: 'august storck basic eur valid',
        meta: {
          createdAt: '2021-06-01T12:05:13.079344Z',
          lastUpdatedAt: '2021-06-01T12:05:13.079344Z',
          state: State.ACTIVE,
        },
      },
      description: 'It needs to repair the engine',
      type: ServiceOrderType.REPAIR,
      status: ServiceOrderStatus.SCHEDULED,
      lastVisitDate: '2021-01-25',
      expectedVisitDate: '2021-04-26',
      dueDate: '2021-05-26',
      serviceTime: 0,
      schedules: [
        {
          id: '1e82c011-2fab-47d3-aed8-113d9c8f41b2',
          serviceOrderId: '955ba80a-1128-475e-8171-ff5277687927',
          technician: {
            id: '1b0ce491-6cb8-4ca6-b9a4-8895c3c1c467',
            address: {
              id: '2061de69-4af5-4838-902e-192b20c21a3e',
              fullName: 'Andreasstraße 10, Berlin, Germany',
              countryCode: 'DE',
              location: {longitude: 13.4312722, latitude: 52.512482},
            },
            userAccount: {
              id: 'c84d05f7-d08b-4aba-9b78-bf0f260f9e78',
              username: 'juergen@ardal.com',
              firstName: 'Juergen',
              lastName: 'Ardal',
              photoUrl: '',
              contact: {phone: ' +4900000000000', email: 'juergen@ardal.com'},
              roles: ['TECHNICIAN'],
              status: UserAccountStatus.RESET_PASSWORD,
              meta: {
                createdAt: '2021-05-31T22:00:35.209083Z',
                lastUpdatedAt: '2021-11-06T08:44:38.845345Z',
                state: State.ACTIVE,
              },
            },
            isOnline: true,
            additionalInfo: {
              leftVacationDays: 30.0,
              assignedServiceOrderTypes: [],
            },
            meta: {
              createdAt: '2021-05-31T22:00:35.241368Z',
              lastUpdatedAt: '2021-11-06T08:44:38.868622Z',
              state: State.ACTIVE,
            },
          },
          startTime: '2021-12-20T10:07:00',
          endTime: '2021-12-20T11:07:00',
          type: JobScheduleType.FIXED,
          source: 'NIGHTLY_SHUFFLE',
          createdAt: '2021-12-15T00:05:03.231641Z',
        },
      ],
      additionalInfo: {
        appointmentNotificationSent: true,
        appointmentConfirmed: false,
        appointmentNotificationRequired: true,
        priority: Priority.NONE,
      },
      labels: [],
      search:
        'system, türkenstraße 20, 13349 berlin, germany de august storck running 245 schindler - - homelift [], august storck basic eur valid, regular, scheduled, []',
      meta: {
        createdAt: '2021-06-01T12:12:06.728886Z',
        lastUpdatedAt: '2021-12-15T00:05:03.515964Z',
        state: State.ACTIVE,
      },
    },
    {
      id: '3643c93b-fd4c-4c3d-84b5-c24c66d0cff9',
      number: 'MT-0003910',
      externalID: 'system',
      serviceCompany: {
        id: '9d85be2d-ceb9-4b19-a350-9f512b4b57e4',
        name: 'Maintenance Experts GmbH',
        meta: {
          createdAt: '2021-05-31T08:32:55.193896Z',
          lastUpdatedAt: '2021-05-31T08:32:55.193897Z',
          state: State.ACTIVE,
        },
      },
      elevator: {
        id: '5a8b31b0-e45d-4457-9884-13f80753d56f',
        number: '132',
        model: 'Vestner',
        type: '-',
        capacity: '-',
        category: ElevatorCategory.MOVING_WALKWAY,
        address: {
          id: '74f4a5fe-181d-4007-9439-dee5e5d4eb65',
          fullName: 'Siegmunds Hof 17, 10555 Berlin, Germany',
          countryCode: 'DE',
          location: {longitude: 13.3352846, latitude: 52.51554059999999},
        },
        propertyOwner: {
          id: '0233d956-b435-49dd-89fb-ab564a46ef55',
          name: 'August Storck',
          serviceCompanyId: '9d85be2d-ceb9-4b19-a350-9f512b4b57e4',
          address: {
            id: '74f4a5fe-181d-4007-9439-dee5e5d4eb65',
            fullName: 'Siegmunds Hof 17, 10555 Berlin, Germany',
            countryCode: 'DE',
            location: {longitude: 13.3352846, latitude: 52.51554059999999},
          },
          contact: {phone: '939398480', email: 'email@company.com'},
          labels: [],
          additionalInfo: {priority: Priority.NONE},
          meta: {
            createdAt: '2021-06-01T12:02:38.975026Z',
            lastUpdatedAt: '2021-06-01T12:02:38.975026Z',
            state: State.ACTIVE,
          },
        },
        lastVisitDate: '2021-01-10',
        serviceTime: 60,
        status: ElevatorStatus.RUNNING,
        labels: [],
        additionalInfo: {
          priority: Priority.NONE,
          isServiceOrderGenerationEnabled: true,
        },
        meta: {
          createdAt: '2021-06-01T12:02:39.274170Z',
          lastUpdatedAt: '2021-06-01T12:02:39.274170Z',
          state: State.ACTIVE,
        },
      },
      contract: {
        id: 'cf02bd2b-3349-4a71-b740-3e33a7e5e20b',
        type: ContractType.BASIC,
        visitsNumber: 4,
        sla: 0,
        spendingLimit: 0,
        price: 0,
        hourlyRate: 0,
        currency: 'EUR',
        startTime: '2020-12-03T00:00:00Z',
        endTime: '2023-01-01T00:00:00Z',
        status: ContractStatus.VALID,
        search: 'august storck basic eur valid',
        meta: {
          createdAt: '2021-06-01T12:02:39.563039Z',
          lastUpdatedAt: '2021-06-01T12:02:39.563039Z',
          state: State.ACTIVE,
        },
      },
      description: 'Elevator is broken',
      type: ServiceOrderType.CALLOUT,
      status: ServiceOrderStatus.SCHEDULED,
      lastVisitDate: '2021-01-10',
      expectedVisitDate: '2021-04-11',
      dueDate: '2021-05-11',
      serviceTime: 0,
      schedules: [
        {
          id: '595a822a-6f50-48b6-a6ab-bbdc9bce4cc1',
          serviceOrderId: '3643c93b-fd4c-4c3d-84b5-c24c66d0cff9',
          technician: {
            id: '3ed3e584-b48c-4e61-98a3-9cbcae7ff7ab',
            address: {
              id: 'f5962572-9cb4-400b-be0b-753ea6e24c34',
              fullName: 'Parkstraße 10, 14959 Trebbin, Germany',
              countryCode: 'DE',
              location: {longitude: 13.2260946, latitude: 52.21720089999999},
            },
            userAccount: {
              id: 'bc369bd1-1a75-4ae4-8d3f-83530d6fa375',
              username: 'james@bond.com',
              firstName: 'Felix',
              lastName: 'Bond',
              photoUrl: '',
              contact: {phone: ' +4900000000000', email: 'james@bond.com'},
              roles: ['TECHNICIAN'],
              status: UserAccountStatus.RESET_PASSWORD,
              meta: {
                createdAt: '2021-05-31T08:56:22.437364Z',
                lastUpdatedAt: '2021-11-06T08:44:05.152242Z',
                state: State.ACTIVE,
              },
            },
            isOnline: true,
            additionalInfo: {
              leftVacationDays: 30.0,
              assignedServiceOrderTypes: [],
            },
            meta: {
              createdAt: '2021-05-31T08:56:22.492703Z',
              lastUpdatedAt: '2021-11-06T08:44:05.175156Z',
              state: State.ACTIVE,
            },
          },
          startTime: '2021-12-27T07:00:00',
          endTime: '2021-12-27T08:00:00',
          type: JobScheduleType.FIXED,
          source: 'NIGHTLY_SHUFFLE',
          createdAt: '2021-12-18T00:08:01.637999Z',
        },
      ],
      additionalInfo: {
        appointmentNotificationSent: true,
        appointmentNotificationDueDate: '2021-07-05',
        appointmentConfirmed: false,
        appointmentNotificationRequired: true,
        priority: Priority.NONE,
      },
      labels: [],
      search:
        'system, siegmunds hof 17, 10555 berlin, germany de august storck running 132 vestner - - moving_walkway [], august storck basic eur valid, regular, scheduled, []',
      meta: {
        createdAt: '2021-06-01T12:12:05.800007Z',
        lastUpdatedAt: '2021-12-18T00:08:02.196675Z',
        state: State.ACTIVE,
      },
    },
    {
      id: '032e6ca0-28dc-4b6a-acbe-155ee75e1446',
      number: 'MT-0003839',
      externalID: 'system',
      serviceCompany: {
        id: '9d85be2d-ceb9-4b19-a350-9f512b4b57e4',
        name: 'Maintenance Experts GmbH',
        meta: {
          createdAt: '2021-05-31T08:32:55.193896Z',
          lastUpdatedAt: '2021-05-31T08:32:55.193897Z',
          state: State.ACTIVE,
        },
      },
      elevator: {
        id: 'd650c75f-d6be-4609-9cc9-5b5e0fca9597',
        number: '60',
        model: 'Lutz',
        type: '-',
        capacity: '-',
        category: ElevatorCategory.REVOLVING_GATE,
        address: {
          id: '14f4143b-ab4b-4324-a864-7342cbeec815',
          fullName: 'Chausseestraße 50, 10115 Berlin, Germany',
          countryCode: 'DE',
          location: {longitude: 13.3775042, latitude: 52.5354267},
        },
        propertyOwner: {
          id: '71930129-7701-4122-b496-c6b92f11c2f4',
          name: 'August Storck',
          serviceCompanyId: '9d85be2d-ceb9-4b19-a350-9f512b4b57e4',
          address: {
            id: '14f4143b-ab4b-4324-a864-7342cbeec815',
            fullName: 'Chausseestraße 50, 10115 Berlin, Germany',
            countryCode: 'DE',
            location: {longitude: 13.3775042, latitude: 52.5354267},
          },
          contact: {phone: '0179 5368246', email: 'email@company.com'},
          labels: [],
          additionalInfo: {priority: Priority.NONE},
          meta: {
            createdAt: '2021-06-01T12:01:08.287303Z',
            lastUpdatedAt: '2021-06-01T12:01:08.287303Z',
            state: State.ACTIVE,
          },
        },
        lastVisitDate: '2021-02-12',
        serviceTime: 60,
        status: ElevatorStatus.RUNNING,
        labels: [],
        additionalInfo: {
          priority: Priority.NONE,
          isServiceOrderGenerationEnabled: true,
        },
        meta: {
          createdAt: '2021-06-01T12:01:08.561291Z',
          lastUpdatedAt: '2021-06-01T12:01:08.561291Z',
          state: State.ACTIVE,
        },
      },
      contract: {
        id: '953616e7-86d2-4716-abad-7818f8a1ebd6',
        type: ContractType.BASIC,
        visitsNumber: 4,
        sla: 0,
        spendingLimit: 0,
        price: 0,
        hourlyRate: 0,
        currency: 'EUR',
        startTime: '2020-12-03T00:00:00Z',
        endTime: '2022-03-01T00:00:00Z',
        status: ContractStatus.VALID,
        search: 'august storck basic eur valid',
        meta: {
          createdAt: '2021-06-01T12:01:08.860505Z',
          lastUpdatedAt: '2021-06-01T12:01:08.860505Z',
          state: State.ACTIVE,
        },
      },
      description: 'Regular Maintenance',
      type: ServiceOrderType.REGULAR,
      status: ServiceOrderStatus.SCHEDULED,
      lastVisitDate: '2021-02-12',
      expectedVisitDate: '2021-05-14',
      dueDate: '2021-06-14',
      serviceTime: 0,
      schedules: [
        {
          id: '9ba5cfce-cefb-41d2-a616-d31754bb7f02',
          serviceOrderId: '032e6ca0-28dc-4b6a-acbe-155ee75e1446',
          technician: {
            id: 'ffddf0fa-23cd-4f7c-ade1-84678557a3b9',
            address: {
              id: '863a7aec-3b01-478d-868e-483922282fd2',
              fullName: 'Am Bahnhof, 14974 Ludwigsfelde, Germany',
              countryCode: 'DE',
              location: {longitude: 13.2667874, latitude: 52.2987454},
            },
            userAccount: {
              id: '5479c301-cc08-4833-9e8a-b452f858706f',
              username: 'max@mustermann.com',
              firstName: 'Max',
              lastName: 'Mustermann',
              photoUrl: '',
              contact: {phone: ' +4900000000000', email: 'max@mustermann.com'},
              roles: ['TECHNICIAN'],
              status: UserAccountStatus.RESET_PASSWORD,
              meta: {
                createdAt: '2021-05-31T08:53:18.663413Z',
                lastUpdatedAt: '2021-11-06T08:45:31.773327Z',
                state: State.ACTIVE,
              },
            },
            isOnline: true,
            additionalInfo: {
              leftVacationDays: 30.0,
              assignedServiceOrderTypes: [],
            },
            meta: {
              createdAt: '2021-05-31T08:53:18.761648Z',
              lastUpdatedAt: '2021-11-06T08:45:31.782414Z',
              state: State.ACTIVE,
            },
          },
          startTime: '2021-12-27T08:00:00',
          endTime: '2021-12-27T09:00:00',
          type: JobScheduleType.FIXED,
          source: 'NIGHTLY_SHUFFLE',
          createdAt: '2021-12-18T00:08:01.640856Z',
        },
      ],
      additionalInfo: {
        appointmentNotificationSent: true,
        appointmentNotificationDueDate: '2021-07-05',
        appointmentConfirmed: false,
        appointmentNotificationRequired: true,
        priority: Priority.NONE,
      },
      labels: [],
      search:
        'system, chausseestraße 50, 10115 berlin, germany de august storck running 60 lutz - - revolving_gate [], august storck basic eur valid, regular, scheduled, []',
      meta: {
        createdAt: '2021-06-01T12:12:05.047994Z',
        lastUpdatedAt: '2021-12-18T00:08:02.386864Z',
        state: State.ACTIVE,
      },
    },
  ],
  total: 8,
  page: {pageIndex: 0, pageSize: 50},
};

export function fetchServiceOrders(
  elevatorIds: string[],
): Promise<ServiceOrderView[]> {
  const data = serviceOrders.data.filter((order) =>
    elevatorIds.includes(order.elevator.id),
  );
  return Promise.resolve(data);
}

export function fetchServiceOrderByIds(
  serviceOrderIds: string[],
): Promise<ServiceOrderView[]> {
  console.log(
    `fetch service order by ids, service order ids = ${serviceOrderIds}`,
  );
  return Promise.resolve(serviceOrders.data);
}

export function fetchRunningServiceOrdersByElevator(
  elevatorId: string,
): Promise<ServiceOrderView[]> {
  console.log(
    `fetchRunningServiceOrdersByElevator, elevatorId = ${elevatorId}`,
  );
  const orders = serviceOrders.data.filter(
    (order) => order.elevator.id === elevatorId,
  );
  return Promise.resolve(orders);
}

export function useServiceOrders() {
  return useQuery<Resource<ServiceOrderView>, RestError>(
    'fetchServiceOrders',
    () => serviceOrders,
  );
}

export function useFetchServiceOrdersByElevators(
  elevatorRes: Resource<ElevatorView> | undefined,
  stopLoading: () => void,
) {
  const elevatorIds = elevatorRes?.data.map((elevator) => elevator.id);
  return useQuery<ServiceOrderView[], RestError, ElevatorsByAddress[]>(
    ['fetchServiceOrders', elevatorIds],
    () => fetchServiceOrders(elevatorIds!),
    {
      enabled: !!elevatorRes,
      select: (data) => {
        const serviceOrderMap = _.groupBy(
          data,
          (order: ServiceOrderView) => order.elevator.id,
        );

        const elevatorWithOrders = elevatorRes!.data.map((elevator) => {
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
        // TODO: there is an exception when calling stopLoading here
        //                stopLoading();
        return elevatorByAddressList;
      },
    },
  );
}
