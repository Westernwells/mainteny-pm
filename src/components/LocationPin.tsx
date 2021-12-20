import Box from '@mui/system/Box';
import Slide from '@mui/material/Slide';
import Typography from '@mui/material/Typography';
import {useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import useTheme from '@mui/material/styles/useTheme';
import {ReactComponent as Pin} from '../assets/icons/Pin.svg';
import {Location} from '../models/misc';

interface Props {
  lat?: number;
  lng?: number;
  model: string;
  number: string;
  id: string;
  onPinClick: () => void;
  selectedLocation?: Location;
}

export const LocationPin = ({
  lat,
  lng,
  onPinClick,
  selectedLocation,
  model,
  number,
  id,
}: Props) => {
  console.log(lat, lng);
  const theme = useTheme();
  const navigate = useNavigate();
  const renderTooltipDetail = () => (
    <Box display="flex" flexDirection="column">
      <Typography variant="caption">Model: {model}</Typography>
      <Typography variant="caption">Number: {number}</Typography>
      <Button
        variant="outlined"
        sx={{color: '#fff'}}
        size="small"
        onClick={() => navigate(`/units/${id}`)}
      >
        More details
      </Button>
    </Box>
  );
  return (
    <Box
      onClick={onPinClick}
      sx={{
        fill: () => theme.palette.common.white,
        stroke: () => theme.palette.divider,
        strokeWidth: 1,
      }}
    >
      <Slide direction="down" timeout={700} in unmountOnExit>
        <Box>
          {selectedLocation?.longitude === lng ? (
            <Tooltip
              componentsProps={{
                tooltip: {
                  sx: {
                    bgcolor: 'common.black',
                    '& .MuiTooltip-arrow': {
                      color: 'common.black',
                    },
                  },
                },
              }}
              title={renderTooltipDetail()}
              arrow
              placement="top"
            >
              <Pin />
            </Tooltip>
          ) : (
            <Pin />
          )}
        </Box>
      </Slide>
    </Box>
  );
};
