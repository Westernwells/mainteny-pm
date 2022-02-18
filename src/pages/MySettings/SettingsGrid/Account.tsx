import useTheme from '@mui/material/styles/useTheme';
import {Typography} from '@mui/material';
import React from 'react';
import {FormTextInput} from './FormTextInput';
import {SettingCard} from './SettingCard';

interface Props {
  account: {[key: string]: string | any};
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Account = ({account, setDrawerOpen}: Props) => {
  const theme = useTheme();
  return (
    <SettingCard header="Account">
      <FormTextInput
        setDrawerOpen={setDrawerOpen}
        label="Email"
        defaultValue={account?.email}
        type="email"
        disabled
      />
      <Typography
        variant="helperText"
        sx={{color: theme.palette.secondary.main, py: '0'}}
      >
        Cannot change email as it is tied to the account
      </Typography>
      <FormTextInput
        setDrawerOpen={setDrawerOpen}
        label="Password"
        defaultValue={account?.password}
        type="password"
      />
    </SettingCard>
  );
};
