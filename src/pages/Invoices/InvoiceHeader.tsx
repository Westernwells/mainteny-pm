import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/system/Box';

export const InvoiceHeader = () => (
  <Box
    // display="flex"
    sx={{
      backgroundColor: '#fff',
      paddingTop: 1,
      paddingBottom: 1,
      // paddingLeft: '15px',
      boxShadow: '0px 0px 0px 1px #E0E0E0',
      borderRadius: '4px',
    }}
  >
    <Grid container sx={{pl: 2}}>
      <Grid item xs={2}>
        <Typography variant="subtitle2">INVOICE DATE</Typography>
      </Grid>

      <Grid item xs={2}>
        <Typography variant="subtitle2">INVOICE NUMBER</Typography>
      </Grid>

      <Grid item xs={2}>
        <Typography variant="subtitle2">SERVICE COMPANY</Typography>
      </Grid>

      <Grid item xs={2}>
        <Box display="flex" justifyContent="center">
          <Typography variant="subtitle2">TOTAL AMOUNT</Typography>
        </Box>
      </Grid>

      <Grid item xs={2}>
        <Box display="flex" justifyContent="center">
          <Typography variant="subtitle2">STATUS</Typography>
        </Box>
      </Grid>

      <Grid item xs={2}>
        <Box display="flex" justifyContent="center">
          <Typography variant="subtitle2">ACTIONS</Typography>
        </Box>
      </Grid>
    </Grid>
  </Box>
);
