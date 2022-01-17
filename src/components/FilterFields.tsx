import {ReactNode} from 'react';
import Box from '@mui/material/Box';

interface Props {
  children: ReactNode;
  containerStyle?: {[key: string]: string | number};
}

export const FilterFields = ({children, containerStyle}: Props) => (
  <Box display="flex" sx={{...containerStyle}}>
    {children}
  </Box>
);
