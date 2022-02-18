import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import useTheme from '@mui/material/styles/useTheme';
import InputBase from '@mui/material/InputBase';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import {alpha, styled} from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import {Box} from '@mui/material';
import React from 'react';

const CustomInput = styled(InputBase)(({theme}) => ({
  'label + &': {
    marginTop: theme.spacing(1),
  },
  '& .MuiInputBase-input': {
    borderRadius: 8,
    position: 'relative',
    backgroundColor: theme.palette.inputBackground.main,
    border: `1px solid ${theme.palette.inputBackground.main}`,
    fontSize: 16,
    width: '100%',
    padding: '10px 12px',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),

    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.1)} 0 0 0.6rem 0.2rem`,
      borderColor: theme.palette.secondary.main,
      backgroundColor: theme.palette.common.white,
    },
  },
}));

interface Props {
  label: string;
  defaultValue: string;
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  disabled?: boolean;
  type?: string;
}

export const FormTextInput = ({
  label,
  defaultValue,
  setDrawerOpen,
  disabled = false,
  type = 'text',
}: Props) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        my: '1.5em',
        'input:disabled': {
          cursor: 'not-allowed',
        },
      }}
    >
      <InputLabel htmlFor={label}>
        <Typography variant="body2">{label}</Typography>
      </InputLabel>
      <CustomInput
        defaultValue={defaultValue}
        id={label}
        size="small"
        disabled={disabled}
        fullWidth
        type={type}
        onChange={() => setDrawerOpen(true)}
      />
    </Box>
  );
};
