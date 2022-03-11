import React from 'react';
import useTheme from '@mui/material/styles/useTheme';
import {Typography} from '@mui/material';
import {FormInput} from './FormInput';
import {SettingCard} from './SettingCard';

interface Props {
  formData: {
    accoutEmail: string;
    accoutPassword: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // eslint-disable-line no-unused-vars
}

export const Account = ({formData, onChange}: Props) => {
  const theme = useTheme();
  return (
    <SettingCard header="Account">
      <FormInput
        label="Email"
        id="accountEmail"
        value={formData.accoutEmail}
        onChange={onChange}
        type="email"
        disabled
      />
      <Typography
        variant="helperText"
        sx={{color: theme.palette.secondary.main, py: '0'}}>
        Cannot change email as it is tied to the account
      </Typography>
      <FormInput
        label="Password"
        id="accountPassword"
        value={formData.accoutPassword}
        onChange={onChange}
        type="password"
      />
    </SettingCard>
  );
};
