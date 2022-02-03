import {useEffect, useState, SyntheticEvent} from 'react';
import Box from '@mui/material/Box';
import {useParams} from 'react-router-dom';
import makeStyles from '@mui/styles/makeStyles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import {Theme} from '@mui/material/styles';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import ElevatorIcon from '@mui/icons-material/Elevator';
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import GridOffIcon from '@mui/icons-material/GridOff';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import {startOfDay, endOfMonth} from 'date-fns';
import {toRestDateTime} from 'utils/datetime';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import {
  Elevator,
  ElevatorMaintenanceHistoryView as ServiceHistoryView,
} from 'models/elevator';
import {ServiceOrderView} from 'models/service-order';
import {createEmptyResource, makePage} from 'utils/paging-utils';
import {useServiceHistory} from 'hooks/reactQuery/useServiceHistory';
import {
  useElevatorById,
  useElevatorMaintainers,
} from 'hooks/reactQuery/useElevator';
import {useServiceOrders} from '../../hooks/reactQuery/useServiceOrder';
import {OverviewTab} from './Tabs/OverviewTab';
import {MaintenanceHistoryTab} from './Tabs/MaintenanceHistoryTab';
import {IssueHistory} from './Tabs/IssueHistory';

const pageSize = 10;

const useStyles = makeStyles((theme: Theme) => ({
  tabs: {
    '& .MuiTabs-indicator': {
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'transparent',
    },
  },
  tab: {
    '&.MuiTab-textColorPrimary': {
      color: theme.palette.primary.main,
    },
    '&.Mui-selected': {
      color: '#fff',
      background: theme.palette.primary.main,
      borderRadius: '8px',
    },
  },
}));

const tabItems = [
  {
    label: 'Overview',
    icon: <ManageSearchIcon />,
  },
  {
    label: 'Unit Info',
    icon: <ElevatorIcon />,
  },
  {
    label: 'Maintenance History',
    icon: <EngineeringOutlinedIcon />,
  },
  {
    label: 'Issue History',
    icon: <GridOffIcon />,
  },
  {
    label: 'Performance',
    icon: <GraphicEqIcon />,
  },
];

const a11yProps = (index: number) => ({
  id: `simple-tab-${index}`,
  'aria-controls': `simple-tabpanel-${index}`,
});

// TODO: enable the rule again
// eslint-disable-next-line
export const UnitsDetail = () => {
  const classes = useStyles();
  const {id: elevatorId} = useParams();
  const [value, setValue] = useState(0);
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const {data: elevator} = useElevatorById(elevatorId);

  const {data: serviceOrder = createEmptyResource<ServiceOrderView>(pageSize)} =
    useServiceOrders({
      elevatorIds: elevatorId,
      start: toRestDateTime(startOfDay(new Date())),
      end: toRestDateTime(endOfMonth(new Date())),
      pageSize: 4,
      pageIndex: 0,
      query: '',
    });

  const {data: maintainers = []} = useElevatorMaintainers(elevatorId);

  const tabPanel = () => {
    switch (value) {
      case 0:
        return <OverviewTab elevator={elevator} maintainers={maintainers} />;
      case 2:
        return null;
      // <MaintenanceHistoryTab
      //   runningServiceOrders={serviceOrder.data}
      //   selectedServiceHistory={selectedServiceHistory}
      //   setSelectedServiceHistory={setSelectedServiceHistory}
      //   serviceHistories={serviceHistories}
      // />

      case 3:
        return <IssueHistory />;

      default:
        return null;
    }
  };

  return (
    <Box>
      <Box
        sx={{
          backgroundColor: '#fff',
          paddingTop: 2,
          paddingBottom: 1,
          paddingLeft: '15px',
          boxShadow: '0px 4px 15px  rgba(144, 144, 144, 0.2)',
          borderRadius: '4px',
          mt: 10,
        }}
      >
        <Tabs
          className={classes.tabs}
          value={value}
          onChange={handleChange}
          textColor="secondary"
          aria-label="basic tabs example"
        >
          {tabItems.map((item, index) => (
            <Tab
              key={`${item.label}`}
              disableRipple
              label={
                <Box
                  display="flex"
                  sx={{borderBottom: '2px solid #fff', px: 1}}
                >
                  {item.icon}
                  <Typography mb={1} sx={{ml: 1}}>
                    {item.label}
                  </Typography>
                </Box>
              }
              sx={{height: 30, textTransform: 'capitalize'}}
              {...a11yProps(index)}
              className={classes.tab}
            />
          ))}
        </Tabs>
      </Box>
      <Box
        sx={{
          height: '80vh',
          overflowY: 'scroll',
          px: 5,
          mt: '1px',
          '::-webkit-scrollbar': {
            width: 0,
            background: 'transparent',
          },
        }}
      >
        {tabPanel()}
      </Box>
    </Box>
  );
};
