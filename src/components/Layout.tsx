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
    <Box sx={{background: '#F2F6F8', flexGrow: 1}} pt={15} pl={5}>
      {children}
    </Box>
  </Box>
);
