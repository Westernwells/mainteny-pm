import React from 'react';
import {useNavigate} from 'react-router-dom';
import Box from '@mui/system/Box';
import Chip from '@mui/material/Chip';
import useTheme from '@mui/material/styles/useTheme';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import {StatusChip} from 'components/StatusChip';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {getDay} from '../../utils/datetime';
import {InvoiceStatus, InvoiceView} from '../../models/invoice';

interface InvoiceRowProps {
  invoice: InvoiceView;
}

export const InvoiceRow = ({invoice}: InvoiceRowProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        border: '1px solid #E4E9F2',
        paddingTop: 1,
        paddingBottom: 1,
        marginTop: 1,
        borderRadius: '4px',
        cursor: 'pointer',
        '&:hover': {background: 'rgba(0, 209, 255, 0.08)'},
      }}
      onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        navigate(`/invoices/${invoice.id}`);
      }}
    >
      <Grid container sx={{pl: 2}}>
        <Grid item xs={2}>
          <Typography variant="subtitle2">
            {getDay(invoice.issueDate)}
          </Typography>
        </Grid>

        <Grid item xs={2}>
          <Typography variant="subtitle2">{invoice.number}</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="subtitle2">{invoice.serviceCompany}</Typography>
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
            <StatusChip
              label={invoice.status}
              bgColor={
                invoice.status === InvoiceStatus.PAID
                  ? theme.palette.success.main
                  : theme.state?.ratingActive
              }
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
