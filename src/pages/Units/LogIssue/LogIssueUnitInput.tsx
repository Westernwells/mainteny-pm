import {ChangeEvent} from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import {Box} from '@mui/system';
import Autocomplete from '@mui/material/Autocomplete';
import Elevator from '@mui/icons-material/Elevator';
import {ElevatorView} from 'models/elevator';
import {FormikErrors} from 'formik';
import grey from '@mui/material/colors/grey';
import useTheme from '@mui/material/styles/useTheme';

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
}: Props) => {
  const theme = useTheme();
  return (
    <Box sx={{width: '100%'}} mb={3}>
      <Typography variant="subtitle1" mb="0.5em" color={grey[500]}>
        Unit
      </Typography>

      <Autocomplete
        id="unit"
        size="small"
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
            }}
            // InputProps={{
            //   sx: {
            //     '& .MuiOutlinedInput-notchedOutline': {
            //       // borderColor: selectedUnit ? '#fff' : 'default',
            //     },
            //   },
            // }}
          />
        )}
      />
      {selectedUnit ? (
        <Box display="flex" ml="1em" mt="0.5em">
          <Typography
            variant="helperText"
            mr="0.2em"
            sx={{color: theme.palette.text.secondary}}
          >
            {' '}
            installed at
          </Typography>
          <Typography variant="helperText">
            {selectedUnit.address.fullName}
          </Typography>
        </Box>
      ) : null}
    </Box>
  );
};
