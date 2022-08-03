import {useQuery} from 'react-query';
import {RestError, StringValueResponse} from '../../models/misc';

export function useAccountActivation(token: string, password: string) {
  console.log(token);
  console.log(password);
  return useQuery<StringValueResponse, RestError>('accountActivation', () =>
    Promise.resolve({value: 'ok'}),
  );
}
