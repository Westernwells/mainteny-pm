import {useQuery} from 'react-query';
import {queryKeys} from 'reactQuery/constants';
import {axiosClient} from 'utils/axios-utils';
import {ServiceCompanyItem} from 'models/service-company';
import {useSnackbar} from 'hooks/useSnackbar';

export const getCompany = async (companyId: string) => {
  const response = await axiosClient.get<ServiceCompanyItem>(
    `/api/serviceCompanies/${companyId}`,
  );
  return response.data;
};

export const useCompanyById = (companyId?: string) => {
  const {enqueueSnackbar} = useSnackbar();
  return useQuery(
    [queryKeys.fetchCompany, companyId],
    () => getCompany(companyId!),
    {
      enabled: !!companyId,
      onError: (err: any) => {
        enqueueSnackbar(err);
      },
    },
  );
};
