import {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {sortBy} from 'lodash';
import Typography from '@mui/material/Typography';
import useTheme from '@mui/material/styles/useTheme';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import {ContactPhone, Contacts, Email} from '@mui/icons-material';
import {ElevatorView} from 'models/elevator';
import {InfoCard} from 'components/InfoCard';
import {CardProps} from 'components/CardProps';
import {useUserSession} from 'hooks/reactQuery/useUserSession';
import {useDownloadUrl} from 'hooks/reactQuery/useDownloadUrl';
import {useCompanyById} from 'hooks/reactQuery/useCompanies';

interface Props {
  containerStyles?: {[key: string]: any};
  elevator: ElevatorView;
}

export const ServiceCompany = ({containerStyles, elevator}: Props) => {
  const {t} = useTranslation();
  const theme = useTheme();
  const {user} = useUserSession();
  const {data: company} = useCompanyById(user?.userAccount.serviceCompany.id);
  const companyName = company?.name ?? '';
  const logoPath = company?.settings.whiteLabel?.logoPath ?? '';
  const {data: logoUrl} = useDownloadUrl(logoPath ? [logoPath] : []);

  const technician = useMemo(() => {
    if (elevator?.assignments && elevator.assignments?.length > 0) {
      const assignments = sortBy(elevator.assignments, (item) => [
        -item.weight,
        item.technician.userAccount.firstName,
        item.technician.userAccount.lastName,
      ])[0];

      return assignments.technician;
    }
    return null;
  }, [elevator?.assignments]);

  return (
    <InfoCard
      containerStyles={{...containerStyles}}
      header={
        <Typography variant="subtitle1">{t('Service Company')}</Typography>
      }
      showHeaderBackground
      headerStyles={{
        py: '0.25rem',
        px: '0.5rem',
      }}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <CardProps
            icon={<Avatar src={logoUrl ? logoUrl[0] : ''} />}
            iconMaxHeight="3rem"
            label={companyName ?? '-'}
            titleTextVariant="subtitle1"
            labelStyle={{color: theme.palette.text.primary}}
            bodyText={
              user?.userAccount.serviceCompany?.businessAddress?.fullName ?? '-'
            }
          />
        </Grid>
        <Grid item xs={12}>
          <CardProps
            icon={<Contacts sx={{color: theme.palette.info.dark}} />}
            iconBackground={theme.palette.info.outlinedHoverBg}
            iconMaxHeight="3rem"
            label={t('CONTACT PERSON')}
            bodyText={
              technician?.userAccount.firstName
                ? `${technician.userAccount.firstName} ${technician.userAccount.lastName}`
                : '-'
            }
          />
        </Grid>
        <Grid item xs={12}>
          <CardProps
            icon={<ContactPhone sx={{color: theme.palette.info.dark}} />}
            iconBackground={theme.palette.info.outlinedHoverBg}
            iconMaxHeight="3rem"
            label={t('PHONE')}
            bodyText={technician?.userAccount.contact.phone ?? '-'}
          />
        </Grid>
        <Grid item xs={12}>
          <CardProps
            icon={<Email sx={{color: theme.palette.info.dark}} />}
            iconBackground={theme.palette.info.outlinedHoverBg}
            iconMaxHeight="3rem"
            label={t('EMAIL')}
            bodyText={technician?.userAccount.contact.email ?? '-'}
          />
        </Grid>
      </Grid>
    </InfoCard>
  );
};
