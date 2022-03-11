import React from 'react';
import useTheme from '@mui/material/styles/useTheme';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

interface Props {
  drawerOpen: boolean;
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  resetForm: () => void;
}

export const BottomDrawer = ({drawerOpen, setDrawerOpen, resetForm}: Props) => {
  const theme = useTheme();
  const handleReset = () => {
    resetForm();
    setDrawerOpen(false);
  };

  return (
    <Drawer
      PaperProps={{
        sx: {
          background: theme.palette.primary.contrastText,
          color: theme.palette.primary.main,
          height: '87px',
        },
      }}
      variant="persistent"
      anchor="bottom"
      open={drawerOpen}>
      <Box
        display="flex"
        justifyContent="flex-end"
        gap={2}
        sx={{my: 'auto', px: '4em'}}>
        <Button
          size="small"
          variant="outlined"
          sx={{px: '3em', py: '.5em'}}
          onClick={handleReset}
          type="reset">
          Cancel
        </Button>
        <Button
          size="small"
          sx={{px: '3em', py: '.5em'}}
          variant="contained"
          type="submit">
          Submit
        </Button>
      </Box>
    </Drawer>
  );
};
