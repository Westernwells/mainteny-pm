import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

interface Props {
  handleChange: (e: Event, value: number | number[]) => void;
  value: number[];
}

export const RangeSlider = ({value, handleChange}: Props) => (
  <Box sx={{width: 300}}>
    <Slider
      value={value}
      onChange={handleChange}
      valueLabelDisplay="on"
      valueLabelFormat={(x) => `${x}%`}
    />
  </Box>
);
