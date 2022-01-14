import Typography from '@mui/material/Typography';
import Box from '@mui/system/Box';

interface InvoiceCardItemProps {
  heading: string;
  text: string;
  type?: 'chip' | 'text';
}

export const InvoiceCardItem = ({
  heading,
  text,
  type,
}: InvoiceCardItemProps) => (
  <Box display="flex" flexDirection="column" sx={{gap: 2}}>
    <Typography variant="subtitle1">{heading}</Typography>
    <Typography variant="h6">{text}</Typography>
  </Box>
);
