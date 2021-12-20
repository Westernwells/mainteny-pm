import Box from '@mui/system/Box';
import Slide from '@mui/material/Slide';
import useTheme from '@mui/material/styles/useTheme';
import {ReactComponent as Pin} from '../assets/icons/Pin.svg';

interface Props {
  lat?: number;
  lng?: number;
}

export const LocationPin = ({lat, lng}: Props) => {
  console.log(lat, lng);
  const theme = useTheme();
  return (
    <Box
      sx={{
        fill: () => theme.palette.common.white,
        stroke: () => theme.palette.divider,
        strokeWidth: 1,
      }}
    >
      <Slide direction="down" timeout={700} in unmountOnExit>
        <Pin />
      </Slide>
    </Box>
  );
};
