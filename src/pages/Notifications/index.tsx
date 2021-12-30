import Typography from '@mui/material/Typography';
import useTheme from '@mui/material/styles/useTheme';
import Box from '@mui/material/Box';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {useNavigate} from 'react-router-dom';
import {NotificationCard} from './NotificationCard';

export const Notifications = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <Box>
      <Box display="flex" sx={{mb: 2, ml: 4}}>
        <Box
          mt={1}
          mr={2}
          sx={{cursor: 'pointer'}}
          onClick={() => navigate(-1)}
        >
          <ArrowBackIosNewIcon sx={{color: theme.palette.action.active}} />
        </Box>
        <Typography variant="h4">Notifications</Typography>
      </Box>

      <Box>
        <Typography
          variant="h6"
          color={theme.palette.text.secondary}
          sx={{pl: 16}}
        >
          Today(2)
        </Typography>
        <NotificationCard />
        <NotificationCard />
      </Box>

      <Box mt={3}>
        <Typography
          variant="h6"
          color={theme.palette.text.secondary}
          sx={{pl: 16}}
        >
          Yesterday(2)
        </Typography>
        <NotificationCard />
        <NotificationCard />
      </Box>
    </Box>
  );
};
