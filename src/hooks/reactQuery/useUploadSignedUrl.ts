import {axiosClient, paramsSerializer} from 'utils/axios-utils';

export const getUploadSignedUrl = async (
  filePath: string[],
  serviceCompanyId: string,
) => {
  const response = await axiosClient.get<{[key: string]: string}>(
    `/api/media/signedUrl/upload`,
    {
      params: {file: filePath, serviceCompanyId},
      paramsSerializer,
    },
  );
  return response.data;
};
