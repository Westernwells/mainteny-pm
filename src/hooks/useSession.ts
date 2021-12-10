import {useQuery} from 'react-query';
import {
  DispatchStrategy,
  Language,
  RestError,
  State,
  StringValueResponse,
} from '../models/misc';
import {UserSession} from '../models/session';
import {UserAccountStatus} from '../models/user';

export function useLogin(username: string, password: string) {
  console.log(username);
  console.log(password);
  const session: UserSession = {
    token: 'b9a4ccc2ef5b4c4392cea66325ffc567',
    userAccount: {
      id: 'ccc42cd8-1b46-46a1-8d2e-5b6d4a579385',
      username: 'admin@mainteny.com',
      firstName: 'Admin',
      lastName: 'User',
      photoUrl: '',
      contact: {phone: '+4900000000000', email: 'admin@mainteny.com'},
      roles: ['ADMIN'],
      serviceCompany: {
        id: 'd6aa11ab-bdec-40ed-85fc-e69a32d61fcc',
        name: 'Mainteny',
        contact: {
          phone: '12345678',
          email: 'admin@mainteny.com',
          url: 'www.mainteny.com',
        },
        language: Language.EN_US,
        settings: {
          nightlyShuffleEnabled: false,
          companyDispatchStrategy: DispatchStrategy.BIG_BANG,
          totalYearlyVacationDaysAllowed: 30,
          dateFormat: 'dd/MM/yyyy',
        },
        meta: {
          createdAt: '2020-12-26T13:42:11.888867Z',
          lastUpdatedAt: '2020-12-26T13:42:11.888876Z',
          state: State.ACTIVE,
        },
      },
      status: UserAccountStatus.NORMAL,
      meta: {
        createdAt: '2020-12-26T13:44:05.127607Z',
        lastUpdatedAt: '2020-12-26T13:44:05.127608Z',
        state: State.ACTIVE,
      },
    },
    createdAt: '2021-12-10T20:40:42.212623Z',
    lastUpdatedAt: '2021-12-10T20:40:42.212625Z',
    expiredAt: '2021-12-11T06:40:42.212626Z',
  };
  return useQuery<UserSession, RestError>('login', () =>
    Promise.resolve(session),
  );
}

export function useAccountActivation(token: string, password: string) {
  console.log(token);
  console.log(password);
  return useQuery<StringValueResponse, RestError>('accountActivation', () =>
    Promise.resolve({value: 'ok'}),
  );
}
