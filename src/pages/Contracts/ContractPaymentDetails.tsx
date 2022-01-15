import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useTheme from '@mui/material/styles/useTheme';
import {CustomCard} from 'components/CustomCard';

const paymentDetailsField = ['Name', 'IBAN', 'BIC'];

export const ContractPaymentDetails = () => {
  const theme = useTheme();

  const paymentDetails = (field: string) => {
    switch (field) {
      case 'Name':
        return <Typography variant="largeBtnText">Christ Andersson</Typography>;
      case 'IBAN':
        return (
          <Typography variant="largeBtnText">
            SE87 3000 0000 0101 2345 67890{' '}
          </Typography>
        );
      case 'BIC':
        return <Typography variant="largeBtnText">DEUTDEFF</Typography>;
      default:
        return null;
    }
  };

  return (
    <CustomCard containerStyles={{background: '#fff', px: 2}}>
      <Box width="100%" mt={1}>
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
          Payment Details
        </Typography>
      </Box>
      {paymentDetailsField.map((field) => (
        <Box key={`${field}-issue`} display="flex">
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
          <Box py={1}>{paymentDetails(field)}</Box>
        </Box>
      ))}
    </CustomCard>
  );
};
