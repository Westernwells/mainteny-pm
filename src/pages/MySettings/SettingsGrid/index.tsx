import {Box, Grid} from '@mui/material';
import React from 'react';
import {Account} from './Account';
import {DateFormat} from './DateFormat';
import {Locale} from './Locale';
import {PersonalDetails} from './PersonalDetails';

import {user} from '../dummyData';

interface Props {
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SettingsGrid = ({setDrawerOpen}: Props) => (
  <Grid
    columnSpacing={2}
    sx={{
      width: '991px',
      mx: 'auto',
      mt: '2em',
      mb: '7em',
    }}
    container
  >
    <Grid xs={7} item>
      <Box display="flex" flexDirection="column" gap={2}>
        <PersonalDetails
          personal={user.personal}
          setDrawerOpen={setDrawerOpen}
        />
        <Locale locale={user.locale} setDrawerOpen={setDrawerOpen} />
      </Box>
    </Grid>
    <Grid xs={5} item>
      <Box display="flex" flexDirection="column" gap={2}>
        <Account account={user.account} setDrawerOpen={setDrawerOpen} />
        <DateFormat
          dateFormat={user.dateFormat}
          setDrawerOpen={setDrawerOpen}
        />
      </Box>
    </Grid>
  </Grid>
);
