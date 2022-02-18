import useTheme from '@mui/material/styles/useTheme';
import {Typography} from '@mui/material';
import React from 'react';
import {FormInput} from './FormInput';
import {SettingCard} from './SettingCard';

interface Props {
  account: {[key: string]: string | any};
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Account = ({account, setDrawerOpen}: Props) => {
  const theme = useTheme();
  return (
    <SettingCard header="Account">
      <FormInput
        label="Email"
        defaultValue={account?.email}
        setDrawerOpen={setDrawerOpen}
        type="email"
        disabled
      />
      <Typography
        variant="helperText"
        sx={{color: theme.palette.secondary.main, py: '0'}}
      >
        Cannot change email as it is tied to the account
      </Typography>
      <FormInput
        label="Password"
        defaultValue={account?.password}
        setDrawerOpen={setDrawerOpen}
        type="password"
      />
    </SettingCard>
  );
};
