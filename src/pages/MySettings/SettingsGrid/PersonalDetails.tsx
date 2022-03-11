import React from 'react';
import {Avatar} from '@mui/material';
import {Box} from '@mui/system';
import {FormInput} from './FormInput';
import {SettingCard} from './SettingCard';

interface Props {
  formData: {
    userName: string;
    userAvatar: string;
    userDesignation: string;
    userPhone: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // eslint-disable-line no-unused-vars
}

export const PersonalDetails = ({formData, onChange}: Props) => (
  <SettingCard header="Personal Details">
    <Box display="flex" gap={4}>
      <Avatar
        alt={formData.userName}
        src={formData.userAvatar}
        variant="circular"
        sx={{width: '120px', height: '120px', aspectRatio: '1'}}
      />
      <Box flexGrow={1}>
        <FormInput
          label="Name"
          id="userName"
          value={formData.userName}
          onChange={onChange}
        />
        <FormInput
          label="Designation"
          id="userDesignation"
          value={formData.userDesignation}
          onChange={onChange}
          disabled
        />
        <FormInput
          label="Phone"
          id="userPhone"
          value={formData.userPhone}
          onChange={onChange}
        />
      </Box>
    </Box>
  </SettingCard>
);
