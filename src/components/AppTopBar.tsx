import Box from '@mui/material/Box';
import Language from '@mui/icons-material/Language';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import AppBar from '@mui/material/AppBar';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AvatarImg from '../assets/images/avatar.png';

import {ReactComponent as Logo} from '../assets/icons/Logo.svg';

export const AppTopBar = () => (
  <AppBar
    sx={{
      backgroundColor: '#fff',
      zIndex: (theme) => theme.zIndex.drawer + 1,
      boxShadow: 0,
      paddingRight: 5,
      paddingLeft: 3,
    }}
  >
    <Box display="flex" justifyContent="space-between" pt={2} pb={1}>
      <Logo width={155.22} height={32} />

      <Box justifyContent="flex-end">
        <Box display="flex" justifyContent="space-between">
          <Box mt={1}>
            <Language sx={{color: '#231F20'}} />
            <Typography
              variant="body2"
              color="#8F9BB3"
              fontSize={12}
              fontWeight={500}
              letterSpacing={0.14}
            >
              ENG
            </Typography>
          </Box>
          <Badge
            badgeContent={1}
            overlap="circular"
            color="error"
            sx={{marginLeft: 4, marginTop: 1, color: '#FF4B55'}}
          >
            <NotificationsNoneIcon color="primary" />
          </Badge>

          <Box ml={8} display="flex">
            <Avatar alt="Bruce Wayne" src={AvatarImg} />
            <Box ml={2}>
              <Typography color="#222B45" variant="h6" gutterBottom={false}>
                Bruce Wayne
              </Typography>

              <Button
                variant="text"
                sx={{
                  textTransform: 'capitalize',
                  padding: 0,
                  marginTop: -2,
                  color: '#8F9BB3',
                }}
              >
                Facility Manager
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  </AppBar>
);
