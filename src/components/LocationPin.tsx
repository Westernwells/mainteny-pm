import React from 'react';
import Box from '@mui/system/Box';
import {ReactComponent as Pin} from '../assets/icons/Pin.svg';

interface Props {
  lat?: number;
  lng?: number;
}

export const LocationPin = ({lat, lng}: Props) => {
  console.log(lat, lng);
  return (
    <Box>
      <Pin />
    </Box>
  );
};
