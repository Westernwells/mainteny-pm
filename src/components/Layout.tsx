import {Box} from '@mui/system';
import React, {ReactElement} from 'react';
import {AppDrawer} from './AppDrawer';
import {AppTopBar} from './AppTopBar';

interface Props {
  children: ReactElement;
  excludeSidebar?: boolean;
}

export const PageLayout = ({children, excludeSidebar}: Props) => (
  <Box display="flex">
    <AppTopBar />
    {!excludeSidebar ? <AppDrawer /> : null}
    <Box sx={{flexGrow: 1}} pt={12} pl={5} pr={5}>
      {children}
    </Box>
  </Box>
);
