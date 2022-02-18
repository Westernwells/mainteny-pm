import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import React from 'react';
import {SettingCard} from './SettingCard';

interface Props {
  dateFormat: {[key: string]: string | any};
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DateFormat = ({dateFormat, setDrawerOpen}: Props) => (
  <SettingCard header="Date Format">
    <FormControl onChange={() => setDrawerOpen(true)}>
      <FormLabel id="date-format-radio-buttons-group" />
      <RadioGroup
        aria-labelledby="date-format-radio-buttons-group"
        defaultValue="dd MM yyyy"
        name="radio-buttons-group"
      >
        {dateFormat.available.map((date: {[key: string]: string}) => (
          <FormControlLabel
            key={date?.format}
            value={date?.format}
            control={<Radio color="secondary" />}
            label={`${date?.format} - ${date?.example}`}
          />
        ))}
      </RadioGroup>
    </FormControl>
  </SettingCard>
);
