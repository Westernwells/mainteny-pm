import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import {Box} from '@mui/system';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import DesktopTimePicker from '@mui/lab/DesktopTimePicker';

interface Props {
  date: Date | null;
  setDate: (state: Date | null) => void;
  time: Date | null;
  setTime: (state: Date | null) => void;
}

export const LogIssueDateTime = ({date, setDate, time, setTime}: Props) => (
  <Box mb={4}>
    <Typography variant="subtitle1" mb={3}>
      Choose your preferred time
    </Typography>
    <Box display="flex">
      <FormControlLabel
        control={<Checkbox />}
        label="At the earliest"
        sx={{mr: 6}}
      />
      <Typography variant="subtitle1" mr={2} pt={2}>
        OR
      </Typography>
      <Box sx={{mr: 1}}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label="Date"
            value={date}
            minDate={new Date()}
            onChange={(newValue) => {
              setDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Box>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopTimePicker
          label="Time"
          value={time}
          onChange={(newValue) => {
            setTime(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </Box>
  </Box>
);
