import Box from '@mui/material/Box';
import Language from '@mui/icons-material/Language';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import AppBar from '@mui/material/AppBar';
import {useNavigate} from 'react-router-dom';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

import AvatarImg from 'assets/images/avatar.png';
import {ReactComponent as LogoutIcon} from 'assets/icons/Logout.svg';
import {ReactComponent as Logo} from 'assets/icons/Logo.svg';
import {useAuth} from 'hooks/useAuth';

export const AppTopBar = () => {
  const navigate = useNavigate();
  const {signout} = useAuth();
  return (
    <AppBar
      sx={{
        backgroundColor: '#fff',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        boxShadow: '0px 4px 15px rgba(144, 144, 144, 0.2)',
        paddingRight: 5,
        paddingLeft: 3,
      }}
    >
      <Box display="flex" justifyContent="space-between" pt={2} pb={1}>
        <Logo width={155.22} height={32} />

        <Box justifyContent="flex-end">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box display="flex" mt={1} alignItems="center">
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
              sx={{
                marginLeft: 4,
                marginTop: 1,
                color: '#FF4B55',
                cursor: 'pointer',
              }}
              onClick={() => navigate('/notifications')}
            >
              <NotificationsNoneIcon color="primary" />
            </Badge>

            <Box ml={8} display="flex" alignItems="center">
              <Avatar alt="Bruce Wayne" src={AvatarImg} />
              <Box ml={2}>
                <Typography color="#222B45" variant="h6" gutterBottom={false}>
                  Bruce Wayne
                </Typography>

                <Button
                  variant="text"
                  sx={{
                    textTransform: 'capitalize',
                    fontSize: '12px',
                    padding: 0,
                    marginTop: -2,
                    color: '#8F9BB3',
                  }}
                >
                  Facility Manager
                </Button>
              </Box>
            </Box>
            <Box sx={{marginLeft: 6}}>
              <LogoutIcon
                style={{cursor: 'pointer'}}
                onClick={() => signout()}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </AppBar>
  );
};
