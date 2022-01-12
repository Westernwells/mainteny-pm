import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {ReactComponent as EmptyScreenIcon} from 'assets/icons/EmptySection.svg';

interface Props {
  label: string;
}

export const EmptyIllustration = ({label}: Props) => (
  <Box display="flex" flexDirection="column" alignItems="center" mt={3}>
    <EmptyScreenIcon />
    <Typography variant="h5" mt={9}>
      {label}
    </Typography>
  </Box>
);
