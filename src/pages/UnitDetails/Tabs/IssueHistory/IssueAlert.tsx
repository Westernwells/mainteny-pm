import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import useTheme from '@mui/material/styles/useTheme';
import {ServiceOrderView} from 'models/service-order';
import {formatDistanceToNowStrict} from 'date-fns';
import {toDate} from 'utils/datetime';

interface Props {
  selectedIssueHistory: ServiceOrderView;
}

export const IssueAlert = ({selectedIssueHistory}: Props) => {
  const theme = useTheme();
  return (
    <Box>
      <Typography
        variant="h6"
        sx={{
          background: theme.palette.info.infoAlert,
          mt: 2,
          pt: 3,
          pl: 2,
          height: '95px',
          color: '#000000',
          borderRadius: '1px',
        }}
      >
        {`${selectedIssueHistory.schedules[0].technician.userAccount.firstName} 
      ${selectedIssueHistory.schedules[0].technician.userAccount.lastName} 
      will be visiting your location in the next ${formatDistanceToNowStrict(
        toDate(selectedIssueHistory.schedules[0].startTime),
      )}`}
      </Typography>
    </Box>
  );
};
