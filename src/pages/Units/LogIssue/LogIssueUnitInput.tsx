import {ChangeEvent} from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import {Box} from '@mui/system';
import Autocomplete from '@mui/material/Autocomplete';
import Elevator from '@mui/icons-material/Elevator';
import {ElevatorView} from 'models/elevator';
import {FormikErrors} from 'formik';

interface Props {
  elevators: ElevatorView[];
  error?: string;
  touched?: boolean;
  handleBlur?: (e: ChangeEvent<any>) => void;
  setField: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => Promise<void> | Promise<FormikErrors<any>>;
  selectedUnit?: ElevatorView;
}

export const LogIssueUnitInput = ({
  elevators,
  setField,
  touched,
  error,
  handleBlur,
  selectedUnit,
}: Props) => (
  <Box sx={{width: '100%'}} mb={3}>
    <Typography variant="subtitle1" mb={2}>
      Unit
    </Typography>

    <Autocomplete
      id="unit"
      options={elevators}
      autoHighlight
      value={selectedUnit}
      onChange={(e, value) => setField('elevator', value)}
      getOptionLabel={(option) => `${option.number} ${option.model}`}
      renderOption={(props, option) => (
        <Box component="li" sx={{display: 'flex'}} {...props}>
          <Box mr={3}>
            <Elevator />
          </Box>
          <Box>
            <Typography variant="h6">
              {option.number} - {option.model}
            </Typography>
            <Typography variant="body2">{option.address.fullName}</Typography>
          </Box>
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          error={!!error}
          helperText={touched && error ? error : ''}
          onBlur={handleBlur}
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    />
    <Typography variant="subtitle2">
      installed at Grand Hyatt Parkway Hotel, Newman Street, Oslo
    </Typography>
  </Box>
);
