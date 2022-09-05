/* eslint-disable */
import {useState} from 'react';
import {useParams} from 'react-router';
import ElevatorIcon from '@mui/icons-material/Elevator';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import {TabsBody} from 'components/TabsBody';
import {Tabs} from 'components/Tabs';
import {Progress} from 'components/Progress';
import {useDownloadUrl} from 'hooks/reactQuery/useDownloadUrl';
import {useFetchContractDetails} from 'hooks/reactQuery/useContract';
import {Overview} from './Tabs/Overview';
import {Units} from './Tabs/Units';

const tabItems = [
  {
    label: 'Overview',
    icon: <ManageSearchIcon />,
  },
  {
    label: 'Units',
    icon: <ElevatorIcon />,
  },
];

export const ContractDetails = () => {
  const [tabValue, setTabValue] = useState(0);
  const {id: contractId} = useParams();
  const {
    data: contractDetails,
    isLoading,
    isIdle,
  } = useFetchContractDetails(contractId!);
  const {data: downloadUrl} = useDownloadUrl(
    contractDetails?.additionalInfo?.documents?.length
      ? [contractDetails?.additionalInfo?.documents[0]?.uri]
      : [],
  );

  const fileName =
    contractDetails?.additionalInfo?.documents &&
    contractDetails?.additionalInfo?.documents?.length > 0
      ? contractDetails?.additionalInfo?.documents[0]?.description
      : 'Not Available';

  if (isIdle || isLoading) {
    return <Progress />;
  }

  return (
    <Tabs
      tabItems={tabItems}
      currentIndex={tabValue}
      onChange={(index) => setTabValue(index)}
      showActionBtn
      btnLabel="Download contract"
      actionBtnVariant="outlined"
      disableBtnAction={!Object.values(downloadUrl || {}).length}
      actionButtonIcon={<FileDownloadIcon />}
      btnOnClick={() => {
        if (downloadUrl && Object.values(downloadUrl).length) {
          const uploadUrl = Object.values(downloadUrl)[0];
          fetch(uploadUrl).then((response) =>
            response.blob().then((file) => {
              const link = document.createElement('a');
              link.href = URL.createObjectURL(file);
              link.setAttribute('download', fileName);
              link.click();
            }),
          );
        }
      }}>
      <TabsBody value={tabValue} index={0}>
        <Overview
          contract={contractDetails}
          downloadUrl={downloadUrl}
          fileName={fileName}
        />
      </TabsBody>
      <TabsBody value={tabValue} index={1}>
        <Units elevators={contractDetails?.elevators || []} />
      </TabsBody>
    </Tabs>
  );
};
