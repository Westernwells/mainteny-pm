import {useCallback, useEffect, useRef, useState} from 'react';
import {FormikProps, useFormik} from 'formik';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import {BackAction} from 'components/BackAction';
import {
  usePropertyManager,
  useUpdatePropertyManager,
} from 'hooks/reactQuery/usePropertyManager';
import {PropertyManager} from 'models/propertyManager';
import {UpdateUserAccountData} from 'models/user';
import {BottomDrawer} from './BottomDrawer';
import {SettingsGrid} from './SettingsGrid';

import {user} from './dummyData';

export interface FormFeilds {
  userDesignation: string;
  userPhone: string;
  userAvatar: string;
  localeLanguage: string;
  localeTimezone: string;
  accountPassword: string;
  dateFormat: string;
  accountEmail: string;
  fullName: string;
}

export const MySettings = () => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const {data: propertyManager} = usePropertyManager();
  const {mutate: updateSettings} = useUpdatePropertyManager();

  const formik: FormikProps<FormFeilds> = useFormik<FormFeilds>({
    initialValues: {
      fullName: '',
      userDesignation: '',
      userPhone: '',
      userAvatar: '',
      localeLanguage: 'English',
      localeTimezone: 'Europe/Amsterdam AMS (GMT + 01:00)',
      accountEmail: '',
      accountPassword: '',
      dateFormat: '',
    },
    onSubmit: (values) => console.log(values),
  });

  const updateInitialValue = (manager: PropertyManager) => {
    const splitRole = manager.userAccount.roles[0].toLowerCase().split('_');

    const role = `${splitRole[0].charAt(0).toUpperCase()}${splitRole[0].slice(
      1,
    )} ${splitRole[1]}`;

    formik.setValues({
      ...formik.values,
      fullName: `${manager.userAccount.firstName} ${manager.userAccount.lastName}`,
      userPhone: manager.userAccount.contact.phone,
      userDesignation: role,
      accountEmail: manager.userAccount.contact.email,
    });
  };

  useEffect(() => {
    if (propertyManager) {
      updateInitialValue(propertyManager);
    }
  }, [propertyManager]);

  const handleSettingsUpdate = async (fields: FormFeilds) => {
    const name = fields.fullName.split(' ');
    const body = {
      userAccount: {
        contact: {
          email: fields.accountEmail,
          phone: fields.userPhone,
        },
        firstName: name[0] || '',
        lastName: name[1] || '',
        photoUrl: '',
        username: fields.accountEmail,
      },
    };
    updateSettings(body as {userAccount: UpdateUserAccountData});
  };

  const resetForm = () => {
    if (propertyManager) {
      updateInitialValue(propertyManager);
    }
  };

  return (
    <Box sx={{mb: 2, mt: 12, px: 4}}>
      <BackAction label="My Settings" />
      <form onSubmit={formik.handleSubmit}>
        <SettingsGrid setDrawerOpen={setDrawerOpen} formik={formik} />
        <BottomDrawer
          handleSubmit={() => handleSettingsUpdate(formik.values)}
          drawerOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
          resetForm={resetForm}
        />
      </form>
    </Box>
  );
};
