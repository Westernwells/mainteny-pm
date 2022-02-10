import Button from '@mui/material/Button';

interface Props {
  size?: 'small' | 'medium' | 'large';
  label: string;
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
  onClick?: () => void;
}

export const CustomButtonUnstyled = ({
  size,
  label,
  startIcon,
  endIcon,
  onClick = () => {},
}: Props) => (
  <Button
    disableRipple
    disableFocusRipple
    disableElevation
    onClick={() => onClick()}
    variant="text"
    size={size || 'medium'}
    sx={{
      textTransform: 'capitalize',
      background: 'transparent',
      border: '1px solid rgba(15, 76, 100, 0.5)',
      height: size === 'small' ? '2.5rem' : 'default',
      px: '1.5em',
      '&:hover': {
        background: 'transparent',
      },
    }}
    startIcon={startIcon}
    endIcon={endIcon}
  >
    {label}
  </Button>
);
