import {useTranslation} from 'react-i18next';
import useTheme from '@mui/material/styles/useTheme';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Language from '@mui/icons-material/Language';
import Timelapse from '@mui/icons-material/Timelapse';
import {CommonUserView} from 'models/user';
import {InfoCard} from 'components/InfoCard';
import {CardProps} from 'components/CardProps';

export const languages = [
  {
    label: 'English',
    value: 'en-us',
  },
  {
    label: 'German',
    value: 'de-de',
  },
];

interface Props {
  propertyOwner: CommonUserView;
  containerStyles?: {[key: string]: any};
}

export const LanguageAndRegion = ({propertyOwner, containerStyles}: Props) => {
  const {t} = useTranslation();
  const theme = useTheme();

  return (
    <InfoCard
      containerStyles={{
        [theme.breakpoints.up('md')]: {
          minHeight: '20rem',
        },
        ...containerStyles,
      }}
      header={
        <Typography variant="subtitle1">{t('Language & Region')}</Typography>
      }
      showHeaderBackground>
      <Grid container spacing={2}>
        <Grid item xs={6} md={12}>
          <CardProps
            icon={<Language sx={{color: theme.palette.info.dark}} />}
            label="LANGUAGE"
            bodyText={
              propertyOwner?.userAccount?.serviceCompany?.language
                ? languages.find(
                    (item) =>
                      item.value ===
                      propertyOwner?.userAccount.serviceCompany.language,
                  )?.label
                : propertyOwner?.userAccount?.serviceCompany?.language || '-'
            }
            iconBackground={theme.palette.info.outlinedHoverBg}
            iconMaxHeight="3em"
            containerStyles={{mt: '0.5em'}}
          />
        </Grid>
        <Grid item xs={6} md={12}>
          <CardProps
            icon={<Timelapse sx={{color: theme.palette.info.dark}} />}
            label="TIMEZONE"
            bodyText={
              propertyOwner?.userAccount?.serviceCompany?.settings.timezone ||
              '-'
            }
            iconBackground={theme.palette.info.outlinedHoverBg}
            iconMaxHeight="3em"
            containerStyles={{mt: '0.5em'}}
          />
        </Grid>
      </Grid>
    </InfoCard>
  );
};
