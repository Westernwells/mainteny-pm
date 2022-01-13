import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import useTheme from '@mui/material/styles/useTheme';
import {ServiceOrderReport} from 'models/service-order';

interface Props {
  serviceOrderReports?: ServiceOrderReport[];
}

const ServiceDone = ({serviceOrderReports}: Props) => {
  const theme = useTheme();
  return (
    <Box>
      <Box>
        <Typography
          variant="h6"
          color="primary"
          sx={{
            background: theme.palette.inputBackground.main,
            mt: 2,
            pt: 3,
            pl: 2,
            py: 2,
          }}
        >
          What was Done
        </Typography>
      </Box>

      <Box pl={2} py={4}>
        <Typography variant="subtitle1">
          {serviceOrderReports && serviceOrderReports.length
            ? serviceOrderReports[0].description
            : 'No report yet'}
        </Typography>
      </Box>
    </Box>
  );
};

export default ServiceDone;
