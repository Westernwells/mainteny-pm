import Typography from '@mui/material/Typography';
import {Box} from '@mui/system';
import {ScrollableCard} from './ScrollableCard';

export const LogIssue = () => (
  <ScrollableCard
    renderHeaderText={() => (
      <Box>
        <Typography>Log an issue</Typography>
      </Box>
    )}
  >
    <Box />
  </ScrollableCard>
);
