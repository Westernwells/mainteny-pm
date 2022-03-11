import {ChangeEvent} from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import {Box} from '@mui/system';
import grey from '@mui/material/colors/grey';
import useTheme from '@mui/material/styles/useTheme';

interface Props {
  label: string;
  name: string;
  value: string;
  handleChange: (e: ChangeEvent<any>) => void; // eslint-disable-line no-unused-vars
  error?: string;
  touched?: boolean;
  handleBlur?: (e: ChangeEvent<any>) => void; // eslint-disable-line no-unused-vars
}

export const LogIssueDescription = ({
  label,
  name,
  value,
  handleChange,
  error,
  touched,
  handleBlur,
}: Props) => {
  const theme = useTheme();
  return (
    <Box mb={2}>
      <Typography variant="subtitle2" color={grey[500]} mb={2}>
        {label}
      </Typography>
      <TextField
        name={name}
        onChange={handleChange}
        onBlur={handleBlur}
        multiline
        rows={3}
        InputProps={{
          sx: {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: value ? '#fff' : 'default',
            },
          },
        }}
        sx={{
          width: '100%',
          background: value ? theme.palette.inputBackground.main : 'default',
        }}
        value={value}
        error={touched && !!error}
        helperText={touched && error ? error : ''}
      />
    </Box>
  );
};
