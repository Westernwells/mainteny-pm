import Money from '@mui/icons-material/Money';
import PersonPinOutlined from '@mui/icons-material/PersonPinOutlined';
import Timer from '@mui/icons-material/Timer';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/system/Box';
import Divider from '@mui/material/Divider';

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
    <Divider sx={{mt: 1}} />
    <Box
      display="flex"
      flexDirection="row"
      gap={3}
      sx={{height: 100, width: '100%', overflowX: 'auto', mt: 2}}
    >
      {images.map((image) => (
        <Box key={image} sx={{width: 100, overflow: 'hidden', borderRadius: 1}}>
          <img
            src={`/pm/${image}`}
            alt=""
            style={{objectFit: 'cover', height: '100%', width: '100%'}}
          />
        </Box>
      ))}
    </Box>
  </CardContent>
);

export {HistoryDetails};
