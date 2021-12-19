import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {useNavigate, useParams} from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';

import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import {Elevator} from '../../models/elevator';
import {ServiceOrderView} from '../../models/service-order';
import {fetchElevator} from '../../hooks/useElevator';
import {fetchRunningServiceOrdersByElevator} from '../../hooks/useServiceOrder';
import {Resource} from '../../models/misc';
import {ElevatorBasicSection} from './ElevatorBasicSection';
import {ServiceHistorySection} from './ServiceHistorySection';
import {TechnicianSection} from './TechnicianSection';
import {createEmptyResource} from '../../utils/paging-utils';
import {ElevatorBreakDownSection} from './ElevatorBreakDownSection';
import {ElevatorAvailabilitySection} from './ElevatorAvailabilitySection';

const pageSize = 10;
export interface UnitsDetailProps {
  stopLoading: () => void;
}
// TODO: enable the rule again
// eslint-disable-next-line
export const UnitsDetail = ({stopLoading}: UnitsDetailProps) => {
  const [elevator, setElevator] = useState<Elevator>();
  const navigate = useNavigate();
  const [runningServiceOrders, setRunningServiceOrders] = useState<
    ServiceOrderView[]
  >([]);
  const [isLoading, setLoading] = useState(true);
  const {id: elevatorId} = useParams();
  useEffect(() => {
    const doLoad = async () => {
      const data = await Promise.all([
        fetchElevator(elevatorId!!),
        fetchRunningServiceOrdersByElevator(elevatorId!!),
      ]);
      setElevator(data[0]);
      setRunningServiceOrders(data[1]);
      setLoading(false);
      stopLoading();
    };
    doLoad();
  }, []);

  if (isLoading) {
    return <Box>Loading...</Box>;
  }
  return (
    <Box mb={4}>
      <Box display="flex">
        <Box
          mt={1}
          sx={{cursor: 'pointer'}}
          onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            e.preventDefault();
            navigate(`/units`);
          }}
        >
          <ArrowBackIosIcon sx={{color: 'rgba(0, 0, 0, 0.54)'}} />
        </Box>
        <Box>
          <Typography variant="h4">Unit Details</Typography>
        </Box>
      </Box>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Unit Overview
        </Link>
        <Link underline="hover" color="inherit" href="/">
          Unit Details
        </Link>
      </Breadcrumbs>

      <Box>
        <Box mt={3} display="flex">
          <Box mr={2} minWidth="32%">
            <ElevatorBasicSection
              elevator={elevator as Elevator}
              serviceOrder={runningServiceOrders[0]}
            />
          </Box>
          <Box maxWidth="22%" mr={2}>
            {runningServiceOrders.length > 0 && (
              <TechnicianSection serviceOrder={runningServiceOrders[0]} />
            )}
          </Box>
          <Box flexGrow={1}>
            <ElevatorAvailabilitySection />
          </Box>
        </Box>
        <Box mt={4} display="flex" height="40%">
          <Box width="55%" mr={2}>
            <ServiceHistorySection elevator={elevator as Elevator} />
          </Box>
          <Box sx={{}} flexGrow={1}>
            <ElevatorBreakDownSection />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
