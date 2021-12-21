import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useTheme from '@mui/material/styles/useTheme';
import Divider from '@mui/material/Divider';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {ReactComponent as Elevation} from '../../assets/icons/Elevation.svg';
import {ReactComponent as ArrowDownward} from '../../assets/icons/ArrowDownward.svg';
import {breakDownHistoryResource} from '../../hooks/useBreakdownHistory';
import {getDay} from '../../utils/datetime';

const breakdownHistory = breakDownHistoryResource.data;

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

      <Box pt={2} height="84%" sx={{overflowY: 'scroll'}}>
        {breakdownHistory.map((history) => (
          <Box
            key={history.id}
            sx={{
              background: '#F7F9FC',
              borderRadius: '4px',
              py: 2,
              px: 3,
              mb: 2,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography variant="h5" mr={3}>
                {getDay(history.datetime)}
              </Typography>
              <Box display="flex" alignItems="center">
                <ArrowDownward />
                <Typography variant="largeBtnText">
                  {history.durationInMinutes / 60}h
                </Typography>
                <Typography variant="body2" color="#8F9BB3">
                  &nbsp;downtime
                </Typography>
              </Box>
              <Box mt={1} display="flex">
                <Typography variant="largeBtnText">{history.status}</Typography>
                <CheckCircleIcon color="success" />
              </Box>
            </Box>
            <Divider sx={{mt: 1}} />
            <Typography pb={3} pt={1}>
              {history.description}
            </Typography>
          </Box>
        ))}
        <Typography
          variant="h6"
          py={2}
          textAlign="center"
          color={theme.palette.info.main}
        >
          More...
        </Typography>
      </Box>
    </Box>
  );
};
