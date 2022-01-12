import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import useTheme from '@mui/material/styles/useTheme';
import {ServiceOrderStatus, ServiceOrderView} from 'models/service-order';

interface Props {
  selectedIssueHistory: ServiceOrderView;
}

const unitInfoFields = ['Units', 'Location', 'Capacity'];

export const UnitInfo = ({selectedIssueHistory}: Props) => {
  const theme = useTheme();

  const renderUnitsFieldValue = (field: string) => {
    switch (field) {
      case 'Units':
        return (
          <Typography variant="largeBtnText" mr={2}>
            {selectedIssueHistory?.elevator.model}
          </Typography>
        );

      case 'Location':
        return (
          <Typography variant="largeBtnText" mr={2}>
            {selectedIssueHistory?.elevator.address.fullName}
          </Typography>
        );

      case 'Capacity':
        return (
          <Typography variant="largeBtnText" mr={2}>
            {selectedIssueHistory?.elevator.capacity}
          </Typography>
        );
      default:
        return null;
    }
  };
  return (
    <>
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
          Unit Information
        </Typography>
      </Box>

      <Box width="30vw" ml={15} mt={1}>
        {unitInfoFields.map((field, index) => (
          <Box key={`${field}-units`} display="flex">
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
              {renderUnitsFieldValue(field)}
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
};
