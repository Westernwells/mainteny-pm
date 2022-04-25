import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import {Chip} from '@mui/material';
import {SettingCard} from './SettingCard';
import {FormInput} from './FormInput';

const languages = ['English', 'German', 'Spanish', 'Hindi'];
const timezones = [
  'Asia/Kolkata IST (GMT +05:30)',
  'Europe/Amsterdam AMS (GMT + 01:00)',
  'America/Chicago CST (GMT +06:00)',
];

interface Props {
  formData: {
    localeLanguage: string;
    localeTimezone: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Locale = ({formData, onChange}: Props) => (
  <SettingCard
    header={
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{zIndex: 'snackbar'}}>
        Language & Region
        <Chip
          label="coming soon"
          variant="outlined"
          color="secondary"
          size="small"
        />
      </Box>
    }
    containerStyles={{
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        inset: '0 0 0 0',
        zIndex: 'modal',
        cursor: 'not-allowed',
      },
    }}>
    <FormInput
      label="Language"
      id="localeLanguage"
      value={formData.localeLanguage}
      onChange={onChange}
      select>
      {languages.map((item) => (
        <MenuItem key={item} value={item}>
          {item}
        </MenuItem>
      ))}
    </FormInput>
    <FormInput
      label="Language & Region"
      id="localeTimezone"
      value={formData.localeTimezone}
      onChange={onChange}
      select>
      {timezones.map((item) => (
        <MenuItem key={item} value={item}>
          {item}
        </MenuItem>
      ))}
    </FormInput>
  </SettingCard>
);
