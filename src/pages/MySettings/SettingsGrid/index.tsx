import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {FormikProps} from 'formik';
import {FormFeilds} from '..';
import {Account} from './Account';
import {DateFormat} from './DateFormat';
import {Locale} from './Locale';
import {PersonalDetails} from './PersonalDetails';

interface Props {
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  formik: FormikProps<FormFeilds>;
}

export const SettingsGrid = ({setDrawerOpen, formik}: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e);
    setDrawerOpen(true);
  };

  return (
    <Grid
      columnSpacing={2}
      sx={{
        width: '991px',
        mx: 'auto',
        mt: '2em',
        mb: '7em',
      }}
      container
    >
      <Grid xs={7} item>
        <Box display="flex" flexDirection="column" gap={2}>
          <PersonalDetails
            formData={{
              userName: formik.values.userName,
              userAvatar: formik.values.userAvatar,
              userDesignation: formik.values.userDesignation,
              userPhone: formik.values.userPhone,
            }}
            onChange={handleChange}
          />
          <Locale
            formData={{
              localeLanguage: formik.values.localeLanguage,
              localeTimezone: formik.values.localeTimezone,
            }}
            onChange={handleChange}
          />
        </Box>
      </Grid>
      <Grid xs={5} item>
        <Box display="flex" flexDirection="column" gap={2}>
          <Account
            formData={{
              accoutEmail: formik.values.accountEmail,
              accoutPassword: formik.values.accountPassword,
            }}
            onChange={handleChange}
          />
          <DateFormat
            formData={{
              dateFormat: formik.values.dateFormat,
            }}
            onChange={handleChange}
          />
        </Box>
      </Grid>
    </Grid>
  );
};
