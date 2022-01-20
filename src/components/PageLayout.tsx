import {Box} from '@mui/system';
import React, {ReactElement} from 'react';
import {AppDrawer} from './AppDrawer';
import {AppTopBar} from './AppTopBar';

interface Props {
  children: ReactElement;
  excludeSidebar?: boolean;
  excludeDefaultSpacing?: boolean;
}

export const PageLayout = ({
  children,
  excludeSidebar,
  excludeDefaultSpacing,
}: Props) => (
  <Box display="flex" maxWidth="100%">
    <AppTopBar />
    {!excludeSidebar ? (
      <Box sx={{maxWidth: '20%'}}>
        <AppDrawer />
      </Box>
    ) : null}
    <Box
      sx={{
        // maxWidth: '100%',
        flexGrow: 1,
        pt: !excludeDefaultSpacing ? 12 : null,
        px: !excludeDefaultSpacing ? 5 : null,
      }}
    >
      {children}
    </Box>
  </Box>
);
