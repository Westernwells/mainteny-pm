import {useState} from 'react';
import Box from '@mui/material/Box';
import {BackAction} from 'components/BackAction';
import {BottomDrawer} from './BottomDrawer';
import {SettingsGrid} from './SettingsGrid';

export const MySettings = () => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  return (
    <Box sx={{mb: 2, mt: 12, px: 4}}>
      <BackAction label="My Settings" />
      <SettingsGrid setDrawerOpen={setDrawerOpen} />
      <BottomDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
    </Box>
  );
};
