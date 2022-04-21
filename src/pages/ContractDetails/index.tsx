import Box from '@mui/material/Box';
import {useFetchContractDetails} from 'hooks/reactQuery/useContract';
import {CustomButtonUnstyled} from 'components/CustomButtonUnstyled';
import {useParams} from 'react-router-dom';
import {BackAction} from 'components/BackAction';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import {Progress} from 'components/Progress';

import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import ElevatorIcon from '@mui/icons-material/Elevator';
import {useState} from 'react';
import {Tabs} from '../../components/Tabs';
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
  const {id: contractId} = useParams();

  const {data: contract, isLoading} = useFetchContractDetails(contractId!);

  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Box style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
      <Box
        display="flex"
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '0.5em',
        }}>
        <BackAction label="Contract Details" />
        <Tabs index={tabIndex} setIndex={setTabIndex} items={tabItems} />
        <CustomButtonUnstyled
          label="Download Contract"
          size="small"
          startIcon={<FileDownloadIcon color="primary" />}
        />
      </Box>
      {isLoading && <Progress />}
      {tabIndex === 0 && !isLoading && <Overview contract={contract!} />}
      {tabIndex === 1 && !isLoading && (
        <Box style={{display: 'flex', height: '100%'}}>
          <Units units={contract!.elevators.map(({elevator}) => elevator)} />
        </Box>
      )}
    </Box>
  );
};
