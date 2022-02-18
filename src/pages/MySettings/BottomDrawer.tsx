import useTheme from '@mui/material/styles/useTheme';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {Drawer} from '@mui/material';
import React from 'react';

interface Props {
  drawerOpen: boolean;
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const BottomDrawer = ({drawerOpen, setDrawerOpen}: Props) => {
  const theme = useTheme();

  return (
    <Drawer
      //   sx={{
      //     height: '87px',
      //     flexShrink: 0,
      //     '& .MuiDrawer-paper': {
      //       height: '87px',
      //       boxSizing: 'border-box',
      //       backgroundColor: 'white',
      //     },
      //   }}
      PaperProps={{
        sx: {
          background: theme.palette.primary.contrastText,
          color: theme.palette.primary.main,
          height: '87px',
        },
      }}
      variant="persistent"
      anchor="bottom"
      open={drawerOpen}
    >
      <Box
        display="flex"
        justifyContent="flex-end"
        gap={2}
        sx={{my: 'auto', px: '4em'}}
      >
        <Button
          size="small"
          variant="outlined"
          sx={{px: '3em', py: '.5em'}}
          onClick={() => setDrawerOpen(false)}
        >
          Cancel
        </Button>
        <Button size="small" sx={{px: '3em', py: '.5em'}} variant="contained">
          Submit
        </Button>
      </Box>
    </Drawer>
  );
};
