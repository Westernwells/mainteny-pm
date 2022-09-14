import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import useTheme from '@mui/material/styles/useTheme';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import Email from '@mui/icons-material/Email';
import Password from '@mui/icons-material/Password';
import {useUpdateUserPassword} from 'hooks/reactQuery/useUserAccount';
import {CommonUserView} from 'models/user';
import {InfoCard} from 'components/InfoCard';
import {CardProps} from 'components/CardProps';
import {Dialog} from 'components/Dialog';
import {AccountFormModel} from './model';
import {EditAccount} from './EditAccount';

interface Props {
  propertyOwner: CommonUserView;
  containerStyles?: {[key: string]: any};
}

const passwordValidator = (value = '') =>
  value.length >= 8 &&
  !!value.match(/[!@#$%^&*(),.?":{}|<>_]/g) &&
  !!value.match(/\d/);

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required'),
  oldPassword: Yup.string().required('This field is required'),
  newPassword: Yup.string()
    .required('This field is required')
    .test(
      'new-password',
      'Password must be at least 8 characters long, contain at least one number and one special character.',
      passwordValidator,
    ),
});

export const Account = ({propertyOwner, containerStyles}: Props) => {
  const {t} = useTranslation();
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  const updateUserPassword = useUpdateUserPassword();

  const formik = useFormik<AccountFormModel>({
    initialValues: {
      email: propertyOwner?.userAccount?.contact?.email || '-',
      oldPassword: '',
      newPassword: '',
    },
    onSubmit: async () => {
      await updateUserPassword({
        username: propertyOwner?.userAccount?.username || '',
        oldPassword: formik.values.oldPassword,
        newPassword: formik.values.newPassword,
      });

      setOpenDialog(false);
    },
    validationSchema,
  });

  return (
    <>
      <InfoCard
        containerStyles={{
          [theme.breakpoints.up('md')]: {
            minHeight: '20rem',
          },
          ...containerStyles,
        }}
        handleAction={() => setOpenDialog(true)}
        header={<Typography variant="subtitle1">{t('Account')}</Typography>}
        showHeaderBackground
        headerActionIcon={<EditIcon />}>
        <Grid container spacing={2}>
          <Grid item xs={6} md={12}>
            <CardProps
              icon={<Email sx={{color: theme.palette.info.dark}} />}
              label="EMAIL"
              bodyText={propertyOwner?.userAccount?.contact?.email || '-'}
              iconBackground={theme.palette.info.outlinedHoverBg}
              iconMaxHeight="3em"
              containerStyles={{mt: '0.5em'}}
            />
          </Grid>
          <Grid item xs={6} md={12}>
            <CardProps
              icon={<Password sx={{color: theme.palette.info.dark}} />}
              label="PASSWORD"
              bodyText="*************"
              iconBackground={theme.palette.info.outlinedHoverBg}
              iconMaxHeight="3em"
              containerStyles={{mt: '0.5em'}}
            />
          </Grid>
        </Grid>
      </InfoCard>
      <Dialog
        title="Edit Account"
        onCancel={() => setOpenDialog(false)}
        onSave={formik.handleSubmit}
        disableSaveBtn={!!Object.keys(formik.errors).length}
        dialogProps={{
          maxWidth: 'xs',
          open: openDialog || false,
        }}>
        <EditAccount formik={formik} />
      </Dialog>
    </>
  );
};
