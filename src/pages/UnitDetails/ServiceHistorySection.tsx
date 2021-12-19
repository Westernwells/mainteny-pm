import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import useTheme from '@mui/material/styles/useTheme';
import Divider from '@mui/material/Divider';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import * as _ from 'lodash';
import {createEmptyResource} from '../../utils/paging-utils';
import {fetchServiceHistoryByElevator} from '../../hooks/useServiceHistory';
import {Elevator, ElevatorMaintenanceHistoryView} from '../../models/elevator';
import {getDay} from '../../utils/datetime';
import {
  ServiceOrder,
  ServiceOrderStatus,
  ServiceOrderView,
} from '../../models/service-order';
import {StringMap} from '../../models/misc';
import {fetchServiceOrderByIds} from '../../hooks/useServiceOrder';
import {ReactComponent as Elevation} from '../../assets/icons/Elevation.svg';
import {ServiceOrderIcons} from '../../components/ServiceOrderIcons';
import {calculateNextVisitDate} from '../Units/Models';

export interface ServiceHistorySectionProp {
  elevator: Elevator;
  runningServiceOrder?: ServiceOrder | ServiceOrderView;
}

const pageSize = 50;
export const ServiceHistorySection = ({
  elevator,
  runningServiceOrder,
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
        {/* refactor this */}
        {runningServiceOrder && (
          <Box display="flex">
            <Box mr={1}>
              <Box
                sx={{
                  borderLeft: '1px dashed #9E9E9E',
                  height: 60,
                  ml: '11px',
                  zIndex: 1000,
                }}
              />
              <RadioButtonCheckedIcon sx={{mr: 1}} color="secondary" />
              <Box
                sx={{
                  borderLeft: '1px dashed #9E9E9E',
                  height: 100,
                  ml: '11px',
                }}
              />
            </Box>
            <Box
              sx={{
                border: `1px solid  ${theme.palette.secondary.main}`,
                boxShadow: '0px 4px 15px rgba(144, 144, 144, 0.4)',

                background: '#F7F9FC',
                borderRadius: '4px',
                py: 2,
                px: 3,
                mt: 4,
                flexGrow: 1,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Typography variant="h4" mr={3}>
                  {getDay(calculateNextVisitDate(runningServiceOrder))}
                </Typography>
                <Box flexGrow={1} mt={1} display="flex">
                  <ServiceOrderIcons
                    serviceOrderType={runningServiceOrder.type}
                    style={{width: '18px', height: '18px', mt: '3px', mr: 1}}
                  />
                  <Typography variant="largeBtnText">
                    {runningServiceOrder.type}
                  </Typography>
                </Box>
                <Chip
                  sx={{
                    py: 2,
                    color: theme.palette.secondary.main,
                    background: theme.palette.info.outlinedHoverBg,
                    mt: 1,
                    border: `1px solid  ${theme.palette.secondary.main}`,
                  }}
                  label={
                    <Typography
                      variant="largeBtnText"
                      sx={{textTransform: 'capitalize'}}
                    >
                      {runningServiceOrder.status}
                    </Typography>
                  }
                  size="medium"
                />
              </Box>
              <Divider sx={{mt: 1}} />
              <Typography pb={3} pt={1}>
                {runningServiceOrder.description}
              </Typography>
            </Box>
          </Box>
        )}

        {serviceHistories.data.map((history, index) => (
          <Box display="flex" key={history.id}>
            <Box>
              <Box
                sx={{
                  borderLeft: '1px dashed #9E9E9E',
                  height: 60,
                  ml: '11px',
                  zIndex: 1000,
                }}
              />
              <CheckCircleIcon
                sx={{mr: 1, color: theme.palette.text.disabled}}
              />
              <Box
                sx={{
                  borderLeft: '1px dashed #9E9E9E',
                  height: 100,
                  ml: '11px',
                }}
              />
            </Box>
            <Box
              sx={{
                border: null,
                boxShadow: '0px 4px 15px rgba(144, 144, 144, 0.4)',

                background: '#F7F9FC',
                borderRadius: '4px',
                py: 2,
                px: 3,
                mt: 4,
                flexGrow: 1,
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
                    serviceOrderType={
                      serviceOrderMap[history.serviceOrderId]?.type
                    }
                    style={{width: '18px', height: '18px', mt: '3px', mr: 1}}
                  />
                  <Typography variant="largeBtnText">
                    {serviceOrderMap[history.serviceOrderId]?.type}
                  </Typography>
                </Box>
                <Chip
                  sx={{
                    py: 2,
                    color: theme.palette.text.secondary,
                    background: '#FAFAFA',
                    mt: 1,
                    border: `1px solid  ${theme.palette.text.secondary}`,
                  }}
                  label={
                    <Typography
                      variant="largeBtnText"
                      sx={{textTransform: 'capitalize'}}
                    >
                      Completed
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
