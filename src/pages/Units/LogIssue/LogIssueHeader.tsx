import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import useTheme from '@mui/material/styles/useTheme';
import IconButton from '@mui/material/IconButton';
import {Close} from '@mui/icons-material';

interface Props {
  handleCancel: () => void;
}

export const LogIssueHeader = ({handleCancel}: Props) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        py: 1,
        px: 2,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <Typography variant="h5" sx={{color: theme.palette.text.primary}}>
        Log an Issue
      </Typography>
      <IconButton onClick={handleCancel}>
        <Close />
      </IconButton>
    </Box>
  );
};
