import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import useTheme from '@mui/material/styles/useTheme';
import {ServiceOrderStatus, ServiceOrderView} from 'models/service-order';

interface Props {
  selectedIssueHistory: ServiceOrderView;
}

const issueInfoFields = [
  'Issue No',
  'Created Date',
  'Created By',
  'Preferred Time',
  'Status',
  'Description',
];

export const IssueInfo = ({selectedIssueHistory}: Props) => {
  const theme = useTheme();

  const renderIssueInfoFieldValue = (field: string) => {
    switch (field) {
      case 'Issue No':
        return (
          <Typography variant="largeBtnText" mr={2}>
            {selectedIssueHistory?.number}
          </Typography>
        );
      case 'Created Date':
        return (
          <Typography variant="largeBtnText" mr={2}>
            {selectedIssueHistory?.meta.createdAt}
          </Typography>
        );
      case 'Created By':
        return (
          <Typography variant="largeBtnText" mr={2}>
            Bruce Wayne
          </Typography>
        );
      case 'Preferred Time':
        return (
          <Typography variant="largeBtnText" mr={2}>
            {selectedIssueHistory?.expectedVisitDate}
          </Typography>
        );
      case 'Status':
        return (
          <Typography variant="largeBtnText" mr={2}>
            {selectedIssueHistory?.status === ServiceOrderStatus.COMPLETED
              ? 'Resolved'
              : 'Pending'}
          </Typography>
        );

      case 'Description':
        return (
          <Typography variant="largeBtnText" mr={2}>
            {selectedIssueHistory?.description}
          </Typography>
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
          Issue Information
        </Typography>
      </Box>

      <Box width="30vw" ml={15}>
        {issueInfoFields.map((field) => (
          <Box key={`${field}-issue`} display="flex">
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
            <Box py={1}>{renderIssueInfoFieldValue(field)}</Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
