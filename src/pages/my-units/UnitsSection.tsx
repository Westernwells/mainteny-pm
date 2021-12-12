import React from 'react';
import {styled} from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/system/Box';
import {ElevatorsByAddress} from './Models';
import {getDay} from '../../utils/datetime';

export interface UnitsSectionProperty {
  elevatorsByAddress: ElevatorsByAddress;
}

const Item = styled(Paper)(({theme}) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  boxShadow: 'unset',
}));

export const UnitsSection = ({elevatorsByAddress}: UnitsSectionProperty) => (
  <Box>
    <div>{elevatorsByAddress.address.fullName}</div>
    <Grid container>
      <Grid item xs={3} />
      <Grid item xs={2}>
        <Item>LAST VISIT</Item>
      </Grid>

      <Grid item xs={2}>
        <Item>NEXT VISIT</Item>
      </Grid>

      <Grid item xs={1}>
        <Item>AVAILABILITY</Item>
      </Grid>

      <Grid item xs={2}>
        <Item>STATUS</Item>
      </Grid>

      <Grid item xs={2}>
        <Item>ACTIONS</Item>
      </Grid>
    </Grid>
    {elevatorsByAddress.elevators.map((elevatorOrder) => (
      <Grid key={elevatorOrder.elevator.id} container spacing={2} columns={12}>
        <Grid item xs={3}>
          <Item>
            <a href={`/pm/units/${elevatorOrder.elevator.id}`}>
              {elevatorOrder.elevator.model}
            </a>
          </Item>
        </Grid>
        <Grid item xs={2}>
          <Item>{elevatorOrder.elevator.lastVisitDate}</Item>
        </Grid>

        <Grid item xs={2}>
          <Item>
            {getDay(elevatorOrder.serviceOrder?.schedules[0]?.startTime)}
          </Item>
        </Grid>

        <Grid item xs={1}>
          <Item>100%</Item>
        </Grid>

        <Grid item xs={2}>
          <Item>{elevatorOrder.elevator.status}</Item>
        </Grid>

        <Grid item xs={2}>
          <Item>
            <Button>Notify</Button>
          </Item>
        </Grid>
      </Grid>
    ))}
  </Box>
);
