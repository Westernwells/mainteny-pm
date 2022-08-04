import {useTranslation} from 'react-i18next';
import useTheme from '@mui/material/styles/useTheme';
import {Grid} from '@mui/material';
import {Button} from 'components/Button';
import {CustomButtonUnstyled} from 'components/CustomButtonUnstyled';

export const OverviewTab = () => {
  const {t} = useTranslation();
  const theme = useTheme();

  return (
    <Grid container spacing={2}>
      <Grid item ml="auto" py="1.25rem">
        <CustomButtonUnstyled
          label={t('Change Information')}
          size="large"
          onClick={() => {}}
          styles={{
            '&:hover': {
              background: theme.palette.primary.outlinedHoverBg,
            },
          }}
        />
        <Button
          label={t('Report Issue')}
          buttonProps={{
            variant: 'contained',
            size: 'large',
            sx: {
              marginLeft: '0.625rem',
            },
            onClick: () => {},
          }}
        />
      </Grid>
      <Grid container>
        <Grid item xs={12} lg={4}>
          Unit
        </Grid>
        <Grid item xs={12} lg={4}>
          Service Company
        </Grid>
        <Grid item xs={12} lg={4}>
          Service
        </Grid>
      </Grid>
      <Grid item xs={12}>
        Unit Details
      </Grid>
      <Grid item xs={12}>
        Related Contracts
      </Grid>
      <Grid item xs={12}>
        Related Invoices
      </Grid>
    </Grid>
  );
};
