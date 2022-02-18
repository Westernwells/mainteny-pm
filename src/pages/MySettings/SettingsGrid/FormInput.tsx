import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import {alpha, styled} from '@mui/material/styles';
import {Box} from '@mui/material';
import React, {ReactNode, useState} from 'react';

const CustomInput = styled(TextField)(({theme}) => ({
  'label + &': {
    marginTop: theme.spacing(1),
  },
  '& .MuiInputBase-root': {
    borderRadius: 8,
    backgroundColor: theme.palette.inputBackground.main,
    padding: '.125em',
  },
  '& label.Mui-focused': {
    color: theme.palette.secondary.main,
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: theme.palette.secondary.main,
  },
  '& .Mui-disabled': {
    '& fieldset': {
      borderColor: `${theme.palette.inputBackground.main} !important`,
      boxShadow: `none !important`,
    },
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: `${theme.palette.inputBackground.main}`,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.secondary.main,
      boxShadow: `${alpha(theme.palette.primary.main, 0.1)} 0 0 0.6rem 0.2rem`,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.secondary.main,
      boxShadow: `${alpha(theme.palette.primary.main, 0.1)} 0 0 0.6rem 0.2rem`,
    },
  },
}));

interface Props {
  label: string;
  defaultValue: string;
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children?: ReactNode | null;
  select?: boolean;
  disabled?: boolean;
  type?: string;
}

export const FormInput = ({
  label,
  defaultValue,
  setDrawerOpen,
  children = null,
  select = false,
  disabled = false,
  type = 'text',
}: Props) => {
  const [value, setValue] = useState(defaultValue);
  const handleChange = (event: any) => {
    setValue(event.target.value);
    setDrawerOpen(true);
  };
  return (
    <Box
      sx={{
        mb: '1em',
        'input:disabled': {
          cursor: 'not-allowed',
        },
      }}
    >
      <InputLabel htmlFor={label}>
        <Typography variant="body2">{label}</Typography>
      </InputLabel>
      <CustomInput
        id={label}
        value={value}
        size="small"
        type={type}
        onChange={handleChange}
        select={select}
        disabled={disabled}
        fullWidth
      >
        {children}
      </CustomInput>
    </Box>
  );
};
