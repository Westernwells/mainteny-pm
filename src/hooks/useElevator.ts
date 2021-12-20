import {useQuery} from 'react-query';
import * as _ from 'lodash';
import getCenter from 'geolib/es/getCenter';
import {
  Elevator,
  ElevatorCategory,
  ElevatorStatus,
  ElevatorView,
} from '../models/elevator';
import {
  Location,
  Page,
  Priority,
  Resource,
  RestError,
  State,
} from '../models/misc';
import {createResource} from '../utils/paging-utils';

export const elevators: Resource<ElevatorView> = {
  data: [
    {
      id: 'add6168d-d7c4-4434-975b-8fdcc72b7546',
      number: '437',
      model: 'Schindler',
      type: '-',
      capacity: '-',
      category: ElevatorCategory.ESCALATOR,
      technicianNumber: 1,
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
      search:
        'scharnweberstraße 35, 10247 berlin, germany de august storck running 437 schindler - - escalator []',
      meta: {
        createdAt: '2021-06-01T12:09:57.208542Z',
        lastUpdatedAt: '2021-06-01T12:09:57.208543Z',
        state: State.ACTIVE,
      },
    },
    {
      id: 'd650c75f-d6be-4609-9cc9-5b5e0fca9597',
      number: '60',
      model: 'Lutz',
      type: '-',
      capacity: '-',
      category: ElevatorCategory.REVOLVING_GATE,
      technicianNumber: 1,
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
      search:
        'chausseestraße 50, 10115 berlin, germany de august storck running 60 lutz - - revolving_gate []',
      meta: {
        createdAt: '2021-06-01T12:01:08.561291Z',
        lastUpdatedAt: '2021-06-01T12:01:08.561291Z',
        state: State.ACTIVE,
      },
    },
    {
      id: 'a992d7a3-b58b-469e-944f-758f14d40f0c',
      number: '356',
      model: 'Schindler',
      type: '-',
      capacity: '-',
      category: ElevatorCategory.FACADE_ACCESS_SYSTEM,
      technicianNumber: 1,
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
      search:
        'richard-sorge-straße 44, 10249 berlin, germany de august storck running 356 schindler - - facade_access_system []',
      meta: {
        createdAt: '2021-06-01T12:07:51.766909Z',
        lastUpdatedAt: '2021-06-01T12:07:51.766909Z',
        state: State.ACTIVE,
      },
    },
    {
      id: 'f4544d09-a3cf-4d46-905a-521d0dad0a04',
      number: '337',
      model: 'Lutz',
      type: '-',
      capacity: '-',
      category: ElevatorCategory.GARAGE_DOOR,
      technicianNumber: 1,
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
      search:
        'bänschstraße 78, 10247 berlin, germany de august storck running 337 lutz - - garage_door []',
      meta: {
        createdAt: '2021-06-01T12:07:23.062120Z',
        lastUpdatedAt: '2021-06-01T12:07:23.062121Z',
        state: State.ACTIVE,
      },
    },
    {
      id: '2488ea54-bd6f-4ea3-84e9-333820a870d0',
      number: '475',
      model: 'Johnsen',
      type: '-',
      capacity: '-',
      category: ElevatorCategory.MOVING_WALKWAY,
      technicianNumber: 1,
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
      search:
        'baerwaldstraße 56, 10961 berlin, germany de august storck running 475 johnsen - - moving_walkway []',
      meta: {
        createdAt: '2021-06-01T12:11:01.343449Z',
        lastUpdatedAt: '2021-06-01T12:11:01.343449Z',
        state: State.ACTIVE,
      },
    },
    {
      id: '5a8b31b0-e45d-4457-9884-13f80753d56f',
      number: '132',
      model: 'Vestner',
      type: '-',
      capacity: '-',
      category: ElevatorCategory.MOVING_WALKWAY,
      technicianNumber: 1,
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
      search:
        'siegmunds hof 17, 10555 berlin, germany de august storck running 132 vestner - - moving_walkway []',
      meta: {
        createdAt: '2021-06-01T12:02:39.274170Z',
        lastUpdatedAt: '2021-06-01T12:02:39.274170Z',
        state: State.ACTIVE,
      },
    },
    {
      id: 'fb22372b-b20e-4a87-a4f7-e51e236a1096',
      number: '245',
      model: 'Schindler',
      type: '-',
      capacity: '-',
      category: ElevatorCategory.HOMELIFT,
      technicianNumber: 1,
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
      search:
        'türkenstraße 20, 13349 berlin, germany de august storck running 245 schindler - - homelift []',
      meta: {
        createdAt: '2021-06-01T12:05:12.760374Z',
        lastUpdatedAt: '2021-06-01T12:05:12.760374Z',
        state: State.ACTIVE,
      },
    },
    {
      id: 'a48858cc-0f31-498e-9571-3089b425d7ac',
      number: '291',
      model: 'Mitsubishi',
      type: '-',
      capacity: '-',
      category: ElevatorCategory.GARAGE_DOOR,
      technicianNumber: 1,
      address: {
        id: '6d73dd20-e271-4532-a6a2-54d113df8c29',
        fullName: 'Scharnweberstraße 35, 10247 Berlin, Germany',
        countryCode: 'DE',
        location: {longitude: 13.4631665, latitude: 52.5131019},
      },
      propertyOwner: {
        id: '219f432f-8f32-4c28-8261-1b6f0793bfad',
        name: 'August Storck',
        serviceCompanyId: '9d85be2d-ceb9-4b19-a350-9f512b4b57e4',
        address: {
          id: '6d73dd20-e271-4532-a6a2-54d113df8c29',
          fullName: 'Scharnweberstraße 35, 10247 Berlin, Germany',
          countryCode: 'DE',
          location: {longitude: 13.4631665, latitude: 52.5131019},
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
      search:
        'Scharnweberstraße 35, 10247 Berlin, Germany de august storck running 291 mitsubishi - - garage_door []',
      meta: {
        createdAt: '2021-06-01T12:06:19.630961Z',
        lastUpdatedAt: '2021-06-01T12:06:19.630962Z',
        state: State.ACTIVE,
      },
    },
  ],
  total: 8,
  page: {pageIndex: 0, pageSize: 50},
};

export function fetchElevators(
  query: string,
  page: Page,
): Promise<Resource<ElevatorView>> {
  let {data} = elevators;
  if (query) {
    const tokens = query
      .toLowerCase()
      .split(' ')
      .map((item) => item.trim());
    data = elevators.data
      .filter((e) => _.every(tokens, (token) => e.search.includes(token)))
      .sort((a, b) => a.address.id.localeCompare(b.address.id));
  }

  const result = _.take(
    _.drop(data, page.pageIndex * page.pageSize),
    page.pageSize,
  );
  return Promise.resolve(createResource(result, page, elevators.page.pageSize));
}

export function fetchElevator(elevatorId: string): Promise<Elevator> {
  console.log(`fetch elevator, elevator id = ${elevatorId}`);
  const elevator: any = elevators.data.filter((e) => e.id === elevatorId)[0];
  return Promise.resolve(elevator as Elevator);
}

export function useAllElevators(query: string, page: Page) {
  return useQuery<
    Resource<ElevatorView>,
    RestError,
    {elevator: Resource<ElevatorView>; centerCoord: Location}
  >(['fetchAllElevators', query, page], () => fetchElevators(query, page), {
    select: (elevatorResponse) => {
      const latLng = elevatorResponse?.data.map((elevator) => ({
        latitude: elevator.address.location.latitude,
        longitude: elevator.address.location.longitude,
      }));
      const centerCoord = getCenter(latLng) as unknown as Location;

      return {
        elevator: elevatorResponse,
        centerCoord,
      };
    },
  });
}
