import React from 'react';
import {useNavigate} from 'react-router-dom';
import Elevator from '@mui/icons-material/Elevator';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import useTheme from '@mui/material/styles/useTheme';
import Typography from '@mui/material/Typography';
import Box from '@mui/system/Box';
import {StatusChip} from 'components/StatusChip';
import {ElevatorStatus, ElevatorView} from '../../models/elevator';
import {UnitsSectionProperty} from './Models';

export const UnitSection = ({
  elevators,
  address,
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
      }}>
      <Box pl={3}>
        <Typography variant="largeBtnText" mt={1} color="textSecondary">
          {address}
        </Typography>
      </Box>

      {elevators.map((elevator) => (
        <Grid
          key={elevator.id}
          container
          sx={{
            paddingTop: 0.5,
            paddingBottom: 0.5,
            paddingLeft: 3,
            '&:hover': {background: 'rgba(0, 209, 255, 0.08)'},
            minHeight: '3rem',
            alignItems: 'center',
          }}>
          <Grid
            item
            xs={3}
            sx={{cursor: 'pointer'}}
            onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
              e.preventDefault();
              navigate(`details/${elevator.id}`);
            }}>
            <Box display="flex" alignItems="center">
              <Elevator style={{marginRight: '10px'}} />
              <Typography variant="subtitle1">{elevator.model}</Typography>
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
            }}>
            <Grid item xs={3}>
              <Typography variant="largeBtnText">
                {elevator.lastVisitDate || 'N/A'}
              </Typography>
            </Grid>

            <Grid item xs={3}>
              <Typography variant="largeBtnText">
                {elevator.nextVisitDate || ''}
              </Typography>
            </Grid>

            <Grid item xs={3}>
              <Box display="flex" justifyContent="center">
                <StatusChip
                  label={elevator.status}
                  color={
                    elevator.status === ElevatorStatus.RUNNING
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
                  onClick={() => handleClick(elevator)}>
                  <Typography
                    variant="smallBtnText"
                    sx={{textTransform: 'capitalize'}}>
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
