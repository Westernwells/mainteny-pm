import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/system/Box';

export const ContractHeader = () => (
  <Box
    // display="flex"
    sx={{
      backgroundColor: '#fff',
      paddingTop: 2,
      paddingBottom: 2,
      // paddingLeft: '15px',
      boxShadow: '0px 0px 0px 1px #E0E0E0',
      borderRadius: '4px',
    }}
  >
    <Grid container sx={{pl: 2}}>
      <Grid item xs={3}>
        <Typography variant="subtitle2">SERVICE COMPANY</Typography>
      </Grid>

      <Grid item xs={2}>
        <Typography variant="subtitle2">CONTRACT NUMBER</Typography>
      </Grid>

      <Grid item xs={1}>
        <Box display="flex" justifyContent="center">
          <Typography variant="subtitle2">UNITS</Typography>
        </Box>
      </Grid>

      <Grid item xs={2}>
        <Box display="flex" justifyContent="center">
          <Typography variant="subtitle2">COST/YR</Typography>
        </Box>
      </Grid>

      <Grid item xs={2}>
        <Box display="flex" justifyContent="center">
          <Typography variant="subtitle2">EXPIRY DATE</Typography>
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
