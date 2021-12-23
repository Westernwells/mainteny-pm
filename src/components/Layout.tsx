import {Box} from '@mui/system';
import React, {ReactElement} from 'react';
import {AppDrawer} from './AppDrawer';
import {AppTopBar} from './AppTopBar';

interface Props {
  children: ReactElement;
}

export const PageLayout = ({children}: Props) => (
  <Box display="flex">
    <AppTopBar />
    <AppDrawer />
    <Box sx={{flexGrow: 1}} pt={12} pl={5} pr={5}>
      {children}
    </Box>
  </Box>
);
