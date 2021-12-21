import {Box} from '@mui/system';
import React, {ReactElement} from 'react';
import {AppDrawer} from './AppDrawer';
import {AppTopBar} from './AppTopBar';

interface Props {
  children: ReactElement;
  startPageLoad: () => void;
}

export const PageLayout = ({children, startPageLoad}: Props) => (
  <Box display="flex">
    <AppTopBar />
    <AppDrawer />
    <Box sx={{flexGrow: 1}} pt={12} pl={5} pr={5}>
      {children}
    </Box>
  </Box>
);
