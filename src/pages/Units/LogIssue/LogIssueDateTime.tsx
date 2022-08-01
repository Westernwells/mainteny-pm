import {Box} from '@mui/system';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker as MuiDatePicker} from '@mui/x-date-pickers/DatePicker';
import {TimePicker as MuiTimePicker} from '@mui/x-date-pickers/TimePicker';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import useTheme from '@mui/material/styles/useTheme';

interface Props {
  setDate: (state: Date | null) => void; // eslint-disable-line no-unused-vars
  setTime: (state: Date | null) => void; // eslint-disable-line no-unused-vars
  time: Date | null;
  date: Date | null;
}

export const LogIssueDateTime = ({setDate, setTime, time, date}: Props) => {
  const theme = useTheme();
  return !date || !time ? (
    <Box>
      <Typography
        sx={{mt: '2em', mb: '1.5em'}}
        variant="subtitle2"
        color={theme.palette.text.secondary}>
        Choose date and time
      </Typography>

      <Box display="flex">
        <Box sx={{mr: 1}}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MuiDatePicker
              label="Date"
              value={date}
              minDate={new Date()}
              onChange={(newValue: Date | null) => {
                setDate(newValue);
              }}
              renderInput={(params) => <TextField size="small" {...params} />}
            />
          </LocalizationProvider>
        </Box>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <MuiTimePicker
            label="Time"
            value={time}
            onChange={(newValue: Date | null) => {
              setTime(newValue);
            }}
            renderInput={(params) => <TextField size="small" {...params} />}
          />
        </LocalizationProvider>
      </Box>
    </Box>
  ) : null;
};
