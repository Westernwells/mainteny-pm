import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useFormik} from 'formik';
import {useQueryClient} from 'react-query';
import * as Yup from 'yup';
import useTheme from '@mui/material/styles/useTheme';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import CameraAlt from '@mui/icons-material/CameraAlt';
import PersonPin from '@mui/icons-material/PersonPin';
import Phone from '@mui/icons-material/Phone';
import {CommonUserView} from 'models/user';
import {FileResourceRecord} from 'models/media';
import {capitalize} from 'utils/utils';
import {useUpdateContact} from 'hooks/reactQuery/useContacts';
import {useUserSession} from 'hooks/reactQuery/useUserSession';
import {useDownloadUrl} from 'hooks/reactQuery/useDownloadUrl';
import {queryKeys} from 'reactQuery/constants';
import {InfoCard} from 'components/InfoCard';
import {CardProps} from 'components/CardProps';
import {Dialog} from 'components/Dialog';
import {EditPersonalDetails} from './EditPersonalDetails';
import {PersonalDetailsFormModel, RolesType} from './model';
import {ProfileImageUploadForm} from './ProfileImageUploadForm';

interface Props {
  propertyOwner: CommonUserView;
  containerStyles?: {[key: string]: any};
}

const phoneValidationRE =
  /^\+((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  role: Yup.string().oneOf(Object.keys(RolesType)),
  phone: Yup.string().matches(phoneValidationRE, 'Phone number is not valid'),
});

export const PersonalDetails = ({containerStyles, propertyOwner}: Props) => {
  const {t} = useTranslation();
  const theme = useTheme();
  const queryClient = useQueryClient();
  const {user, updateUser} = useUserSession();
  const [openDialog, setOpenDialog] = useState(false);
  const [openImageUploadDialog, setOpenImageUploadDialog] = useState(false);
  const {mutateAsync: updateContact} = useUpdateContact(
    'Profile updated successfully',
  );

  const fullName = `${propertyOwner?.userAccount.firstName} ${propertyOwner?.userAccount.lastName}`;
  const role = propertyOwner.userAccount?.roles || '-';
  const phone = propertyOwner.userAccount?.contact?.phone || '-';
  const photoUri = propertyOwner?.userAccount?.photoUrl || '';
  const {data: photoUrl} = useDownloadUrl(photoUri ? [photoUri] : []);

  const onSuccessUpdate = () => {
    const newUser = queryClient.getQueryData([
      queryKeys.fetchUser,
      user?.userAccount.id,
    ]) as CommonUserView;
    updateUser({
      ...user!,
      userAccount: {
        ...newUser.userAccount,
        serviceCompany: {
          ...user!.userAccount.serviceCompany,
        },
      },
    });
  };

  const formik = useFormik<PersonalDetailsFormModel>({
    initialValues: {
      name: fullName,
      role: role[0],
      phone,
    },
    onSubmit: async () => {
      const nameArr = formik.values.name.split(' ');
      await updateContact(
        {
          contactId: propertyOwner?.userData.propertyContactPersonId,
          body: {
            userAccount: {
              firstName: nameArr[0],
              lastName: nameArr.splice(1).join(' '),
              contact: {
                phone: formik.values.phone,
                email: propertyOwner?.userAccount?.contact?.email ?? '-',
              },
            },
            propertyContactPerson: {
              roles: [formik.values.role],
            },
          },
        },
        {onSuccess: onSuccessUpdate},
      );

      setOpenDialog(false);
    },
    validationSchema,
  });

  const uploadProfilePhoto = async (files: FileResourceRecord[]) => {
    const nameArr = fullName.split(' ');
    await updateContact(
      {
        contactId: propertyOwner?.userData.propertyContactPersonId,
        body: {
          userAccount: {
            firstName: nameArr[0],
            lastName: nameArr.splice(1).join(' '),
            photoUrl: files?.[0].uri ?? '',
            contact: {
              phone,
              email: propertyOwner?.userAccount?.contact?.email ?? '-',
            },
          },
          propertyContactPerson: {
            roles: role,
          },
        },
      },
      {onSuccess: onSuccessUpdate},
    );
    setOpenImageUploadDialog(false);
  };

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
        header={
          <Typography variant="subtitle1">{t('Personal Details')}</Typography>
        }
        showHeaderBackground
        headerActionIcon={<EditIcon />}
        bodyContainerStyle={{
          display: 'flex',
          height: '80%',
        }}>
        <Grid container flexDirection="row" flexWrap="nowrap" columnSpacing={2}>
          <Grid item xs={5} lg={3} alignSelf="center">
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Box
                sx={{position: 'relative'}}
                onClick={() => setOpenImageUploadDialog(true)}>
                <Avatar
                  alt={fullName}
                  src={photoUrl?.[0] ?? ''}
                  variant="circular"
                  sx={{
                    width: '80px',
                    height: '80px',
                    aspectRatio: '1',
                  }}
                />
                <IconButton
                  sx={{
                    position: 'absolute',
                    background: theme.palette.secondary.dark,
                    color: 'white',
                    bottom: '0',
                    right: '0',
                    border: '1px solid white',
                    width: '24px',
                    height: '24px',
                    '&:hover': {
                      background: '#08baeb',
                    },
                  }}>
                  <CameraAlt sx={{fontSize: '14px'}} />
                </IconButton>
              </Box>

              <Typography variant="subtitle1" textAlign="center" pt={0.5}>
                {fullName}
              </Typography>
              <Typography
                variant="subtitle2"
                color="textSecondary"
                textAlign="center">
                {t('Property Owner')}
              </Typography>
            </Box>
          </Grid>

          <Grid item>
            <Divider
              orientation="vertical"
              sx={{background: theme.palette.divider}}
            />
          </Grid>

          <Grid item alignSelf="center">
            <Grid container spacing={2}>
              <Grid item xs={6} md={12}>
                <CardProps
                  icon={<PersonPin sx={{color: theme.palette.info.dark}} />}
                  label="ROLE"
                  bodyText={capitalize(role)}
                  iconBackground={theme.palette.info.outlinedHoverBg}
                  iconMaxHeight="3em"
                  containerStyles={{mt: '0.5em'}}
                />
              </Grid>
              <Grid item xs={6} md={12}>
                <CardProps
                  icon={<Phone sx={{color: theme.palette.info.dark}} />}
                  label="PHONE"
                  bodyText={phone}
                  iconBackground={theme.palette.info.outlinedHoverBg}
                  iconMaxHeight="3em"
                  containerStyles={{mt: '0.5em'}}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </InfoCard>
      <Dialog
        title="Edit Personal Details"
        onCancel={() => setOpenDialog(false)}
        onSave={formik.handleSubmit}
        disableSaveBtn={!!Object.keys(formik.errors).length}
        dialogProps={{
          maxWidth: 'xs',
          open: openDialog || false,
        }}>
        <EditPersonalDetails formik={formik} />
      </Dialog>
      {openImageUploadDialog && (
        <ProfileImageUploadForm
          title={t('Upload Profile Picture')}
          uploadPath={`propertyContactPersons/${propertyOwner?.userData.propertyContactPersonId}`}
          onSave={uploadProfilePhoto}
          onCancel={() => setOpenImageUploadDialog(false)}
          successMessage={t('Image uploaded successfully')}
          hints={[
            t('JPEG, PNG, BMP, GIF, WEBP, SVG only'),
            t('File size less than 5MB only'),
          ]}
        />
      )}
    </>
  );
};
