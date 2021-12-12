import React from 'react';
import {Box} from '@mui/system';
import {Stack} from '@mui/material';
import {Elevator} from '../../models/elevator';

export interface ElevatorBasicSectionProp {
  elevator: Elevator;
}

export const ElevatorBasicSection = ({elevator}: ElevatorBasicSectionProp) => (
  <Box>
    <Stack spacing={1}>
      <div>
        <h2>{elevator.model}</h2>
      </div>
      <div>{elevator.address.fullName}</div>
      <div>
        {/* TODO: add property manager to elevator */}
        <div>FACILITY MANAGER</div>
        <div>George Cooper</div>
      </div>
      <Stack direction="row" spacing={3}>
        <div>
          <div>Stops</div>
          <div>10</div>
        </div>
        <div>
          <div>Number</div>
          <div>{elevator.number}</div>
        </div>
        <div>
          <div>Capacity</div>
          <div>{elevator.capacity}</div>
        </div>
      </Stack>
    </Stack>
  </Box>
);
