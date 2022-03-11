import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import useTheme from '@mui/material/styles/useTheme';

export const LogIssueHeader = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        background: theme.palette.inputBackground.main,
        py: 1,
        px: 2,
      }}>
      <Typography variant="subtitle1">Log an issue</Typography>
    </Box>
  );
};
