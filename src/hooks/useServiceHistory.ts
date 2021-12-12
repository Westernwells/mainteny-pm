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
      id: '0d150395-b2e1-4a69-a02b-da5455623f60',
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
      description: 'll',
      attachments: [],
      technician: {
        id: '8db55be2-4ebf-4d38-af0b-34e48aef130c',
        address: {
          id: '14cbd6b2-1126-42e4-8084-ec88254baf95',
          fullName: 'Ebelstraße 30, 14959 Trebbin, Germany',
          countryCode: 'DE',
          location: {
            longitude: 13.2298868,
            latitude: 52.22156769999999,
          },
        },
        userAccount: {
          id: '777cb16d-ad64-40ec-908e-ec45b80ee4ab',
          username: 'dummy1-team2@graedler-foerdertechnik.de',
          firstName: 'Dummy1',
          lastName: 'Team2',
          photoUrl: '01161BC5-237A-40D6-9579-19F6BD3B2CEF.jpg',
          contact: {
            phone: '+4900000000000',
            email: 'dummy1-team2@graedler-foerdertechnik.de',
          },
          roles: ['TECHNICIAN'],
          status: UserAccountStatus.NORMAL,
          meta: {
            createdAt: '2021-05-01T22:41:39.302051Z',
            lastUpdatedAt: '2021-09-29T11:16:16.941201Z',
            state: State.ACTIVE,
          },
        },
        isOnline: true,
        additionalInfo: {
          leftVacationDays: 27,
          assignedServiceOrderTypes: [],
        },
        meta: {
          createdAt: '2021-05-01T22:41:39.341470Z',
          lastUpdatedAt: '2021-09-29T11:16:16.955909Z',
          state: State.ACTIVE,
        },
      },
      fee: {
        amount: 0,
        currency: 'EUR',
      },
      serviceOrderId: '02a9d8a5-5efc-4385-9571-14b37739cd68',
      actualServiceTime: 120,
      createdAt: '2021-11-29T12:58:10.120503Z',
    },
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
      description: 'I did some things',
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
      serviceOrderId: '0303a89a-1267-44f3-92d0-ba935bea7f3e',
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
      description: '',
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
      serviceOrderId: '660db2f8-fa82-4cd2-ba84-374130904937',
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
      description: '',
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
      serviceOrderId: '799f29a1-1919-469b-8cff-9ebc1911877a',
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
      description: '',
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
      serviceOrderId: '587fdf54-1160-4042-8538-3ea6d0cdb5cc',
      actualServiceTime: 60,
      createdAt: '2021-08-13T14:25:29.751841Z',
    },
    {
      id: 'e9742b68-3851-48a2-87ec-cd8d907eecf8',
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
      description: '',
      attachments: [],
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
      serviceOrderId: 'e208654a-1ece-4190-b047-7e495875a7b7',
      actualServiceTime: 120,
      createdAt: '2021-06-30T16:10:36.108258Z',
    },
    {
      id: 'a72a7f48-3835-4c82-bf31-9db58599b4af',
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
      description: '',
      attachments: [],
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
      serviceOrderId: 'a490afba-6431-40ab-8c70-e1e146803b84',
      actualServiceTime: 120,
      createdAt: '2021-06-30T15:53:02.237309Z',
    },
    {
      id: '0a511d3e-caf2-4be6-88a0-c6befec6c50a',
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
      description: 'www',
      attachments: [],
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
      serviceOrderId: '40edb168-85c0-42fd-863c-0585c9cf27fc',
      actualServiceTime: 60,
      createdAt: '2021-06-24T23:10:05.375333Z',
    },
    {
      id: '77dbf800-a31b-4596-a23d-48f539c83402',
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
      description: 'k',
      attachments: [],
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
      serviceOrderId: 'ec2d82b0-9727-4d1e-a21d-7065d721b665',
      actualServiceTime: 180,
      createdAt: '2021-06-24T14:42:33.509546Z',
    },
    {
      id: '4665fa69-f673-4496-b2f2-06d7ba7a7dd8',
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
      description: 'kkkwwk',
      attachments: [],
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
      serviceOrderId: '586fc657-10cc-4c73-a82c-99aa1062817a',
      actualServiceTime: 120,
      createdAt: '2021-06-24T14:19:42.149953Z',
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
