import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import useTheme from '@mui/material/styles/useTheme';
import Divider from '@mui/material/Divider';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import * as _ from 'lodash';
import {ReactComponent as Elevation} from '../../assets/icons/Elevation.svg';

const breakdownHistory = ['item', 'item', 'item'];

// TODO: we do not have the model in backend yet
export const ElevatorBreakDownSection = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        background: '#fff',
        borderRadius: '8px',
        height: 650,
        pt: 2,
        px: '20px',
      }}
      pt={2}
      pb={3}
      px={2}
    >
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h6">
          Breakdown History ({breakdownHistory.length})
        </Typography>
        <Elevation />
      </Box>

      <Box pt={4} height="84%" sx={{overflowY: 'scroll'}}>
        {breakdownHistory.map((history, index) => (
          <Box
            key={index.toString()}
            sx={{
              background: '#F7F9FC',
              borderRadius: '4px',
              py: 2,
              px: 3,
              mt: 4,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Typography variant="h4" mr={3}>
                02 Nov 2021
              </Typography>
              <Box mt={1} display="flex">
                <Typography variant="largeBtnText">Resolved</Typography>
                <CheckCircleIcon color="success" />
              </Box>
            </Box>
            <Divider sx={{mt: 1}} />
            <Typography pb={3} pt={1}>
              Blocked door in 2nd floor
            </Typography>
          </Box>
        ))}
      </Box>
      <Typography
        variant="h6"
        py={2}
        textAlign="center"
        color={theme.palette.info.main}
      >
        More...
      </Typography>
    </Box>
  );
};
