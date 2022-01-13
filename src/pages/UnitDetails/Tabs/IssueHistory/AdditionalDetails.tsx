import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import useTheme from '@mui/material/styles/useTheme';
import {ServiceOrderReport} from 'models/service-order';

const fields = ['Technician', 'Cost', 'Duration'];

interface Props {
  serviceOrderReports?: ServiceOrderReport[];
}

export const AdditionalDetails = ({serviceOrderReports}: Props) => {
  const theme = useTheme();
  const serviceTime =
    serviceOrderReports && serviceOrderReports.length
      ? serviceOrderReports[0].actualServiceTime / 60
      : null;

  const renderFieldValue = (field: string) => {
    switch (field) {
      case 'Technician':
        return (
          <Typography variant="largeBtnText" mr={2}>
            {serviceOrderReports && serviceOrderReports.length
              ? `${serviceOrderReports[0].technician.userAccount.firstName} ${serviceOrderReports[0].technician.userAccount.firstName}`
              : null}
          </Typography>
        );

      case 'Duration':
        return (
          <Typography variant="largeBtnText" mr={2}>
            {serviceTime
              ? `${Math.floor(serviceTime)}h
           ${Math.floor((serviceTime - Math.floor(serviceTime)) * 60)}m`
              : null}
          </Typography>
        );

      case 'Cost':
        return (
          <>
            <Typography variant="largeBtnText" mr={2}>
              {serviceOrderReports && serviceOrderReports.length
                ? `${serviceOrderReports[0].fee.amount}${serviceOrderReports[0].fee.currency}`
                : null}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{color: theme.palette.info.main}}
            >
              View Invoice
            </Typography>
          </>
        );

      default:
        return null;
    }
  };
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
          Additional Details
        </Typography>
      </Box>

      <Box width="30vw" ml={15} mt={3}>
        {fields.map((field) => (
          <Box key={field} display="flex">
            <Typography
              variant="largeBtnText"
              mr={1}
              pr={10}
              width="30%"
              py={1}
              color="textSecondary"
            >
              {field}
            </Typography>
            <Box py={1} display={field === 'Cost' ? 'flex' : 'block'}>
              {renderFieldValue(field)}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
