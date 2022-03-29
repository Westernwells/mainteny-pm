import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import React, {SyntheticEvent, useState} from 'react';
import RadioGroup from '@mui/material/RadioGroup';
import Button from '@mui/material/Button';
import useTheme from '@mui/material/styles/useTheme';
import {formatDate} from 'utils/datetime';

interface Props {
  children: React.ReactNode;
  date: Date | null;
  time: Date | null;
  setTime: (state: Date | null) => void;
}

const radioLabels = [
  {label: 'At the earliest', value: 'earliest'},
  {label: 'I’ll choose', value: 'choose'},
];

export const LogIssueTimePreference = ({
  children,
  date,
  time,
  setTime,
}: Props) => {
  const theme = useTheme();
  const [selected, setSelected] = useState<string | null>(null);
  const handleChange = (event: SyntheticEvent) => {
    setSelected((event.target as HTMLInputElement).value);
  };

  const renderFormControl = (label: string, value: string) => (
    <FormControlLabel
      onChange={(e) => handleChange(e)}
      value={value}
      control={<Radio />}
      label={
        date && time ? (
          <Typography variant="body1">
            {formatDate(date, 'dd MMM YYY')}, {formatDate(time, 'p')}
          </Typography>
        ) : (
          label
        )
      }
      sx={{mt: '0.5em'}}
    />
  );

  const renderChangeButton = () => (
    <Button
      disableRipple
      variant="text"
      onClick={() => {
        if (selected === 'choose' && date && time) {
          return setTime(null);
        }
        return setSelected(null);
      }}
      sx={{
        '&:hover': {
          background: '#fff',
        },
      }}>
      <Typography
        variant="smallBtnText"
        sx={{
          textTransform: 'capitalize',
          color: theme.palette.secondary.main,
        }}>
        change
      </Typography>
    </Button>
  );

  return (
    <Box mb="0.5em">
      <Typography variant="subtitle2">Your time preference</Typography>
      <RadioGroup name="preference" value={selected}>
        {!selected
          ? radioLabels.map(({label, value}) => renderFormControl(label, value))
          : null}

        {selected === 'earliest' ? (
          <Box display="flex" justifyContent="space-between">
            {renderFormControl(radioLabels[0].label, radioLabels[0].value)}
            {renderChangeButton()}
          </Box>
        ) : null}

        {selected === 'choose' ? (
          <Box sx={{mb: '2em'}}>
            <Box display="flex" justifyContent="space-between">
              {renderFormControl(radioLabels[1].label, radioLabels[1].value)}
              {renderChangeButton()}
            </Box>

            {children}
          </Box>
        ) : null}
      </RadioGroup>
    </Box>
  );
};
