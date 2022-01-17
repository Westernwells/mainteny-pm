import useTheme from '@mui/material/styles/useTheme';
import Box from '@mui/material/Box';
import {useServiceOrders} from 'hooks/reactQuery/useServiceOrder';
import {ElevatorCategory, ElevatorStatus} from 'models/elevator';
import {Address, Meta, Priority, State} from 'models/misc';
import {
  ServiceOrderStatus,
  ServiceOrderType,
  ServiceOrderView,
} from 'models/service-order';
import {IssueCard} from 'pages/UnitDetails/Tabs/IssueHistory/IssueCard';
import Button from '@mui/material/Button';
import {OpenInNew} from '@mui/icons-material';

const meta: Meta = {
  createdAt: '2021-01-12',
  creator: 'mainteny-admin',
  lastUpdatedAt: '2021-01-12',
  state: State.ACTIVE,
};
const address: Address = {
  id: 'add-001',
  fullName: 'McDonald',
  countryCode: 'DE',
  location: {
    longitude: 0,
    latitude: 0,
  },
};
const serviceOrder: ServiceOrderView = {
  id: 'abc123',
  number: 'ISS-12012',
  externalID: 'abc123',
  serviceCompany: {
    id: 'sc-001',
    name: 'AstraLift BV',
    meta,
  },
  elevator: {
    id: 'ele-001',
    propertyOwner: {
      id: 'cus-001',
      name: 'McDonald',
      serviceCompanyId: 'sc-001',
      address,
      contact: {
        phone: '+12 12345 67890',
        email: 'de@mcdonalds.com',
      },
      labels: [],
      additionalInfo: {
        priority: Priority.A,
      },
      meta,
    },
    number: '001',
    model: 'Schinder',
    type: 'Elevator',
    capacity: '200kg',
    category: ElevatorCategory.ELEVATOR,
    address,
    lastVisitDate: '2020-11-01',
    serviceTime: 10,
    status: ElevatorStatus.BROKEN,
    labels: [],
    additionalInfo: {
      isServiceOrderGenerationEnabled: true,
      priority: Priority.A,
    },
    meta,
  },
  description: 'Broken Elevator. 20 People struck inside.',
  type: ServiceOrderType.EMERGENCY,
  status: ServiceOrderStatus.COMPLETED,
  lastVisitDate: '2020-11-01',
  actualEndTime: '2021-01-13',
  dueDate: '2021-02-01',
  expectedVisitDate: '2021-02-01',
  schedules: [],
  search: '',
  labels: [],
  meta,
  additionalInfo: {
    appointmentConfirmed: true,
    appointmentNotificationRequired: true,
    appointmentNotificationSent: false,
    priority: Priority.A,
  },
};

export const RelatedTo = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        p: 8,
        background: theme.palette.inputBackground.main,
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      }}
    >
      <IssueCard serviceOrder={serviceOrder} />
      <Box
        sx={{display: 'flex', alignItems: 'flex-end', flexDirection: 'column'}}
      >
        <Button variant="contained" size="large" endIcon={<OpenInNew />}>
          More Details
        </Button>
      </Box>
    </Box>
  );
};
