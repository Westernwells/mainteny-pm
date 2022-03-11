import React, {ReactNode} from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';

interface Props {
  children: ReactNode;
  label: string;
}

export const AvailabilityFilterField = ({children, label}: Props) => {
  const personName = React.useRef<string[]>([]).current;

  return (
    <FormControl sx={{m: 1, minWidth: 220}}>
      <InputLabel id="demo-simple-select-helper-label">{label}</InputLabel>
      <Select
        labelId="demo-multiple-name-label"
        id="demo-multiple-name"
        multiple
        value={personName}
      >
        <Box
          px={3}
          py={3}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="caption" mb={10}>
            Info: There are 20 elevators with availability less than 40%
          </Typography>
          {children}
        </Box>
      </Select>
    </FormControl>
  );
};
