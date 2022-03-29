import Box from '@mui/material/Box';
import {ReactNode} from 'react';

interface Props {
  children: ReactNode;
  containerStyles?: {[key: string]: string | number | undefined};
  handleClick?: () => void;
}

export const CustomCard = ({children, containerStyles, handleClick}: Props) => (
  <Box
    onClick={() => handleClick && handleClick()}
    sx={{
      boxShadow: 'none',
      padding: '0px 0px 24px',
      border: '1px solid #E0E0E0',
      borderRadius: '8px',
      ...containerStyles,
    }}>
    {children}
  </Box>
);
