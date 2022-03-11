import {useQuery} from 'react-query';
import {useCallback} from 'react';
import {queryKeys as qk} from 'reactQuery/constants';
import {axiosClient, paramsSerializer} from 'utils/axios-utils';
import {usePropertyManager} from './usePropertyManager';

export const fetchDownloadUrl = async (
  pdfPath: string[],
  serviceCompanyId: string,
) => {
  const response = await axiosClient.get<{[key: string]: string}>(
    `/api/media/signedUrl/download`,
    {
      params: {file: pdfPath, serviceCompanyId},
      paramsSerializer,
    },
  );

  return response.data;
};

export const useDownloadUrl = (
  pdfPath: string[],
  options?: {[key: string]: any},
) => {
  const {data: propertyManager} = usePropertyManager();
  const serviceCompanyId = propertyManager?.userAccount.serviceCompany.id;
  return useQuery(
    [qk.invoiceDownloadUrl, pdfPath, serviceCompanyId],
    () => fetchDownloadUrl(pdfPath, serviceCompanyId!),
    {
      enabled: !!pdfPath.length && !!serviceCompanyId,
      refetchOnWindowFocus: false,
      cacheTime: 0,
      ...options,
      select: useCallback(
        (data) => pdfPath?.map((item) => data[item]),
        [pdfPath],
      ),
    },
  );
};
