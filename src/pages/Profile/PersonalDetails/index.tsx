import {useState} from 'react';
import {useTranslation} from 'react-i18next';
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
import {capitalize} from 'utils/utils';
import {InfoCard} from 'components/InfoCard';
import {CardProps} from 'components/CardProps';

interface Props {
  propertyOwner: CommonUserView;
  containerStyles?: {[key: string]: any};
}

export const PersonalDetails = ({containerStyles, propertyOwner}: Props) => {
  const {t} = useTranslation();
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  const fullName = `${propertyOwner?.userAccount.firstName} ${propertyOwner?.userAccount.lastName}`;
  console.log(
    '🚀 ~ file: index.tsx ~ line 28 ~ PersonalDetails ~ openDialog',
    openDialog,
  );

  return (
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
            <Box sx={{position: 'relative'}}>
              <Avatar
                alt={fullName}
                src={propertyOwner?.userAccount?.photoUrl}
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
                bodyText={capitalize(propertyOwner.userAccount?.roles || '-')}
                iconBackground={theme.palette.info.outlinedHoverBg}
                iconMaxHeight="3em"
                containerStyles={{mt: '0.5em'}}
              />
            </Grid>
            <Grid item xs={6} md={12}>
              <CardProps
                icon={<Phone sx={{color: theme.palette.info.dark}} />}
                label="PHONE"
                bodyText={propertyOwner.userAccount?.contact?.phone || '-'}
                iconBackground={theme.palette.info.outlinedHoverBg}
                iconMaxHeight="3em"
                containerStyles={{mt: '0.5em'}}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </InfoCard>
  );
};
