import React from 'react';
import {useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';
import Elevator from '@mui/icons-material/Elevator';
import Grid from '@mui/material/Grid';
import useTheme from '@mui/material/styles/useTheme';
import Typography from '@mui/material/Typography';
import Box from '@mui/system/Box';
import {StatusChip} from 'components/StatusChip';
import {FormikErrors} from 'formik';
import {ElevatorsByAddress} from './Models';
import {formatDate, toDate} from '../../utils/datetime';
import {ElevatorStatus, ElevatorView} from '../../models/elevator';

export interface UnitsSectionProperty {
  elevatorsByAddress: ElevatorsByAddress;
  setDrawerOpen: (state: boolean) => void;
  setField: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => Promise<void> | Promise<FormikErrors<any>>;
}

export const UnitSection = ({
  elevatorsByAddress,
  setDrawerOpen,
  setField,
}: UnitsSectionProperty) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleClick = (elevator: ElevatorView) => {
    setField('elevator', elevator);
    setDrawerOpen(true);
  };

  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        border: '1px solid #E4E9F2',
        paddingTop: 0.5,
        paddingBottom: 0.5,
        marginTop: 1,
        borderRadius: '4px 4px 0px 0px',
      }}
    >
      <Box pl={3}>
        <Typography variant="largeBtnText" mt={1} color="textSecondary">
          {elevatorsByAddress.address.fullName}
        </Typography>
      </Box>

      {elevatorsByAddress.elevators.map((elevatorOrder) => (
        <Grid
          key={elevatorOrder.elevator.id}
          container
          sx={{
            paddingTop: 0.5,
            paddingBottom: 0.5,
            paddingLeft: 3,
            '&:hover': {background: 'rgba(0, 209, 255, 0.08)'},
            minHeight: '3rem',
            alignItems: 'center',
          }}
        >
          <Grid
            item
            xs={3}
            sx={{cursor: 'pointer'}}
            onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
              e.preventDefault();
              navigate(`/units/details/${elevatorOrder.elevator.id}`);
            }}
          >
            <Box display="flex" alignItems="center">
              <Elevator style={{marginRight: '10px'}} />
              <Typography variant="subtitle1">
                {elevatorOrder.elevator.model}
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            container
            xs={9}
            spacing={2}
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <Grid item xs={2}>
              <Typography variant="largeBtnText">
                {elevatorOrder.elevator.lastVisitDate || 'N/A'}
              </Typography>
            </Grid>

            <Grid item xs={2}>
              <Typography variant="largeBtnText">
                {' '}
                {(elevatorOrder.serviceOrder &&
                  formatDate(
                    toDate(elevatorOrder.serviceOrder.schedules[0].startTime),
                  )) ||
                  ''}
              </Typography>
            </Grid>

            <Grid item xs={2}>
              <Typography
                variant="largeBtnText"
                color={
                  elevatorOrder.elevator.availability < 100
                    ? 'textWarning'
                    : 'textSuccess'
                }
              >
                <Box display="flex" justifyContent="center">
                  {elevatorOrder.elevator.availability}%
                </Box>
              </Typography>
            </Grid>

            <Grid item xs={2}>
              <Box display="flex" justifyContent="center">
                <StatusChip
                  label={elevatorOrder.elevator.status}
                  color={
                    elevatorOrder.elevator.status === ElevatorStatus.RUNNING
                      ? 'success'
                      : 'error'
                  }
                />
              </Box>
            </Grid>

            <Grid item xs={2}>
              <Box display="flex" justifyContent="center">
                <Button
                  variant="outlined"
                  color="warning"
                  sx={{
                    background: theme.palette.warning.outlinedHoverBg,
                    px: 3,
                    border: 'none',
                  }}
                  onClick={() => handleClick(elevatorOrder.elevator)}
                >
                  <Typography
                    variant="smallBtnText"
                    sx={{textTransform: 'capitalize'}}
                  >
                    {' '}
                    Log issue{' '}
                  </Typography>
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Box>
  );
};
