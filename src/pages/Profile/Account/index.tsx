import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import useTheme from '@mui/material/styles/useTheme';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import Email from '@mui/icons-material/Email';
import Password from '@mui/icons-material/Password';
import {CommonUserView} from 'models/user';
import {InfoCard} from 'components/InfoCard';
import {CardProps} from 'components/CardProps';

interface Props {
  propertyOwner: CommonUserView;
  containerStyles?: {[key: string]: any};
}

export const Account = ({propertyOwner, containerStyles}: Props) => {
  const {t} = useTranslation();
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  console.log(
    '🚀 ~ file: index.tsx ~ line 22 ~ Account ~ openDialog',
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
  );
};
