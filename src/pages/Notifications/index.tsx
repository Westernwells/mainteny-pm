import {useEffect, useState} from 'react';
import Typography from '@mui/material/Typography';
import useTheme from '@mui/material/styles/useTheme';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';
import {BackAction} from 'components/BackAction';
import Fade from '@mui/material/Fade';
import EngineeringIcon from '@mui/icons-material/Engineering';
import PaymentsIcon from '@mui/icons-material/Payments';
import {useUserSession} from 'hooks/reactQuery/useUserSession';
import {NotificationCard} from './NotificationCard';

export const Notifications = () => {
  const theme = useTheme();
  const [offset, setOffset] = useState(0);
  const [showFabIcon, setShowFabIcon] = useState(false);
  const {user} = useUserSession();

  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset);
    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, {passive: true});

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (offset > 20 && !showFabIcon) {
      setShowFabIcon(true);
    }

    if (offset < 20 && showFabIcon) {
      setShowFabIcon(false);
    }
  }, [offset]);

  return (
    <Box display="flex">
      <Box sx={{mb: 2, mt: 12, width: 'min(48em, 90%)', mx: 'auto'}}>
        <BackAction label="Notifications" />

        <Box>
          <Typography variant="h6" color={theme.palette.text.secondary}>
            Today(2)
          </Typography>
          <NotificationCard
            title="New invoice issued"
            description={`An invoice has been issued by ${user?.userAccount.serviceCompany.name} for the last visit. The total payable is EUR 400.00`}
            chipColor="warning"
            chipLabel="New Invoice"
            btnLabel="View Invoice"
            helperText="3 minutes ago"
            icon={<PaymentsIcon />}
          />
          <NotificationCard
            title="Technician visiting the unit"
            description="Technician Nico Roseberg has been assigned to the issue you have reported. He will be visiting the unit within the next 2 hours"
            chipColor="success"
            chipLabel="Technician Visit"
            btnLabel="Message Technician"
            helperText="2 hours ago"
            icon={<EngineeringIcon />}
          />
        </Box>

        <Box mt={3}>
          <Typography variant="h6" color={theme.palette.text.secondary}>
            Yesterday(1)
          </Typography>
          <NotificationCard
            title="Contract expiring soon"
            description="Your maintenance contract for unit 679778 (Passenger Lift) with Aufzugswarten GmbH is expiring in 40 days"
            chipColor="error"
            chipLabel="Contract Expiry"
            btnLabel="View Contract"
            helperText="1 day ago"
          />
        </Box>

        <Box mt={3}>
          <Typography variant="h6" color={theme.palette.text.secondary}>
            Earlier(4)
          </Typography>
          <NotificationCard
            title="Contract renewed successfully"
            description="Your payment has been received by Aufzugswarten GmbH and they will be maintaining unit 787767 (Centralized AC) for the next 2 years"
            chipColor="success"
            chipLabel="Contract Renewal"
            btnLabel="View Contract"
            helperText="5 days ago"
          />
          <NotificationCard
            title="New invoice issued"
            description={`An invoice has been issued by ${user?.userAccount.serviceCompany.name} for the last visit. The total payable is EUR 865.00`}
            chipColor="warning"
            chipLabel="New Invoice"
            btnLabel="View Invoice"
            helperText="8 days ago"
            icon={<PaymentsIcon />}
          />
          <NotificationCard
            title="New invoice issued"
            description={`An invoice has been issued by ${user?.userAccount.serviceCompany.name} for the last visit. The total payable is EUR 120.72`}
            chipColor="warning"
            chipLabel="New Invoice"
            btnLabel="View Invoice"
            helperText="8 days ago"
            icon={<PaymentsIcon />}
          />
          <NotificationCard
            title="Technician visiting the unit"
            description="Technician Martin William has been assigned to complete your regular elevator maintenance. He will be visiting the unit within the next 4 hours"
            chipColor="success"
            chipLabel="Technician Visit"
            btnLabel="Message Technician"
            helperText="9 days ago"
            icon={<EngineeringIcon />}
          />
        </Box>
      </Box>

      <Fade in={showFabIcon}>
        <Box
          onClick={() => {
            window.scroll({top: 0, left: 0, behavior: 'smooth'});
          }}
          sx={{
            mt: 12,
            display: 'flex',
            height: '85vh',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            position: 'fixed',
            right: '1.5em',
            top: `calc(85vh*0.9)`,
          }}>
          <Fab color="primary" disableRipple>
            <NavigationIcon />
          </Fab>
        </Box>
      </Fade>
    </Box>
  );
};
