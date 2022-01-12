import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import useTheme from '@mui/material/styles/useTheme';

const ServiceDone = () => {
  const theme = useTheme();
  return (
    <Box>
      <Box>
        <Typography
          variant="h6"
          color="primary"
          sx={{
            background: theme.palette.inputBackground.main,
            mt: 2,
            pt: 3,
            pl: 2,
            py: 2,
          }}
        >
          What was Done
        </Typography>
      </Box>

      <Box pl={2} py={4}>
        <Typography variant="subtitle1">
          Checked the inner shaft of the elevator engine door. The ends have
          broken loose
        </Typography>
      </Box>
    </Box>
  );
};

export default ServiceDone;
