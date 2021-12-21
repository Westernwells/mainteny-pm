import Box from '@mui/system/Box';
import Chip from '@mui/material/Chip';
import useTheme from '@mui/material/styles/useTheme';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {getDay} from '../../utils/datetime';
import {InvoiceStatus, InvoiceView} from '../../models/invoice';

interface InvoiceRowProps {
  invoice: InvoiceView;
}

export const InvoiceRow = ({invoice}: InvoiceRowProps) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        backgroundColor: '#FAFAFA',
        border: '1px solid #E4E9F2',
        paddingTop: 2,
        paddingBottom: 2,
        marginTop: 2,
        borderRadius: '15px',
      }}
    >
      <Grid container sx={{pl: 2}}>
        <Grid item xs={3}>
          <Typography variant="subtitle2">
            {getDay(invoice.issueDate)}
          </Typography>
        </Grid>

        <Grid item xs={3}>
          <Typography variant="subtitle2">{invoice.number}</Typography>
        </Grid>

        <Grid item xs={2}>
          <Box display="flex" justifyContent="center">
            <Typography variant="subtitle2">
              {invoice.amount.amount} {invoice.amount.currency}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={2}>
          <Box display="flex" justifyContent="center">
            <Chip
              sx={{
                py: 2,
                color: '#fff',
                backgroundColor:
                  invoice.status === InvoiceStatus.PAID
                    ? theme.palette.success.main
                    : theme.state.ratingActive,
              }}
              label={
                <Typography
                  variant="largeBtnText"
                  sx={{textTransform: 'capitalize'}}
                >
                  {`${invoice.status.charAt(0)}${invoice.status
                    .slice(1)
                    .toLowerCase()}`}
                </Typography>
              }
              size="medium"
            />
          </Box>
        </Grid>

        <Grid item xs={2}>
          <Box display="flex" justifyContent="center">
            <FileDownloadOutlinedIcon sx={{color: theme.palette.info.main}} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
