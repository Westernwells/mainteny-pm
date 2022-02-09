import Typography from '@mui/material/Typography';
import useTheme from '@mui/material/styles/useTheme';
import Box from '@mui/material/Box';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {BackAction} from 'components/BackAction';
import {useNavigate} from 'react-router-dom';
import {NotificationCard} from './NotificationCard';

export const Notifications = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <Box sx={{mb: 2, mt: 12, px: 45}}>
      <BackAction label="Notifications" />

      <Box>
        <Typography variant="h6" color={theme.palette.text.secondary}>
          Today(2)
        </Typography>
        <NotificationCard />
        <NotificationCard />
      </Box>

      <Box mt={3}>
        <Typography variant="h6" color={theme.palette.text.secondary}>
          Yesterday(2)
        </Typography>
        <NotificationCard />
        <NotificationCard />
      </Box>
    </Box>
  );
};
