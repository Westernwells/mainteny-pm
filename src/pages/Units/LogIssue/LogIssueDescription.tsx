import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import {Box} from '@mui/system';

interface Props {
  label: string;
}

export const LogIssueDescription = ({label}: Props) => (
  <Box mb={2}>
    <Typography variant="subtitle1" mb={2}>
      {label}
    </Typography>
    <TextField multiline rows={4} sx={{width: '100%'}} />
  </Box>
);
