import {useMutation, useQueryClient} from 'react-query';
import {ContactBody} from 'models/contacts';
import {queryKeys} from 'reactQuery/constants';
import {useSnackbar} from 'hooks/useSnackbar';
import {axiosClient} from 'utils/axios-utils';
import {StringValue} from '../../models/misc';

const updateContact = async (body: Partial<ContactBody>, contactId: string) => {
  await axiosClient.put<StringValue>(
    `/api/users/propertyContactPersons/${contactId}`,
    {
      ...body,
    },
  );
};

export const useUpdateContact = (successMsg?: string) => {
  const {enqueueSnackbar} = useSnackbar();
  const queryClient = useQueryClient();

  return useMutation(
    ({body, contactId}: {body: Partial<ContactBody>; contactId: string}) =>
      updateContact(body, contactId),
    {
      onSuccess: () => {
        if (successMsg) {
          enqueueSnackbar(successMsg, {
            variant: 'success',
          });
        }
        return queryClient.invalidateQueries(queryKeys.fetchUser);
      },
      onError: (err: any) => {
        console.log(err);
        enqueueSnackbar(
          'Sorry! Unable to save changes right now. Please try again.',
          {
            variant: 'error',
          },
        );
      },
    },
  );
};
