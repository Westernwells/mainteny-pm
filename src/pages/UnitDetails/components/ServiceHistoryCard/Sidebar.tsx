import {Box} from '@mui/system';
import {RadioButtonChecked, CheckCircle} from '@mui/icons-material';
import useTheme from '@mui/material/styles/useTheme';

interface SidebarProps {
  isCompleted: boolean;
}

const Sidebar = ({isCompleted}: SidebarProps) => {
  const theme = useTheme();
  const Icon = isCompleted ? CheckCircle : RadioButtonChecked;
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
          color: isCompleted
            ? theme.palette.text.disabled
            : theme.palette.secondary.main,
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
