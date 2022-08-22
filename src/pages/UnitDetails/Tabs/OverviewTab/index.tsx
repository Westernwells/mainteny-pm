import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigate, useParams} from 'react-router-dom';
import useTheme from '@mui/material/styles/useTheme';
import {Grid, Typography} from '@mui/material';
import {useElevatorInvoices} from 'hooks/reactQuery/useInvoice';
import {createEmptyResource} from 'utils/paging-utils';
import {ElevatorView} from 'models/elevator';
import {ContractSimpleView, ContractStatus} from 'models/contract';
import {InvoiceStatus, InvoiceView} from 'models/invoice';
import {Button} from 'components/Button';
import {Progress} from 'components/Progress';
import {Unit} from './Unit';
import {ServiceCompany} from './ServiceCompany';
import {Service} from './Service';
import {UnitDetails} from './UnitDetails';
import {RelatedContracts} from './RelatedContracts';
import {RelatedInvoices} from './RelatedInvoices';

interface Props {
  elevator: ElevatorView;
}

export const OverviewTab = ({elevator}: Props) => {
  const {id: elevatorId} = useParams();
  const theme = useTheme();
  const {t} = useTranslation();
  const navigate = useNavigate();
  const [validContract, setValidContract] = useState<ContractSimpleView>();

  const {
    data: elevatorInvoices = createEmptyResource<InvoiceView>(3),
    isLoading: isLoadingElevatorInvoices,
  } = useElevatorInvoices(
    elevatorId || '',
    {
      pageIndex: 0,
      pageSize: 3,
      query: '',
      status: Object.values(InvoiceStatus),
    },
    {
      enabled: !!elevatorId,
    },
  );

  useEffect(() => {
    if (elevator) {
      const result = elevator.contracts.filter(
        (item) => item.status === ContractStatus.VALID,
      );
      setValidContract(result[0]);
    }
  }, [elevator]);

  if (isLoadingElevatorInvoices) {
    return <Progress />;
  }

  return (
    <Grid container rowSpacing={2}>
      <Grid
        container
        justifyContent="space-between"
        alignItems="flex-end"
        py="1.25rem">
        <Grid item>
          <Typography variant="subtitle2">
            To change the data below, please contact the Service Manager,{' '}
            <Typography
              component="span"
              color={theme.palette.info.main}
              sx={{cursor: 'pointer', '&:hover': {textDecoration: 'underline'}}}
              onClick={() =>
                window.open(
                  `mailto:${elevator?.meta.creator?.contact.email}`,
                  '_blank',
                )
              }>
              {elevator?.meta.creator?.contact.email}
            </Typography>
          </Typography>
        </Grid>
        <Grid item>
          <Button
            label={t('Report Issue')}
            buttonProps={{
              variant: 'contained',
              size: 'large',
              onClick: () => navigate('/units/report-issue'),
            }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={4}>
          <Unit elevator={elevator!} />
        </Grid>
        <Grid item xs={12} lg={4}>
          <ServiceCompany elevator={elevator!} />
        </Grid>
        <Grid item xs={12} lg={4}>
          <Service elevator={elevator!} validContract={validContract} />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <UnitDetails elevator={elevator!} />
      </Grid>
      <Grid item xs={12}>
        <RelatedContracts contracts={elevator!.contracts} />
      </Grid>
      <Grid item xs={12}>
        <RelatedInvoices invoices={elevatorInvoices} />
      </Grid>
    </Grid>
  );
};
