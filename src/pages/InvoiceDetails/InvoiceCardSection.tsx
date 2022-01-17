import Box from '@mui/material/Box';
import {useNavigate} from 'react-router-dom';
import Typography from '@mui/material/Typography';
import useTheme from '@mui/material/styles/useTheme';
import IconButton from '@mui/material/IconButton';
import {KeyboardArrowLeft} from '@mui/icons-material';
import {InvoiceCardItem} from './components/InvoiceCardItem';

export const InvoiceCardSection = () => {
  const theme = useTheme();
  const navigate = useNavigate();
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
      <Box
        display="flex"
        sx={{flexDirection: 'row', alignItems: 'space-between'}}
      >
        <IconButton onClick={() => navigate('/invoices')}>
          <KeyboardArrowLeft />
        </IconButton>
        <Typography variant="h4" sx={{color: theme.palette.common.white}}>
          INV000128
        </Typography>
      </Box>
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
          45000 €
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
        <InvoiceCardItem
          heading="Date Completed"
          text="24 September 2021"
          type="text"
        />
        <InvoiceCardItem
          heading="Receiver"
          text="Erik Kvakkestad"
          type="text"
        />
        <InvoiceCardItem
          heading="Invoice Address"
          text="Idrettsveien 3, 1400 Ski"
          type="text"
        />
        <InvoiceCardItem
          heading="Delivery Address"
          text="Idrettsveien 3, 1400 Ski"
          type="text"
        />
        <InvoiceCardItem
          heading="Status"
          text="Paid"
          type="chip"
          chipColor="success"
        />
      </Box>
    </Box>
  );
};
