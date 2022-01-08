import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import {Box} from '@mui/system';
import Autocomplete from '@mui/material/Autocomplete';
import Elevator from '@mui/icons-material/Elevator';

const elevators = [
  {
    number: '25900500',
    label: 'Schindler A2000 ',
    subText: 'Parkway Street, Berlin',
  },
  {
    number: '25900501',
    label: 'KONE Minispace',
    subText: 'Stortingsgaten 24-26, Oslo',
  },
];

export const LogIssueUnitInput = () => (
  <Box sx={{width: '100%'}} mb={6}>
    <Typography variant="subtitle1" mb={2}>
      Unit
    </Typography>

    <Autocomplete
      id="unit"
      options={elevators}
      autoHighlight
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => (
        <Box component="li" sx={{display: 'flex'}} {...props}>
          <Box mr={3}>
            <Elevator />
          </Box>
          <Box>
            <Typography variant="h6">
              {option.number} - {option.label}
            </Typography>
            <Typography variant="body2">{option.subText}</Typography>
          </Box>
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
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
