import React from 'react';
import {Box, InputLabel, Typography} from '@mui/material';
import {FormInput} from './FormInput';
import {SettingCard} from './SettingCard';

interface Props {
  formData: {
    accoutEmail: string;
    accoutPassword: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Account = ({formData, onChange}: Props) => (
  <SettingCard header="Account">
    <Box display="none">
      <FormInput
        label="Email"
        id="accountEmail"
        type="email"
        value={formData.accoutEmail}
        onChange={onChange}
        disabled
      />
    </Box>
    <InputLabel htmlFor="accountEmailText">
      <Typography variant="body2">Email</Typography>
    </InputLabel>
    <Box pl=".5em" pb=".75em">
      <Typography
        id="accountEmailText"
        style={{cursor: 'not-allowed', paddingBlock: '.75em'}}>
        {formData.accoutEmail}
      </Typography>
      <Typography variant="helperText" sx={{color: 'secondary.main'}}>
        Uh oh! This can&apos;t be changed, sorry. We use this to identify you.
      </Typography>
    </Box>

    <FormInput
      label="Password"
      id="accountPassword"
      value={formData.accoutPassword}
      onChange={onChange}
      type="password"
    />
  </SettingCard>
);
