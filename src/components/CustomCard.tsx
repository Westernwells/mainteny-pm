import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useTheme from '@mui/material/styles/useTheme';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import GridOffIcon from '@mui/icons-material/GridOff';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import Divider from '@mui/material/Divider';
import {ReactChild, ReactNode} from 'react';

interface Props {
  children: ReactNode;
  containerStyles?: {[key: string]: string | number | undefined};
  handleClick?: () => void;
}

export const CustomCard = ({children, containerStyles, handleClick}: Props) => {
  const theme = useTheme();
  return (
    <Box
      onClick={() => handleClick && handleClick()}
      sx={{
        boxShadow: 'none',
        padding: '0px 0px 24px',
        border: '1px solid #E0E0E0',
        borderRadius: '8px',
        ...containerStyles,
      }}
    >
      {children}
    </Box>
  );
};
