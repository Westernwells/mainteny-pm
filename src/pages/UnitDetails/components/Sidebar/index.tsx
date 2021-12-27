import Box from '@mui/system/Box';
import RadioButtonChecked from '@mui/icons-material/RadioButtonChecked';
import CheckCircle from '@mui/icons-material/CheckCircle';
import useTheme from '@mui/material/styles/useTheme';

interface SidebarProps {
  active?: boolean;
}

const Sidebar = ({active}: SidebarProps) => {
  const theme = useTheme();
  const Icon = active ? RadioButtonChecked : CheckCircle;
  return (
    <Box>
      <Box
        sx={{
          borderLeft: '1px dashed #9E9E9E',
          height: 60,
          ml: '11px',
          zIndex: 1000,
        }}
      />
      <Icon
        sx={{
          mr: 1,
          color: active
            ? theme.palette.secondary.main
            : theme.palette.text.disabled,
        }}
      />
      <Box
        sx={{
          borderLeft: '1px dashed #9E9E9E',
          height: '100%',
          ml: '11px',
        }}
      />
    </Box>
  );
};

export {Sidebar};
