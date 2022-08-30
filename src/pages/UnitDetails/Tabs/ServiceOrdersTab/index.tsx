import {useEffect, useMemo, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {EmptySection} from 'components/EmptySection';
import {endOfYear, startOfYear} from 'date-fns';
import {Box, Grid, Typography} from '@mui/material';
import {InfoCard} from 'components/InfoCard';
import {MultipleSelectCheckmarks} from 'components/MultipleSelectCheckmarks';
import {Progress} from 'components/Progress';
import {useFetchServiceOrdersByElevator} from 'hooks/reactQuery/useServiceOrder';
import {useFetchServiceOrderInvoices} from 'hooks/reactQuery/useInvoice';
import {
  ServiceOrderStatus,
  serviceOrderStatusMap,
  serviceOrderStatusMapKey,
  ServiceOrderView,
} from 'models/service-order';
import {InvoiceView} from 'models/invoice';
import {generateYearsBetween, toRestDateTime} from 'utils/datetime';
import {serviceOrderStatusToString} from 'utils/service-order-utils';
import {formatCurrency} from 'utils/currency';
import {Details} from './Details';
import {WorkReport} from './WorkReport';
import {TimelineCard} from './Timeline/TimelineCard';
import {Invoices} from './Invoices';

interface Props {
  propertyOwnerId: string;
}

export const ServiceOrdersTab = ({propertyOwnerId}: Props) => {
  const {id: elevatorId = ''} = useParams();
  const {t} = useTranslation();
  const [year, setYear] = useState(new Date().getFullYear());
  const [status, setStatus] = useState<ServiceOrderStatus[]>([]);
  const [selectedServiceOrder, setSelectedServiceOrder] =
    useState<ServiceOrderView | null>(null);
  const {
    data: serviceOrders = {
      pages: [],
      pageParams: [],
    },
    isLoading: isLoadingServiceOrders,
  } = useFetchServiceOrdersByElevator(propertyOwnerId, {
    elevatorIds: [elevatorId],
    status,
    start: toRestDateTime(startOfYear(new Date(year, 0, 1))),
    end: toRestDateTime(endOfYear(new Date(year, 0, 1))),
    pageSize: 10,
    pageIndex: 0,
  });
  const {data: invoices = [], isLoading: isLoadingInvoices} =
    useFetchServiceOrderInvoices(selectedServiceOrder?.id, {
      enabled: !!selectedServiceOrder?.id,
    });

  const flatServiceOrders = useMemo(
    () => serviceOrders.pages.flatMap((i) => i.data),
    [serviceOrders.pages],
  );

  useEffect(() => {
    if (!selectedServiceOrder) {
      setSelectedServiceOrder(flatServiceOrders[0]);
    }
  }, [flatServiceOrders]);

  const cost = useMemo(() => {
    if (!invoices.length) {
      return '-';
    }

    const {currency, fractionDigits} = invoices[0].totalAmount;

    return formatCurrency(
      invoices.reduce(
        (prev, curr: InvoiceView) => prev + curr.totalAmount.netAmount,
        0,
      ) /
        10 ** fractionDigits,
      {
        currency,
      },
    );
  }, [invoices]);

  const renderEmptySection = () => (
    <InfoCard
      disabledHeader
      containerStyles={{
        mb: '1.2rem',
        padding: '11rem 0 11rem 0',
      }}
      bodyContainerStyle={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <EmptySection
        illustration="clipboard"
        size="tiny"
        containerStyle={{width: '60%'}}
        label={t('No service order yet.')}
      />
    </InfoCard>
  );

  if (
    isLoadingServiceOrders ||
    isLoadingInvoices ||
    (flatServiceOrders.length && !selectedServiceOrder)
  ) {
    return <Progress />;
  }

  if (flatServiceOrders.length === 0) {
    return renderEmptySection();
  }

  return (
    <Grid container columnSpacing={3}>
      <Grid item xs={4}>
        <InfoCard
          header={<Typography variant="subtitle1">{t('Timeline')}</Typography>}
          showHeaderBackground
          headerStyles={{
            py: '0.25rem',
            px: '0.5rem',
            mx: '1em',
          }}
          containerStyles={{
            px: 0,
            height: '100%',
            overflowY: 'auto',
          }}>
          <Grid container spacing={2} px="1em">
            <Grid item xs={6}>
              <MultipleSelectCheckmarks
                label={t('Year')}
                formControlStyles={{
                  width: '100%',
                }}
                options={generateYearsBetween({
                  startYear: 2015,
                }).reverse()}
                initialSelectedItems={[year]}
                getSelectedValue={(y) => setYear(Number(y))}
                multiple={false}
                disableClearBtn
              />
            </Grid>
            <Grid item xs={6}>
              <MultipleSelectCheckmarks
                label={t('Status')}
                formControlStyles={{
                  width: '100%',
                }}
                options={[
                  ServiceOrderStatus.READY_TO_SCHEDULE,
                  ServiceOrderStatus.SCHEDULED,
                  ServiceOrderStatus.IN_PROGRESS,
                  ServiceOrderStatus.COMPLETED,
                  ServiceOrderStatus.CANCELLED,
                  ServiceOrderStatus.EXPIRED,
                ].map((item) => serviceOrderStatusToString(item))}
                getSelectedValue={(item) =>
                  setStatus(
                    item.map(
                      (i) =>
                        serviceOrderStatusMap[i as serviceOrderStatusMapKey],
                    ),
                  )
                }
              />
            </Grid>
          </Grid>
          <Box mt="1rem">
            {flatServiceOrders.map((serviceOrder) => (
              <TimelineCard
                key={serviceOrder.id}
                serviceOrder={serviceOrder}
                onClick={(sO) => setSelectedServiceOrder(sO)}
                isSelected={serviceOrder.id === selectedServiceOrder?.id}
              />
            ))}
          </Box>
        </InfoCard>
      </Grid>
      <Grid item xs={8} container spacing={2}>
        <Grid item xs={12}>
          <Details serviceOrder={selectedServiceOrder!} />
        </Grid>
        <Grid item xs={12}>
          <WorkReport serviceOrder={selectedServiceOrder!} cost={cost} />
        </Grid>
        <Grid item xs={12}>
          <Invoices invoices={invoices} />
        </Grid>
      </Grid>
    </Grid>
  );
};
