import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Box from '@mui/system/Box';

interface InvoiceCardItemProps {
  heading: string;
  text: string;
  type?: 'chip' | 'text';
  chipColor?: 'success' | 'warning';
}

export const InvoiceCardItem = ({
  heading,
  text,
  type,
  chipColor,
}: InvoiceCardItemProps) => (
  <Box
    display="flex"
    flexDirection="column"
    sx={{gap: 2, width: 'max-content'}}
  >
    <Typography variant="subtitle1">{heading}</Typography>
    {type === 'text' && <Typography variant="h6">{text}</Typography>}
    {type === 'chip' && <Chip color={chipColor} label={text} />}
  </Box>
);
