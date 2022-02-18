import {Avatar} from '@mui/material';
import {Box} from '@mui/system';
import React from 'react';
import {FormTextInput} from './FormTextInput';
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
        <FormTextInput
          setDrawerOpen={setDrawerOpen}
          label="Name"
          defaultValue={personal?.fullName}
        />
        <FormTextInput
          setDrawerOpen={setDrawerOpen}
          label="Designation"
          defaultValue={personal?.designation}
          disabled
        />
        <FormTextInput
          setDrawerOpen={setDrawerOpen}
          label="Phone"
          defaultValue={personal?.phone}
        />
      </Box>
    </Box>
  </SettingCard>
);
