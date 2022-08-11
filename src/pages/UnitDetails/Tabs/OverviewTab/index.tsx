import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigate, useParams} from 'react-router-dom';
import useTheme from '@mui/material/styles/useTheme';
import {Grid} from '@mui/material';
import {useElevatorById} from 'hooks/reactQuery/useElevator';
import {useElevatorInvoices} from 'hooks/reactQuery/useInvoice';
import {createEmptyResource} from 'utils/paging-utils';
import {ContractSimpleView, ContractStatus} from 'models/contract';
import {InvoiceStatus, InvoiceView} from 'models/invoice';
import {Button} from 'components/Button';
import {CustomButtonUnstyled} from 'components/CustomButtonUnstyled';
import {Progress} from 'components/Progress';
import {Unit} from './Unit';
import {Service} from './Service';
import {UnitDetails} from './UnitDetails';
import {RelatedContracts} from './RelatedContracts';
import {RelatedInvoices} from './RelatedInvoices';

export const OverviewTab = () => {
  const {id: elevatorId} = useParams();
  const {t} = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();
  const [validContract, setValidContract] = useState<ContractSimpleView>();

  const {data: elevator, isLoading: isLoadingElevator} =
    useElevatorById(elevatorId);

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

  if (isLoadingElevator || isLoadingElevatorInvoices) {
    return <Progress />;
  }

  return (
    <Grid container rowSpacing={2}>
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
            onClick: () => navigate('/units/report-issue'),
          }}
        />
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={4}>
          <Unit elevator={elevator!} />
        </Grid>
        <Grid item xs={12} lg={4}>
          Service Company
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
