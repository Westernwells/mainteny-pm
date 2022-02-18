import React, {useState} from 'react';

import {Box, MenuItem, TextField} from '@mui/material';
import {alpha, styled} from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import useTheme from '@mui/material/styles/useTheme';
import {SettingCard} from './SettingCard';
import {FormInput} from './FormInput';

interface Props {
  locale: {[key: string]: string | any};
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const languages = ['English', 'German', 'Spanish', 'Hindi'];
const timezones = [
  'Asia/Kolkata IST (GMT +05:30)',
  'Europe/Amsterdam AMS (GMT + 01:00)',
  'America/Chicago CST (GMT +06:00)',
];

const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];

export const MySelect = ({itemList}: {itemList: any}) => {
  const [value, setValue] = useState(itemList[0]);
  function handleChange(event: any) {
    setValue(event.target.value);
  }

  const MyCustomSelect = styled(TextField)(({theme}) => ({
    'label + &': {
      marginTop: theme.spacing(1),
    },
    '& .MuiInputBase-root': {
      borderRadius: 8,
      backgroundColor: theme.palette.inputBackground.main,
      padding: '.125em',
    },
    '& label.Mui-focused': {
      color: theme.palette.secondary.main,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: theme.palette.secondary.main,
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.inputBackground.main,
      },
      '&:hover fieldset': {
        borderColor: theme.palette.secondary.main,
        boxShadow: `${alpha(
          theme.palette.primary.main,
          0.1,
        )} 0 0 0.6rem 0.2rem`,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.secondary.main,
        boxShadow: `${alpha(
          theme.palette.primary.main,
          0.1,
        )} 0 0 0.6rem 0.2rem`,
      },
      '& Mui-Paper-root': {
        mt: '2em',
      },
    },
  }));

  return (
    <MyCustomSelect
      //   id=''
      select
      value={value}
      onChange={handleChange}
      fullWidth
      size="small"
    >
      {itemList.map((item: any) => (
        <MenuItem key={item} value={item}>
          {item}
        </MenuItem>
      ))}
    </MyCustomSelect>
  );
};

export const Locale = ({locale, setDrawerOpen}: Props) => {
  const [currency, setCurrency] = React.useState('EUR');

  function handleChange(event: any) {
    setCurrency(event.target.value);
  }
  return (
    <SettingCard header="Language & Region">
      <FormInput
        label="Language"
        defaultValue={locale.language}
        setDrawerOpen={setDrawerOpen}
        select
      >
        {languages.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </FormInput>
      <FormInput
        label="Language & Region"
        defaultValue={locale.timezone}
        setDrawerOpen={setDrawerOpen}
        select
      >
        {timezones.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </FormInput>
    </SettingCard>
  );
};
