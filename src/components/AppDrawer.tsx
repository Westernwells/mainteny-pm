import * as React from 'react';
import {Theme, CSSObject} from '@mui/material/styles';
import styled from '@mui/material/styles/styled';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {useLocation} from 'react-router-dom';
import Elevator from '@mui/icons-material/Elevator';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({theme}) => ({
  display: 'flex',
  // alignItems: 'center',
  justifyContent: 'flex-end',
  // padding: theme.spacing(0, 1),
  marginLeft: theme.spacing(4),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export const AppDrawer = () => {
  const [open, setOpen] = React.useState(false);
  const location = useLocation();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return location.pathname !== '/' && location.pathname !== '/login' ? (
    <Box sx={{display: 'flex'}}>
      <Drawer
        variant="permanent"
        open={open}
        PaperProps={{
          sx: {
            paddingTop: 10,
            color: '#fff',
          },
        }}
      >
        <DrawerHeader>
          {open ? (
            <>
              <IconButton onClick={handleDrawerClose} edge="start" sx={{}}>
                <ArrowBackIosNewIcon />
              </IconButton>
              <IconButton
                aria-label="open drawer"
                onClick={handleDrawerClose}
                edge="start"
                sx={{}}
              >
                <MenuIcon />
              </IconButton>
            </>
          ) : (
            <>
              <IconButton
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{}}
              >
                <MenuIcon />
              </IconButton>

              <IconButton onClick={handleDrawerOpen} edge="start" sx={{}}>
                <ArrowForwardIos />
              </IconButton>
            </>
          )}
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <Elevator sx={{color: '#fff'}} />
            </ListItemIcon>
            <ListItemText primary="Units" />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  ) : null;
};
