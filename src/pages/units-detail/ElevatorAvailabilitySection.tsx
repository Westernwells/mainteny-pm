// TODO: we do not have the model in backend yet
import React from 'react';
import {Box, Button, Stack} from '@mui/material';

export const ElevatorAvailabilitySection = () => (
  <Box>
    <Stack direction="row" spacing={3}>
      <Button>Week</Button>
      <Button>Month</Button>
      <Button>Year</Button>
    </Stack>
    <Stack>
      <div>
        <div>98%</div>
        <div>AVAILABILITY</div>
      </div>
      <div>
        <div>17:21</div>
        <div>HRS OF RUN TIME</div>
      </div>
      <div>this week (Nov) 2021</div>
    </Stack>
  </Box>
);
