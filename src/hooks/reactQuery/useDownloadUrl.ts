import {useQuery} from 'react-query';
import {useCallback} from 'react';
import {queryKeys as qk} from 'reactQuery/constants';
import {axiosClient, paramsSerializer} from 'utils/axios-utils';
import {usePropertyManager} from './usePropertyManager';

export const fetchDownloadUrl = async (
  filePath: string[],
  serviceCompanyId: string,
) => {
  const response = await axiosClient.get<{[key: string]: string}>(
    `/api/media/signedUrl/download`,
    {
      params: {file: filePath, serviceCompanyId},
      paramsSerializer,
    },
  );

  return response.data;
};

export const useDownloadUrl = (
  filePath: string[],
  options?: {[key: string]: any},
) => {
  const {data: propertyManager} = usePropertyManager();
  const serviceCompanyId = propertyManager?.userAccount.serviceCompany.id;
  return useQuery(
    [qk.downloadUrl, filePath, serviceCompanyId],
    () => fetchDownloadUrl(filePath, serviceCompanyId!),
    {
      enabled: !!filePath.length && !!serviceCompanyId,
      refetchOnWindowFocus: false,
      cacheTime: 0,
      ...options,
      select: useCallback(
        (data) => filePath?.map((item) => data[item]),
        [filePath],
      ),
    },
  );
};
