import {useTranslation} from 'react-i18next';
import {useParams} from 'react-router-dom';
import useTheme from '@mui/material/styles/useTheme';
import {Grid} from '@mui/material';
import {useElevatorById} from 'hooks/reactQuery/useElevator';
import {Button} from 'components/Button';
import {CustomButtonUnstyled} from 'components/CustomButtonUnstyled';
import {Progress} from 'components/Progress';
import {Unit} from './Unit';

export const OverviewTab = () => {
  const {id: elevatorId} = useParams();
  const {t} = useTranslation();
  const theme = useTheme();

  const {data: elevator, isLoading: isLoadingElevator} =
    useElevatorById(elevatorId);

  if (isLoadingElevator) {
    return <Progress />;
  }

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
          <Unit elevator={elevator!} />
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
