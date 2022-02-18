import {Avatar} from '@mui/material';
import {Box} from '@mui/system';
import React from 'react';
import {FormInput} from './FormInput';
import {SettingCard} from './SettingCard';

interface Props {
  personal: {[key: string]: string | any};
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PersonalDetails = ({personal, setDrawerOpen}: Props) => (
  <SettingCard header="Personal Details">
    <Box display="flex" gap={4}>
      <Avatar
        alt={personal?.fullName}
        src={personal?.avatar}
        variant="circular"
        sx={{width: '120px', height: '120px', aspectRatio: '1'}}
      />
      <Box flexGrow={1}>
        <FormInput
          label="Name"
          defaultValue={personal?.fullName}
          setDrawerOpen={setDrawerOpen}
        />
        <FormInput
          label="Designation"
          defaultValue={personal?.designation}
          setDrawerOpen={setDrawerOpen}
          disabled
        />
        <FormInput
          label="Phone"
          defaultValue={personal?.phone}
          setDrawerOpen={setDrawerOpen}
        />
      </Box>
    </Box>
  </SettingCard>
);
