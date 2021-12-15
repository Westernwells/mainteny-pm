import Grid from '@mui/material/Grid';

import Typography from '@mui/material/Typography';
import Box from '@mui/system/Box';

import OpenInNewOffOutlinedIcon from '@mui/icons-material/OpenInNewOffOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

import {getDay} from '../../utils/datetime';
import {ElevatorView} from '../../models/elevator';
import {ContractView} from '../../models/contract';

interface ContractRecord {
  contract: ContractView;
  elevators: ElevatorView[];
}

export interface Props {
  contract: ContractRecord;
}

export const ContractRow = ({contract}: Props) => (
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
          {contract.contract.serviceCompany.name}
        </Typography>
      </Grid>

      <Grid item xs={2}>
        <Typography variant="subtitle2">abc-01</Typography>
      </Grid>

      <Grid item xs={1}>
        <Typography variant="subtitle2">{contract.elevators.length}</Typography>
      </Grid>

      <Grid item xs={2}>
        <Typography variant="subtitle2">{`${contract.contract.hourlyRate}/${contract.contract.visitsNumber}`}</Typography>
      </Grid>

      <Grid item xs={2}>
        <Typography variant="subtitle2">
          {getDay(contract.contract.endTime)}
        </Typography>
      </Grid>

      <Grid item xs={2}>
        <Box display="flex">
          <OpenInNewOffOutlinedIcon
            sx={{mr: 4, color: (theme) => theme.palette.info.main}}
          />
          <FileDownloadOutlinedIcon
            sx={{color: (theme) => theme.palette.info.main}}
          />
        </Box>
      </Grid>
    </Grid>
  </Box>
);
