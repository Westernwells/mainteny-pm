import {useSnackbar} from 'hooks/useSnackbar';
import {axiosClient} from 'utils/axios-utils';

export const useUpdateUserPassword = () => {
  const {enqueueSnackbar} = useSnackbar();
  return async ({
    username,
    oldPassword,
    newPassword,
    onSuccess,
  }: {
    username: string;
    oldPassword: string;
    newPassword: string;
    onSuccess?: () => void;
  }) => {
    try {
      const {status} = await axiosClient.put(
        `/api/users/${username}/password`,
        {
          oldPassword,
          newPassword,
        },
      );

      if (status === 200) {
        enqueueSnackbar('Password updated successfully', {
          variant: 'success',
        });
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (error: any) {
      console.error(error);
      enqueueSnackbar('Some error occurred, please try again.', {
        variant: 'error',
      });
    }
  };
};
