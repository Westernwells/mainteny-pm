import Money from '@mui/icons-material/Money';
import PersonPinOutlined from '@mui/icons-material/PersonPinOutlined';
import Timer from '@mui/icons-material/Timer';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/system/Box';

import {HistoryInfo} from './HistoryInfo';

interface HistoryDetailsProps {
  technician: string;
  cost: string;
  duration: string;
  images: string[];
}

const HistoryDetails = ({
  technician,
  cost,
  duration,
  images,
}: HistoryDetailsProps) => (
  <CardContent sx={{m: 0, p: 0}}>
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      sx={{width: '100%'}}
    >
      <HistoryInfo
        title="Technician"
        Icon={PersonPinOutlined}
        value={technician}
      />
      <HistoryInfo title="Cost" Icon={Money} value={cost} />
      <HistoryInfo title="Duration" Icon={Timer} value={duration} />
    </Box>
  </CardContent>
);

export {HistoryDetails};
