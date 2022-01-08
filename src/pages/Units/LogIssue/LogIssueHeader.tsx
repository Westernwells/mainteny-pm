import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import useTheme from '@mui/material/styles/useTheme';

export const LogIssueHeader = () => {
  const theme = useTheme();
  return (
    <Box
      borderRadius="20px"
      sx={{
        background: theme.palette.inputBackground.main,
        py: 3,
        px: 2,
      }}
    >
      <Typography variant="h5">Log an issue</Typography>
    </Box>
  );
};
