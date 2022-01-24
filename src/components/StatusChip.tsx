import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';

interface Props {
  label: string;
  bgColor?: string;
  color?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning';
}

export const StatusChip = ({label, bgColor, color}: Props) => (
  <Chip
    sx={{
      py: 2,
      color: '#fff',
      minWidth: '5.75rem',

      backgroundColor: bgColor,
    }}
    color={color}
    label={
      <Typography variant="largeBtnText" sx={{textTransform: 'capitalize'}}>
        {`${label.charAt(0)}${label.slice(1).toLowerCase()}`}
      </Typography>
    }
    size="medium"
  />
);
