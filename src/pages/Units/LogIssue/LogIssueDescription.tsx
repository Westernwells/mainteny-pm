import {ChangeEvent} from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import {Box} from '@mui/system';

interface Props {
  label: string;
  name: string;
  value: string;
  handleChange: (e: ChangeEvent<any>) => void;
  error?: string;
  touched?: boolean;
  handleBlur?: (e: ChangeEvent<any>) => void;
}

export const LogIssueDescription = ({
  label,
  name,
  value,
  handleChange,
  error,
  touched,
  handleBlur,
}: Props) => (
  <Box mb={2}>
    <Typography variant="subtitle1" mb={2}>
      {label}
    </Typography>
    <TextField
      name={name}
      onChange={handleChange}
      onBlur={handleBlur}
      multiline
      rows={4}
      sx={{width: '100%'}}
      value={value}
      error={!!error}
      helperText={touched && error ? error : ''}
    />
  </Box>
);
