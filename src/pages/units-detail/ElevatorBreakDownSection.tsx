import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

// TODO: we do not have the model in backend yet
export const ElevatorBreakDownSection = () => (
  <Box>
    <h2>Breakdown History</h2>
    <Stack>
      <Stack direction="row" spacing={3}>
        <div>02 Dec 2021</div>
        <div>Resolved</div>
      </Stack>
      <div>Blocked door in 2nd floor</div>
    </Stack>
    <Stack>
      <Stack direction="row" spacing={3}>
        <div>02 Nov 2021</div>
        <div>Resolved</div>
      </Stack>
      <div>Controller error</div>
    </Stack>
    <Stack>
      <Stack direction="row" spacing={3}>
        <div>02 Nov 2021</div>
        <div>Resolved</div>
      </Stack>
      <div>Broken door roller</div>
    </Stack>
  </Box>
);
