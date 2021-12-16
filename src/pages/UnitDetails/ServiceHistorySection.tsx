import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import useTheme from '@mui/material/styles/useTheme';
import Divider from '@mui/material/Divider';

import * as _ from 'lodash';
import {createEmptyResource} from '../../utils/paging-utils';
import {fetchServiceHistoryByElevator} from '../../hooks/useServiceHistory';
import {Elevator, ElevatorMaintenanceHistoryView} from '../../models/elevator';
import {getDay} from '../../utils/datetime';
import {
  ServiceOrderStatus,
  ServiceOrderType,
  ServiceOrderView,
} from '../../models/service-order';
import {StringMap} from '../../models/misc';
import {fetchServiceOrderByIds} from '../../hooks/useServiceOrder';
import {ReactComponent as Elevation} from '../../assets/icons/Elevation.svg';
import {ServiceOrderIcons} from '../../components/ServiceOrderIcons';

export interface ServiceHistorySectionProp {
  elevator: Elevator;
}

const pageSize = 50;
export const ServiceHistorySection = ({
  elevator,
}: ServiceHistorySectionProp) => {
  const theme = useTheme();
  const [isLoading, setLoading] = useState(true);
  const [serviceHistories, setServiceHistories] = useState(
    createEmptyResource<ElevatorMaintenanceHistoryView>(pageSize),
  );
  const [serviceOrderMap, setServiceOrderMap] = useState<
    StringMap<ServiceOrderView>
  >({});

  useEffect(() => {
    const doLoad = async () => {
      const histories = await fetchServiceHistoryByElevator(elevator.id);
      setServiceHistories(histories);

      const serviceOrders = await fetchServiceOrderByIds(
        histories.data.map((history) => history.serviceOrderId),
      );
      setServiceOrderMap(_.keyBy(serviceOrders, (order) => order.id));

      setLoading(false);
    };
    doLoad();
  }, []);

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box
      sx={{
        background: '#fff',
        borderRadius: '8px',
        height: 650,
        pt: 2,
        px: '20px',
      }}
      pt={2}
      pb={3}
      px={2}
    >
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h6">
          Maintenance History ({serviceHistories.total})
        </Typography>
        <Elevation />
      </Box>

      <Box pt={4} height="84%" sx={{overflowY: 'scroll'}}>
        {serviceHistories.data.map((history, index) => (
          <Box
            sx={{
              border:
                index === 0
                  ? `1px solid  ${theme.palette.secondary.main}`
                  : null,
              boxShadow: '0px 4px 15px rgba(144, 144, 144, 0.4)',

              background: '#F7F9FC',
              borderRadius: '4px',
              py: 2,
              px: 3,
              mt: 4,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Typography variant="h4" mr={3}>
                {getDay(history.createdAt)}
              </Typography>
              <Box flexGrow={1} mt={1} display="flex">
                <ServiceOrderIcons
                  serviceOrderType={ServiceOrderType.REPAIR}
                  style={{width: '18px', height: '18px', mt: '3px', mr: 1}}
                />
                <Typography variant="largeBtnText">
                  {serviceOrderMap[history.serviceOrderId]?.type}
                </Typography>
              </Box>
              <Chip
                sx={{
                  py: 2,
                  color:
                    index === 0
                      ? theme.palette.secondary.main
                      : theme.palette.text.secondary,
                  background:
                    index === 0
                      ? theme.palette.info.outlinedHoverBg
                      : '#FAFAFA',
                  mt: 1,
                  border:
                    index === 0
                      ? `1px solid  ${theme.palette.secondary.main}`
                      : `1px solid  ${theme.palette.text.secondary}`,
                }}
                label={
                  <Typography
                    variant="largeBtnText"
                    sx={{textTransform: 'capitalize'}}
                  >
                    {serviceOrderMap[history.serviceOrderId]?.status ===
                    ServiceOrderStatus.SCHEDULED
                      ? 'Upcoming'
                      : ServiceOrderStatus.SCHEDULED}
                  </Typography>
                }
                size="medium"
              />
            </Box>
            <Divider sx={{mt: 1}} />
            <Typography pb={3} pt={1}>
              {history.description}
            </Typography>
          </Box>
        ))}
      </Box>
      <Typography
        variant="h6"
        py={2}
        textAlign="center"
        color={theme.palette.info.main}
      >
        More...
      </Typography>
    </Box>
  );
};
