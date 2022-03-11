import {useState} from 'react';
import {FormikProps, useFormik} from 'formik';

import Box from '@mui/material/Box';
import {BackAction} from 'components/BackAction';
import {BottomDrawer} from './BottomDrawer';
import {SettingsGrid} from './SettingsGrid';

import {user} from './dummyData';

export interface FormFeilds {
  userName: string;
  userDesignation: string;
  userPhone: string;
  userAvatar: string;
  localeLanguage: string;
  localeTimezone: string;
  accountEmail: string;
  accountPassword: string;
  dateFormat: string;
}

export const MySettings = () => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const formik: FormikProps<FormFeilds> = useFormik<FormFeilds>({
    initialValues: {
      userName: user.personal.fullName,
      userDesignation: user.personal.designation,
      userPhone: user.personal.phone,
      userAvatar: user.personal.avatar,
      localeLanguage: user.locale.language,
      localeTimezone: user.locale.timezone,
      accountEmail: user.account.email,
      accountPassword: user.account.password,
      dateFormat: user.dateFormat.selected,
    },
    onSubmit: (values) => console.log(values),
  });
  return (
    <Box sx={{mb: 2, mt: 12, px: 4}}>
      <BackAction label="My Settings" />
      <form onSubmit={formik.handleSubmit}>
        <SettingsGrid setDrawerOpen={setDrawerOpen} formik={formik} />
        <BottomDrawer
          drawerOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
          resetForm={formik.resetForm}
        />
      </form>
    </Box>
  );
};
