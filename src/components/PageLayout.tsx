import {Box} from '@mui/system';
import React, {ReactElement} from 'react';
import useTheme from '@mui/material/styles/useTheme';
import {AppDrawer} from './AppDrawer';
import {AppTopBar} from './AppTopBar';

interface Props {
  children: ReactElement;
  excludeSidebar?: boolean;
  excludeDefaultSpacing?: boolean;
  overflowY?: boolean;
}

export const PageLayout = ({
  children,
  excludeSidebar,
  excludeDefaultSpacing,
  overflowY,
}: Props) => {
  const theme = useTheme();

  return (
    <Box
      maxWidth="100%"
      display="flex"
      height="100vh"
      sx={{overflowY: overflowY ? 'scroll' : 'hidden'}}
    >
      <AppTopBar />
      {!excludeSidebar ? (
        <Box sx={{maxWidth: '20%'}}>
          <AppDrawer />
        </Box>
      ) : null}
      <Box
        sx={{
          flexGrow: 1,
          pt: !excludeDefaultSpacing ? 12 : null,
          px: !excludeDefaultSpacing ? 5 : null,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
