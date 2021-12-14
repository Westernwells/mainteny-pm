import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/system/Box';

export const MyUnitsColumnTitles = () => (
  <Box
    // display="flex"
    sx={{
      backgroundColor: '#fff',
      border: '2px solid #E4E9F2',
      paddingTop: 2,
      paddingBottom: 2,
      paddingLeft: '15px',
    }}
  >
    <Grid container sx={{pl: 2}}>
      <Grid item xs={3} />
      <Grid
        item
        container
        xs={9}
        spacing={2}
        sx={{display: 'flex', justifyContent: 'flex-end'}}
      >
        <Grid item xs={1}>
          <Typography variant="subtitle2">NUMBER</Typography>
        </Grid>

        <Grid item xs={2}>
          <Typography variant="subtitle2">LAST VISIT</Typography>
        </Grid>

        <Grid item xs={2}>
          <Typography variant="subtitle2">NEXT VISIT</Typography>
        </Grid>

        <Grid item xs={2}>
          <Typography variant="subtitle2">AVAILABILITY</Typography>
        </Grid>

        <Grid item xs={2}>
          <Typography variant="subtitle2">STATUS</Typography>
        </Grid>

        <Grid item xs={2}>
          <Typography variant="subtitle2">ACTIONS</Typography>
        </Grid>
      </Grid>
    </Grid>
  </Box>
);
