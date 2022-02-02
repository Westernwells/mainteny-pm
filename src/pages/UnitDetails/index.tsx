import {useEffect, useState, SyntheticEvent} from 'react';
import Box from '@mui/material/Box';
import {useParams, useNavigate} from 'react-router-dom';
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
import ArrowBack from '@mui/icons-material/ArrowBack';
import useTheme from '@mui/material/styles/useTheme';
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
      color: theme.palette.primary.main,
      '& .item-label': {
        '&::before': {
          backgroundColor: theme.palette.primary.main,
        },
        '& .item-icon': {
          color: theme.palette.secondary.main,
        },
      },
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
  const theme = useTheme();
  const navigate = useNavigate();
  const classes = useStyles();
  const {id: elevatorId} = useParams();
  const [value, setValue] = useState(0);
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const [selectedServiceHistory, setSelectedServiceHistory] =
    useState<ServiceHistoryView>();
  const {
    data: serviceHistories = createEmptyResource<ServiceHistoryView>(pageSize),
  } = useServiceHistory(makePage(0, 10), elevatorId);
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
        return (
          <OverviewTab
            elevator={elevator}
            runningServiceOrders={serviceOrder.data}
            serviceHistories={serviceHistories}
            maintainers={maintainers}
          />
        );
      case 2:
        return (
          <MaintenanceHistoryTab
            runningServiceOrders={serviceOrder.data}
            selectedServiceHistory={selectedServiceHistory}
            setSelectedServiceHistory={setSelectedServiceHistory}
            serviceHistories={serviceHistories}
          />
        );

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
          display: 'flex',
          backgroundColor: '#fff',
          paddingTop: 2,
          paddingBottom: 1,
          paddingLeft: '15px',
          boxShadow: '0px 4px 15px  rgba(144, 144, 144, 0.2)',
          borderRadius: '4px',
          mt: 10,
        }}
      >
        <ArrowBack
          onClick={() => navigate(-1)}
          sx={{
            cursor: 'pointer',
            color: theme.palette.text.secondary,
            my: 'auto',
          }}
        />
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
                  className="item-label"
                  sx={{
                    position: 'relative',
                    alignItems: 'center',
                    px: 1,
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      backgroundColor: 'transparent',
                      borderRadius: '3px',
                      width: '124px',
                      height: '3px',
                      bottom: '0',
                      left: '50%',
                      transform: 'translateX(-50%)',
                    },
                  }}
                >
                  <Box className="item-icon">{item.icon}</Box>
                  <Typography mb={1} sx={{ml: 1}} variant="subtitle1">
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
