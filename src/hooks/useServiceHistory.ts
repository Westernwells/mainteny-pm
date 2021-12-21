import {
  ElevatorCategory,
  ElevatorMaintenanceHistoryView,
  ElevatorStatus,
} from '../models/elevator';
import {Priority, Resource, State} from '../models/misc';
import {UserAccountStatus} from '../models/user';

const serviceHistories: Resource<ElevatorMaintenanceHistoryView> = {
  data: [
    {
      id: '95e0790a-4040-49af-b164-6211190c14ab',
      elevator: {
        id: 'b78ec9af-7c52-4607-bfb8-f382b7d47897',
        number: '500',
        model: '47NH6674 Aufzug',
        type: '-',
        capacity: '-',
        category: ElevatorCategory.ELEVATOR,
        address: {
          id: '1c6c8cb4-bb29-4c80-ac8e-d5925ef4f901',
          fullName: 'Pankstraße 32, 13357 Berlin, Germany',
          countryCode: 'DE',
          location: {
            longitude: 13.3783028,
            latitude: 52.54852109999999,
          },
        },
        propertyOwner: {
          id: 'badb269b-1fbc-4c45-b19a-8cff185bb8cc',
          name: 'ADAM Pankstraße Berlin GmbH',
          serviceCompanyId: '4a156124-a1f1-4877-9059-595416996223',
          address: {
            id: '1c6c8cb4-bb29-4c80-ac8e-d5925ef4f901',
            fullName: 'Pankstraße 32, 13357 Berlin, Germany',
            countryCode: 'DE',
            location: {
              longitude: 13.3783028,
              latitude: 52.54852109999999,
            },
          },
          contact: {
            phone: '46901-125',
            email: 'email@company.com',
          },
          labels: [],
          additionalInfo: {
            priority: Priority.NONE,
          },
          meta: {
            createdAt: '2021-05-30T22:45:24.258240Z',
            lastUpdatedAt: '2021-05-30T22:45:25.909Z',
            state: State.ACTIVE,
          },
        },
        lastVisitDate: '2021-11-29',
        serviceTime: 45,
        status: ElevatorStatus.RUNNING,
        labels: [],
        additionalInfo: {
          priority: Priority.NONE,
          isServiceOrderGenerationEnabled: true,
        },
        meta: {
          createdAt: '2021-05-30T22:45:26.187794Z',
          lastUpdatedAt: '2021-06-06T07:35:44.901345Z',
          state: State.ACTIVE,
        },
      },
      description:
        'Did a routine check of the elevator; everything is functioning normally.',
      attachments: [
        {
          id: 'ad708ede-4674-45f0-85a7-5d044d45d602',
          elevatorMaintenanceHistoryId: '95e0790a-4040-49af-b164-6211190c14ab',
          fileResource: {
            id: '367dd404-2fe6-482f-b2c3-5b485f798106',
            uri: '0033E00F-8132-4432-BB9A-C74D2B019299.png',
            type: 'image/png',
            description: '',
            createdAt: '2021-09-02T11:45:46.853880Z',
          },
        },
      ],
      technician: {
        id: 'fb36d350-af7b-49de-a3f6-fb7f9eb1f517',
        address: {
          id: '8934e86e-3418-4236-9b82-16bd6d91564a',
          fullName: 'Parkstraße 5, 14959 Trebbin, Germany',
          countryCode: 'DE',
          location: {
            longitude: 13.2244631,
            latitude: 52.2173497,
          },
        },
        userAccount: {
          id: 'c22ff787-2912-4072-a8f6-ed6403ae99df',
          username: 'dummy1-team1@graedler-foerdertechnik.de',
          firstName: 'Dummy1',
          lastName: 'Team1',
          photoUrl: 'A358B347-C54B-4433-85FD-E96EB1721544.jpg',
          contact: {
            phone: '+490587899986',
            email: 'dummy1-team1@graedler-foerdertechnik.de',
          },
          roles: ['TECHNICIAN', 'SERVICE_MANAGER'],
          status: UserAccountStatus.NORMAL,
          meta: {
            createdAt: '2021-05-01T22:25:46.992700Z',
            lastUpdatedAt: '2021-09-16T14:39:13.724276Z',
            state: State.ACTIVE,
          },
        },
        isOnline: true,
        additionalInfo: {
          leftVacationDays: 30,
          assignedServiceOrderTypes: [],
        },
        meta: {
          createdAt: '2021-05-01T22:25:47.039729Z',
          lastUpdatedAt: '2021-09-16T14:39:13.736058Z',
          state: State.ACTIVE,
        },
      },
      fee: {
        amount: 0,
        currency: 'EUR',
      },
      serviceOrderId: '4f9c4552-089f-4447-9bfd-fd604ba35eec',
      actualServiceTime: 121,
      createdAt: '2021-09-02T11:45:46.854002Z',
    },
    {
      id: '13cd9665-d3cb-4d54-894d-59dfcf97421a',
      elevator: {
        id: 'b78ec9af-7c52-4607-bfb8-f382b7d47897',
        number: '500',
        model: '47NH6674 Aufzug',
        type: '-',
        capacity: '-',
        category: ElevatorCategory.ELEVATOR,
        address: {
          id: '1c6c8cb4-bb29-4c80-ac8e-d5925ef4f901',
          fullName: 'Pankstraße 32, 13357 Berlin, Germany',
          countryCode: 'DE',
          location: {
            longitude: 13.3783028,
            latitude: 52.54852109999999,
          },
        },
        propertyOwner: {
          id: 'badb269b-1fbc-4c45-b19a-8cff185bb8cc',
          name: 'ADAM Pankstraße Berlin GmbH',
          serviceCompanyId: '4a156124-a1f1-4877-9059-595416996223',
          address: {
            id: '1c6c8cb4-bb29-4c80-ac8e-d5925ef4f901',
            fullName: 'Pankstraße 32, 13357 Berlin, Germany',
            countryCode: 'DE',
            location: {
              longitude: 13.3783028,
              latitude: 52.54852109999999,
            },
          },
          contact: {
            phone: '46901-125',
            email: 'email@company.com',
          },
          labels: [],
          additionalInfo: {
            priority: Priority.NONE,
          },
          meta: {
            createdAt: '2021-05-30T22:45:24.258240Z',
            lastUpdatedAt: '2021-05-30T22:45:25.909Z',
            state: State.ACTIVE,
          },
        },
        lastVisitDate: '2021-11-29',
        serviceTime: 45,
        status: ElevatorStatus.RUNNING,
        labels: [],
        additionalInfo: {
          priority: Priority.NONE,
          isServiceOrderGenerationEnabled: true,
        },
        meta: {
          createdAt: '2021-05-30T22:45:26.187794Z',
          lastUpdatedAt: '2021-06-06T07:35:44.901345Z',
          state: State.ACTIVE,
        },
      },
      description: 'Door engine replaced as it went out of life',
      attachments: [
        {
          id: 'df14b865-82a2-49c4-9abf-97f8d3fb95cd',
          elevatorMaintenanceHistoryId: '13cd9665-d3cb-4d54-894d-59dfcf97421a',
          fileResource: {
            id: '91c50b72-a63d-46b9-886c-16573f8c92c9',
            uri: 'B4CFB141-3133-46C0-8AA1-37427CEBF5A1.jpg',
            type: 'image/jpg',
            description: '',
            createdAt: '2021-08-17T08:13:51.254371Z',
          },
        },
        {
          id: 'd02ac79e-ee71-4051-af7b-caa87dc4f8fa',
          elevatorMaintenanceHistoryId: '13cd9665-d3cb-4d54-894d-59dfcf97421a',
          fileResource: {
            id: 'b7004eed-b800-4211-8b60-53532f2a24d5',
            uri: '6BCAD91C-5999-433A-9DA4-3D3DCE9D86C1.jpg',
            type: 'image/jpg',
            description: '',
            createdAt: '2021-08-17T08:13:51.253768Z',
          },
        },
      ],
      technician: {
        id: '71e6e3f3-3109-462c-a606-5179eb926cc1',
        address: {
          id: 'c9ed46ad-c952-4962-9519-5df5b49c5c02',
          fullName: 'Ebelstraße 15, 14959 Trebbin, Germany',
          countryCode: 'DE',
          location: {
            longitude: 13.2267597,
            latitude: 52.2197393,
          },
        },
        userAccount: {
          id: '7d0f696b-a081-4af7-b154-be0702bfb3d4',
          username: 'dummy5-team2@graedler-foerdertechnik.de',
          firstName: 'Dummy5',
          lastName: 'Team2',
          photoUrl: 'C772BD54-BB7C-4841-A68F-F042F12A9F9C.jpg',
          contact: {
            phone: '+4900000',
            email: 'dummy5-team2@graedler-foerdertechnik.de',
          },
          roles: ['TECHNICIAN'],
          status: UserAccountStatus.NORMAL,
          meta: {
            createdAt: '2021-05-01T22:48:11.121069Z',
            lastUpdatedAt: '2021-08-16T23:02:26.479298Z',
            state: State.ACTIVE,
          },
        },
        isOnline: true,
        additionalInfo: {
          leftVacationDays: 30,
          assignedServiceOrderTypes: [],
        },
        meta: {
          createdAt: '2021-05-01T22:48:11.205540Z',
          lastUpdatedAt: '2021-08-16T23:02:26.493413Z',
          state: State.ACTIVE,
        },
      },
      fee: {
        amount: 0,
        currency: 'EUR',
      },
      serviceOrderId: '7adf15ff-42cb-4c2a-a477-0c4e8fdef093',
      actualServiceTime: 60,
      createdAt: '2021-08-17T08:12:09.462304Z',
    },
    {
      id: '5e6a549d-8572-4867-92a4-51ffd68ee007',
      elevator: {
        id: 'b78ec9af-7c52-4607-bfb8-f382b7d47897',
        number: '500',
        model: '47NH6674 Aufzug',
        type: '-',
        capacity: '-',
        category: ElevatorCategory.ELEVATOR,
        address: {
          id: '1c6c8cb4-bb29-4c80-ac8e-d5925ef4f901',
          fullName: 'Pankstraße 32, 13357 Berlin, Germany',
          countryCode: 'DE',
          location: {
            longitude: 13.3783028,
            latitude: 52.54852109999999,
          },
        },
        propertyOwner: {
          id: 'badb269b-1fbc-4c45-b19a-8cff185bb8cc',
          name: 'ADAM Pankstraße Berlin GmbH',
          serviceCompanyId: '4a156124-a1f1-4877-9059-595416996223',
          address: {
            id: '1c6c8cb4-bb29-4c80-ac8e-d5925ef4f901',
            fullName: 'Pankstraße 32, 13357 Berlin, Germany',
            countryCode: 'DE',
            location: {
              longitude: 13.3783028,
              latitude: 52.54852109999999,
            },
          },
          contact: {
            phone: '46901-125',
            email: 'email@company.com',
          },
          labels: [],
          additionalInfo: {
            priority: Priority.NONE,
          },
          meta: {
            createdAt: '2021-05-30T22:45:24.258240Z',
            lastUpdatedAt: '2021-05-30T22:45:25.909Z',
            state: State.ACTIVE,
          },
        },
        lastVisitDate: '2021-11-29',
        serviceTime: 45,
        status: ElevatorStatus.RUNNING,
        labels: [],
        additionalInfo: {
          priority: Priority.NONE,
          isServiceOrderGenerationEnabled: true,
        },
        meta: {
          createdAt: '2021-05-30T22:45:26.187794Z',
          lastUpdatedAt: '2021-06-06T07:35:44.901345Z',
          state: State.ACTIVE,
        },
      },
      description:
        '3 persons were stuck inside the elevator car. Rescue operation was successfully carried out without any injuries.',
      attachments: [
        {
          id: '590f8065-8194-45e1-b44e-2d334697d7ae',
          elevatorMaintenanceHistoryId: '5e6a549d-8572-4867-92a4-51ffd68ee007',
          fileResource: {
            id: 'd38c816c-8c83-46d5-a684-a44b49aedc0e',
            uri: 'FFE7F4FF-E9DA-4FB7-AE58-55DB21CCA25B.jpg',
            type: 'image/jpg',
            description: '',
            createdAt: '2021-08-16T22:45:32.473689Z',
          },
        },
      ],
      technician: {
        id: 'fb36d350-af7b-49de-a3f6-fb7f9eb1f517',
        address: {
          id: '8934e86e-3418-4236-9b82-16bd6d91564a',
          fullName: 'Parkstraße 5, 14959 Trebbin, Germany',
          countryCode: 'DE',
          location: {
            longitude: 13.2244631,
            latitude: 52.2173497,
          },
        },
        userAccount: {
          id: 'c22ff787-2912-4072-a8f6-ed6403ae99df',
          username: 'dummy1-team1@graedler-foerdertechnik.de',
          firstName: 'Dummy1',
          lastName: 'Team1',
          photoUrl: 'A358B347-C54B-4433-85FD-E96EB1721544.jpg',
          contact: {
            phone: '+490587899986',
            email: 'dummy1-team1@graedler-foerdertechnik.de',
          },
          roles: ['TECHNICIAN', 'SERVICE_MANAGER'],
          status: UserAccountStatus.NORMAL,
          meta: {
            createdAt: '2021-05-01T22:25:46.992700Z',
            lastUpdatedAt: '2021-09-16T14:39:13.724276Z',
            state: State.ACTIVE,
          },
        },
        isOnline: true,
        additionalInfo: {
          leftVacationDays: 30,
          assignedServiceOrderTypes: [],
        },
        meta: {
          createdAt: '2021-05-01T22:25:47.039729Z',
          lastUpdatedAt: '2021-09-16T14:39:13.736058Z',
          state: State.ACTIVE,
        },
      },
      fee: {
        amount: 0,
        currency: 'EUR',
      },
      serviceOrderId: '59da767b-9f08-485b-8f50-b9e1c3a98069',
      actualServiceTime: 120,
      createdAt: '2021-08-16T22:45:32.474149Z',
    },
    {
      id: '96a7c266-c9dc-4eff-b697-f1200b3b4058',
      elevator: {
        id: 'b78ec9af-7c52-4607-bfb8-f382b7d47897',
        number: '500',
        model: '47NH6674 Aufzug',
        type: '-',
        capacity: '-',
        category: ElevatorCategory.ELEVATOR,
        address: {
          id: '1c6c8cb4-bb29-4c80-ac8e-d5925ef4f901',
          fullName: 'Pankstraße 32, 13357 Berlin, Germany',
          countryCode: 'DE',
          location: {
            longitude: 13.3783028,
            latitude: 52.54852109999999,
          },
        },
        propertyOwner: {
          id: 'badb269b-1fbc-4c45-b19a-8cff185bb8cc',
          name: 'ADAM Pankstraße Berlin GmbH',
          serviceCompanyId: '4a156124-a1f1-4877-9059-595416996223',
          address: {
            id: '1c6c8cb4-bb29-4c80-ac8e-d5925ef4f901',
            fullName: 'Pankstraße 32, 13357 Berlin, Germany',
            countryCode: 'DE',
            location: {
              longitude: 13.3783028,
              latitude: 52.54852109999999,
            },
          },
          contact: {
            phone: '46901-125',
            email: 'email@company.com',
          },
          labels: [],
          additionalInfo: {
            priority: Priority.NONE,
          },
          meta: {
            createdAt: '2021-05-30T22:45:24.258240Z',
            lastUpdatedAt: '2021-05-30T22:45:25.909Z',
            state: State.ACTIVE,
          },
        },
        lastVisitDate: '2021-11-29',
        serviceTime: 45,
        status: ElevatorStatus.RUNNING,
        labels: [],
        additionalInfo: {
          priority: Priority.NONE,
          isServiceOrderGenerationEnabled: true,
        },
        meta: {
          createdAt: '2021-05-30T22:45:26.187794Z',
          lastUpdatedAt: '2021-06-06T07:35:44.901345Z',
          state: State.ACTIVE,
        },
      },
      description:
        'Because of door alignment issue, elevator car stopped with deviation. The alignment was fixed to get the elevator running fine.',
      attachments: [
        {
          id: '7bbac98c-01e3-482e-b871-b94457d43d3b',
          elevatorMaintenanceHistoryId: '96a7c266-c9dc-4eff-b697-f1200b3b4058',
          fileResource: {
            id: '92cef1df-4021-41ab-ad35-2266ee68b24a',
            uri: 'rn_image_picker_lib_temp_c7da07ec-e136-4628-88c2-ac449f2f7f4d.jpg',
            type: 'image/jpeg',
            description: '',
            createdAt: '2021-08-13T14:25:29.751574Z',
          },
        },
      ],
      technician: {
        id: '3609dda3-49e2-4d21-b25f-d170e45654d2',
        address: {
          id: '863a7aec-3b01-478d-868e-483922282fd2',
          fullName: 'Am Bahnhof, 14974 Ludwigsfelde, Germany',
          countryCode: 'DE',
          location: {
            longitude: 13.2667874,
            latitude: 52.2987454,
          },
        },
        userAccount: {
          id: '05b208a3-91ad-44fc-af28-a839051a880b',
          username: 'chris@graedler-foerdertechnik.de',
          firstName: 'Chris',
          lastName: 'Anders',
          photoUrl:
            'rn_image_picker_lib_temp_168b706a-1eb8-4491-a6c5-d8c1dd028220.jpg',
          contact: {
            phone: '+2347067752509',
            email: 'chris@graedler-foerdertechnik.de',
          },
          roles: ['TECHNICIAN'],
          status: UserAccountStatus.NORMAL,
          meta: {
            createdAt: '2021-05-01T19:01:33.106102Z',
            lastUpdatedAt: '2021-11-09T06:05:02.984341Z',
            state: State.ACTIVE,
          },
        },
        isOnline: true,
        additionalInfo: {
          leftVacationDays: 20.5,
          assignedServiceOrderTypes: [],
        },
        meta: {
          createdAt: '2021-05-01T19:01:33.155723Z',
          lastUpdatedAt: '2021-11-15T11:43:39.603720Z',
          state: State.ACTIVE,
        },
      },
      fee: {
        amount: 0,
        currency: 'EUR',
      },
      serviceOrderId: '6f0fea62-91ad-4f4d-8736-3d6ec0eb7c33',
      actualServiceTime: 60,
      createdAt: '2021-08-13T14:25:29.751841Z',
    },
  ],
  total: 11,
  page: {
    pageIndex: 0,
    pageSize: 10,
  },
};

export function fetchServiceHistoryByElevator(
  elevatorId: string,
): Promise<Resource<ElevatorMaintenanceHistoryView>> {
  console.log(`fetch service history by elevator, elevator id = ${elevatorId}`);
  return Promise.resolve(serviceHistories);
}
