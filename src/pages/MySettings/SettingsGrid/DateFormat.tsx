import React from 'react';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import {SettingCard} from './SettingCard';

const dateFormats = [
  {format: 'mm/dd/yyyy', example: '07/31/2022'},
  {format: 'dd/mm/yyyy', example: '31/07/2022'},
  {format: 'dd MM yyyy', example: '31 Jul 2022'},
];

interface Props {
  formData: {
    dateFormat: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // eslint-disable-line no-unused-vars
}

export const DateFormat = ({formData, onChange}: Props) => (
  <SettingCard header="Date Format">
    <FormControl onChange={onChange}>
      <FormLabel id="date-format-radio-buttons-group" />
      <RadioGroup
        aria-labelledby="date-format-radio-buttons-group"
        value={formData.dateFormat}
        id="dateFormat"
        name="dateFormat">
        {dateFormats.map((date: {[key: string]: string}) => (
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
