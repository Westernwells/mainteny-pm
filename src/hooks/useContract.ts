import {useCallback} from 'react';
import {useQuery} from 'react-query';
import * as _ from 'lodash';
import {Order} from '../types/misc';
import {axiosClient} from '../utils/axios-utils';
import {
  ContractRecord,
  ContractStatus,
  ContractType,
  ContractView,
  CreateContractRecord,
} from '../models/contract';
import {Page, Priority, Resource, State, StringMap} from '../models/misc';
import {ElevatorView} from '../models/elevator';
import {createResource} from '../utils/paging-utils';
import {elevators} from './useElevator';

const contracts: Resource<ContractView> = {
  data: [
    {
      id: '953616e7-86d2-4716-abad-7818f8a1ebd6',
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
      serviceCompany: {
        id: '9d85be2d-ceb9-4b19-a350-9f512b4b57e4',
        name: 'Maintenance Experts GmbH',
        meta: {
          createdAt: '2021-05-31T08:32:55.193896Z',
          lastUpdatedAt: '2021-05-31T08:32:55.193897Z',
          state: State.ACTIVE,
        },
      },
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
      search: 'maintenance experts gmbh basic eur valid',
      meta: {
        createdAt: '2021-06-01T12:01:08.860505Z',
        lastUpdatedAt: '2021-06-01T12:01:08.860505Z',
        state: State.ACTIVE,
      },
    },
    {
      id: '8f49f1c1-083e-4c3b-85e9-f6a7af35cf64',
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
      serviceCompany: {
        id: '9d85be2d-ceb9-4b19-a350-9f512b4b57e4',
        name: 'Maintenance Experts GmbH',
        meta: {
          createdAt: '2021-05-31T08:32:55.193896Z',
          lastUpdatedAt: '2021-05-31T08:32:55.193897Z',
          state: State.ACTIVE,
        },
      },
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
      search: 'maintenance experts gmbh basic eur valid',
      meta: {
        createdAt: '2021-06-01T12:06:19.940524Z',
        lastUpdatedAt: '2021-06-01T12:06:19.940524Z',
        state: State.ACTIVE,
      },
    },
    {
      id: '636c9893-a26b-4ea3-82e4-89d191656e15',
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
      serviceCompany: {
        id: '9d85be2d-ceb9-4b19-a350-9f512b4b57e4',
        name: 'Astralift BV',
        meta: {
          createdAt: '2021-05-31T08:32:55.193896Z',
          lastUpdatedAt: '2021-05-31T08:32:55.193897Z',
          state: State.ACTIVE,
        },
      },
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
      search: 'astralift bv basic eur valid',
      meta: {
        createdAt: '2021-06-01T12:07:52.068670Z',
        lastUpdatedAt: '2021-06-01T12:07:52.068670Z',
        state: State.ACTIVE,
      },
    },
    {
      id: 'a2d4e00f-0e44-49d9-844d-c791c47e3b87',
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
      serviceCompany: {
        id: '9d85be2d-ceb9-4b19-a350-9f512b4b57e4',
        name: 'Astralift BV',
        meta: {
          createdAt: '2021-05-31T08:32:55.193896Z',
          lastUpdatedAt: '2021-05-31T08:32:55.193897Z',
          state: State.ACTIVE,
        },
      },
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
      search: 'astralift bv basic eur valid',
      meta: {
        createdAt: '2021-06-01T12:09:57.502411Z',
        lastUpdatedAt: '2021-06-01T12:09:57.502411Z',
        state: State.ACTIVE,
      },
    },
    {
      id: '8c0f4634-2e86-4332-9336-b0b36d017e51',
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
      serviceCompany: {
        id: '9d85be2d-ceb9-4b19-a350-9f512b4b57e4',
        name: 'Astralift BV',
        meta: {
          createdAt: '2021-05-31T08:32:55.193896Z',
          lastUpdatedAt: '2021-05-31T08:32:55.193897Z',
          state: State.ACTIVE,
        },
      },
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
      search: 'astralift bv basic eur valid',
      meta: {
        createdAt: '2021-06-01T12:11:01.637260Z',
        lastUpdatedAt: '2021-06-01T12:11:01.637260Z',
        state: State.ACTIVE,
      },
    },
    {
      id: 'cf02bd2b-3349-4a71-b740-3e33a7e5e20b',
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
      serviceCompany: {
        id: '9d85be2d-ceb9-4b19-a350-9f512b4b57e4',
        name: 'Maintenance Experts GmbH',
        meta: {
          createdAt: '2021-05-31T08:32:55.193896Z',
          lastUpdatedAt: '2021-05-31T08:32:55.193897Z',
          state: State.ACTIVE,
        },
      },
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
      search: 'maintenance experts gmbh basic eur valid',
      meta: {
        createdAt: '2021-06-01T12:02:39.563039Z',
        lastUpdatedAt: '2021-06-01T12:02:39.563039Z',
        state: State.ACTIVE,
      },
    },
    {
      id: '77a4e9e3-1719-4d50-b736-100f7fa69c4b',
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
      serviceCompany: {
        id: '9d85be2d-ceb9-4b19-a350-9f512b4b57e4',
        name: 'Maintenance Experts GmbH',
        meta: {
          createdAt: '2021-05-31T08:32:55.193896Z',
          lastUpdatedAt: '2021-05-31T08:32:55.193897Z',
          state: State.ACTIVE,
        },
      },
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
      search: 'maintenance experts gmbh basic eur valid',
      meta: {
        createdAt: '2021-06-01T12:05:13.079344Z',
        lastUpdatedAt: '2021-06-01T12:05:13.079344Z',
        state: State.ACTIVE,
      },
    },
    {
      id: 'b389aca5-6256-43df-b3a1-e84cc7555f36',
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
      serviceCompany: {
        id: '9d85be2d-ceb9-4b19-a350-9f512b4b57e4',
        name: 'Maintenance Experts GmbH',
        meta: {
          createdAt: '2021-05-31T08:32:55.193896Z',
          lastUpdatedAt: '2021-05-31T08:32:55.193897Z',
          state: State.ACTIVE,
        },
      },
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
      search: 'maintenance experts gmbh basic eur valid',
      meta: {
        createdAt: '2021-06-01T12:07:23.340216Z',
        lastUpdatedAt: '2021-06-01T12:07:23.340216Z',
        state: State.ACTIVE,
      },
    },
  ],
  total: 8,
  page: {pageIndex: 0, pageSize: 50},
};
const contractElevatorMap: StringMap<ElevatorView[]> = contracts.data
  .map((contract) => {
    const count = _.random(2, elevators.data.length - 1);
    return [contract.id, _.take(elevators.data, count)];
  })
  .reduce((acc, current) => {
    const key = current[0] as string;
    const value = current[1] as ElevatorView[];
    acc[key] = value;
    return acc;
  }, {} as StringMap<ElevatorView[]>);

export function fetchContracts(
  query: string,
  page: Page,
): Promise<Resource<ContractView>> {
  console.log(`fetch contracts, query = ${query}, page = ${page}`);
  let {data} = contracts;
  if (query) {
    const tokens = query
      .toLowerCase()
      .split(' ')
      .map((item) => item.trim());
    data = contracts.data.filter((c) =>
      _.every(tokens, (token) => c.search.includes(token)),
    );
  }

  const result = _.take(
    _.drop(data, page.pageIndex * page.pageSize),
    page.pageSize,
  );
  return Promise.resolve(createResource(result, page, contracts.page.pageSize));
}

export function fetchContractsElevatorMap(
  contractIds: string[],
): Promise<StringMap<ElevatorView[]>> {
  console.log(`fetch contract elevator map, contract ids = ${contractIds}`);
  return Promise.resolve(contractElevatorMap);
}

const queryContracts = (params: any) =>
  axiosClient({
    method: 'get',
    url: '/api/contracts',
    params,
  });

const fetchContractDetails = (contractId: string) =>
  axiosClient({
    method: 'get',
    url: `/api/contracts/${contractId}`,
  });

export const useQueryContract = (query: string, page: Page) =>
  useQuery(['query-contract', query, page], () => fetchContracts(query, page));

const mapContractElevator = (
  elevatorMap: StringMap<ElevatorView[]>,
  contractsRes?: Resource<ContractView>,
) => {
  const contractElevatorMapResult: ContractRecord[] = contractsRes!.data.map(
    (contract) => {
      const elevatorsResult = elevatorMap[contract.id] || [];
      return {contract, elevators: elevatorsResult};
    },
  );
  return {
    data: contractElevatorMapResult,
    page: contracts.page,
    total: contracts.total,
  };
};

export const useFetchContractsElevatorMap = (
  contractsRes: Resource<ContractView> | undefined,
) => {
  let contractIds: string[] = [];
  if (contractsRes) {
    contractIds = contractsRes.data.map((c) => c.id);
  }
  return useQuery(
    ['fetch-contract-by-elevator-map'],
    () => fetchContractsElevatorMap(contractIds),
    {
      enabled: !!contractsRes,
      select: useCallback(
        (elevatorMap) => mapContractElevator(elevatorMap, contractsRes),
        [contractsRes],
      ),
    },
  );
};

export const useFetchContractDetails = (contractId: string) =>
  useQuery('contract-details', () => fetchContractDetails(contractId), {
    enabled: false,
  });
