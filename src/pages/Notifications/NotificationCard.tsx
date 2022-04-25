import Typography from '@mui/material/Typography';
import {ReactNode} from 'react';
import useTheme from '@mui/material/styles/useTheme';
import Box from '@mui/material/Box';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';

interface Props {
  title: ReactNode;
  description: ReactNode;
  btnLabel: string;
  chipLabel: string;
  chipColor:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning';
  helperText?: string;
  btnAction?: () => void;
  icon?: ReactNode;
}

export const NotificationCard = ({
  title,
  description,
  chipLabel,
  chipColor,
  btnLabel,
  helperText,
  btnAction,
  icon,
}: Props) => {
  const theme = useTheme();
  return (
    <Box
      mx="auto"
      mt={2}
      sx={{
        backgroundColor: '#fff',
        p: 3,
        boxShadow: '0px 4px 15px rgba(144, 144, 144, 0.2)',
        borderRadius: '4px',
      }}
      display="flex"
      justifyContent="space-between">
      <Box
        mr={3}
        flexGrow={1}
        sx={{
          background: theme.palette.info.outlinedHoverBg,
          borderRadius: 10,
          padding: '11px',
          width: 45,
          height: 45,
        }}>
        {icon || <FileCopyIcon />}
      </Box>
      <Box display="flex" flexDirection="column" gap="2em">
        <Box display="flex">
          <Box display="flex" flexDirection="column" gap=".5em">
            <Typography variant="body1">{title}</Typography>
            <Typography
              variant="body1"
              sx={{color: theme.palette.text.secondary}}>
              {description}
            </Typography>
          </Box>
          <Chip
            label={<Typography variant="smallBtnText">{chipLabel}</Typography>}
            color={chipColor}
            variant="outlined"
            size="medium"
          />
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Button size="small" variant="contained" onClick={btnAction}>
            <Typography
              variant="smallBtnText"
              sx={{
                color: theme.palette.primary.contrastText,
                textTransform: 'capitalize',
                px: 0.5,
              }}>
              {btnLabel}
            </Typography>
          </Button>
          <Typography
            variant="helperText"
            mt={1}
            minWidth="12ch"
            textAlign="right">
            {helperText}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
