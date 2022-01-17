import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useTheme from '@mui/material/styles/useTheme';
import {InvoiceCardItem} from './components/InvoiceCardItem';

export const InvoiceCardSection = () => {
  const theme = useTheme();
  return (
    <Box
      display="flex"
      flexDirection="column"
      borderRadius={2}
      sx={{
        background: 'linear-gradient(180deg, #095369 0%, #043146 100%)',
        py: 2,
        px: 2,
        gap: 1,
        flexBasis: '30%',
      }}
    >
      <Typography variant="h4" sx={{color: theme.palette.common.white}}>
        INV000128
      </Typography>
      <Box
        display="flex"
        flexDirection="column"
        sx={{
          background: theme.palette.secondary.outlinedHoverBg,
          alignItems: 'center',
          justifyContent: 'center',
          px: 6,
          py: 1,
          borderRadius: 1,
        }}
      >
        <Typography variant="h4" sx={{color: theme.palette.common.white}}>
          9700 €
        </Typography>
        <Typography variant="body1" sx={{color: theme.palette.common.white}}>
          Total Amount
        </Typography>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        sx={{
          background: theme.palette.inputBackground.main,
          borderRadius: 1,
          gap: 4,
          flex: 2,
          py: 2,
          px: 2,
        }}
      >
        <InvoiceCardItem heading="Date Completed" text="24 September 2021" />
        <InvoiceCardItem heading="Receiver" text="ABCD AS" />
        <InvoiceCardItem
          heading="Invoice Address"
          text="Main Road 3, 1400 Ski"
        />
        <InvoiceCardItem
          heading="Delivery Address"
          text="Main Road 3, 1400 Ski"
        />
        <InvoiceCardItem heading="Status" text="Paid" />
      </Box>
    </Box>
  );
};
