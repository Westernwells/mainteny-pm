import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import useTheme from '@mui/material/styles/useTheme';

export const LogIssueHeader = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        py: 1,
        px: 2,
      }}>
      <Typography variant="h5" sx={{color: theme.palette.text.primary}}>
        Log an Issue
      </Typography>
    </Box>
  );
};
