import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import useTheme from '@mui/material/styles/useTheme';

const fields = ['Technician', 'Cost', 'Duration'];

export const AdditionalDetails = () => {
  const theme = useTheme();

  const renderFieldValue = (field: string) => {
    switch (field) {
      case 'Technician':
        return (
          <Typography variant="largeBtnText" mr={2}>
            Chris Anderson
          </Typography>
        );

      case 'Duration':
        return (
          <Typography variant="largeBtnText" mr={2}>
            45 min
          </Typography>
        );

      case 'Cost':
        return (
          <>
            <Typography variant="largeBtnText" mr={2}>
              400 EUR
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{color: theme.palette.info.main}}
            >
              View Invoice
            </Typography>
          </>
        );

      default:
        return null;
    }
  };
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
          Additional Details
        </Typography>
      </Box>

      <Box width="30vw" ml={15} mt={3}>
        {fields.map((field) => (
          <Box display="flex">
            <Typography
              variant="largeBtnText"
              mr={1}
              pr={10}
              width="30%"
              py={1}
              color="textSecondary"
            >
              {field}
            </Typography>
            <Box py={1} display={field === 'Cost' ? 'flex' : 'block'}>
              {renderFieldValue(field)}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
