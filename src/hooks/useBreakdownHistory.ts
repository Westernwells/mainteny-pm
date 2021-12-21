import {BreakdownHistoryView} from '../models/breakdownHistory';
import {Resource} from '../models/misc';

export const breakDownHistoryResource: Resource<BreakdownHistoryView> = {
  data: [
    {
      id: '1',
      datetime: '2021-11-02T00:00:00Z',
      durationInMinutes: 240,
      status: 'Resolved',
      description: 'Blocked door in 2nd floor',
    },
    {
      id: '2',
      datetime: '2021-10-29T00:00:00Z',
      durationInMinutes: 120,
      status: 'Resolved',
      description: 'Controller error',
    },
    {
      id: '3',
      datetime: '2021-08-11T00:00:00Z',
      durationInMinutes: 240,
      status: 'Resolved',
      description: 'Broken roller',
    },
  ],
  page: {
    pageIndex: 0,
    pageSize: 500,
  },
  total: 10,
};
