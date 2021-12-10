import {UserAccount} from './user';

export interface UserSession {
  token: string;
  userAccount: UserAccount;
  createdAt: number;
  lastUpdatedAt: number;
  expiredAt: number;
}
