import {Theme, CSSObject} from '@mui/material/styles';
import styled from '@mui/material/styles/styled';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Elevator from '@mui/icons-material/Elevator';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {useLocation, useNavigate} from 'react-router-dom';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import React, {useState} from 'react';

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
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const drawerList = [
    {
      text: 'Units',
      icon: <Elevator sx={{color: '#fff'}} />,
      path: 'my-units',
      onClick: (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
      ) => {
        e.preventDefault();
        setSelectedIndex(index);
        navigate('/my-units');
      },
    },
    {
      text: 'Detsails',
      icon: <Elevator sx={{color: '#fff'}} />,
      path: 'my-units',
      onClick: (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
      ) => {
        e.preventDefault();
        setSelectedIndex(index);
        // navigate('/my-');
      },
    },
  ];

  return (
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
        <List>
          {drawerList.map(({text, icon, onClick}, index) => (
            <ListItemButton
              onClick={(e) => onClick(e, index)}
              selected={selectedIndex === index}
              style={{
                borderTopLeftRadius: '6px',
                borderBottomLeftRadius: '6px',
                paddingTop: 15,
                paddingBottom: 15,
                ...(index !== selectedIndex
                  ? {
                      borderLeft: '8px',
                      borderLeftStyle: 'solid',
                      borderColor: 'rgba(9, 83, 105, 0)',
                    }
                  : null),
                ...(open
                  ? {
                      marginLeft: '5px',
                      marginRight: '5px',
                    }
                  : null),
              }}
              sx={{
                transition: (theme) =>
                  theme.transitions.create('margin', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                  }),
              }}
              key={text}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

// {
//   width: '100%',
//   // borderLeft: '8px solid #222B45',
//   boxSizing: 'border-box',

//   // marginBottom: 1,
//   // paddingTop: 2,
//   // paddingBottom: 2,
//   // transition: (theme: Theme) =>
//   //   theme.transitions.create('margin', {
//   //     easing: theme.transitions.easing.sharp,
//   //     duration: theme.transitions.duration.leavingScreen,
//   //   }),
// }
