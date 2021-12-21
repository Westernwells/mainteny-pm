import Grid from '@mui/material/Grid';

import Typography from '@mui/material/Typography';
import Box from '@mui/system/Box';
import useTheme from '@mui/material/styles/useTheme';
import * as _ from 'lodash';
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
  index: number; // to mock the contract number
}

export const ContractRow = ({contract, index}: Props) => {
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
            {contract.contract.serviceCompany.name}
          </Typography>
        </Grid>

        <Grid item xs={2}>
          <Typography variant="subtitle2">
            CNT000{_.padStart(`${120 + index + 1}`, 3, '0')}
          </Typography>
        </Grid>

        <Grid item xs={1}>
          <Box display="flex" justifyContent="center">
            <Typography variant="subtitle2">
              {contract.elevators.length}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={2}>
          <Box display="flex" justifyContent="center">
            <Typography variant="subtitle2">{`1200EUR/${contract.contract.visitsNumber}`}</Typography>
          </Box>
        </Grid>

        <Grid item xs={2}>
          <Box display="flex" justifyContent="center">
            <Typography variant="subtitle2">
              {getDay(contract.contract.endTime)}
            </Typography>
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
