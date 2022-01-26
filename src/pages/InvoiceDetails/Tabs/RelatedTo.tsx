import useTheme from '@mui/material/styles/useTheme';
import Box from '@mui/material/Box';
import {IssueCard} from 'pages/UnitDetails/Tabs/IssueHistory/IssueCard';
import Button from '@mui/material/Button';
import {OpenInNew} from '@mui/icons-material';
import {ServiceOrderView} from 'models/service-order';

interface RelatedToProps {
  serviceOrder: ServiceOrderView;
}

export const RelatedTo = ({serviceOrder}: RelatedToProps) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        p: 8,
        background: theme.palette.inputBackground.main,
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      }}
    >
      <IssueCard history={serviceOrder} />
      <Box
        sx={{display: 'flex', alignItems: 'flex-end', flexDirection: 'column'}}
      >
        <Button variant="contained" size="large" endIcon={<OpenInNew />}>
          More Details
        </Button>
      </Box>
    </Box>
  );
};
