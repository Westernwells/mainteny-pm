import {useEffect, useState, SyntheticEvent} from 'react';
import Box from '@mui/material/Box';
import {useParams} from 'react-router-dom';
import makeStyles from '@mui/styles/makeStyles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import {Theme} from '@mui/material/styles';
import useTheme from '@mui/material/styles/useTheme';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import ElevatorIcon from '@mui/icons-material/Elevator';
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import GridOffIcon from '@mui/icons-material/GridOff';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import {Elevator} from 'models/elevator';
import {ServiceOrderView} from 'models/service-order';
import {fetchElevator} from 'hooks/reactQuery/useElevator';
import {fetchRunningServiceOrdersByElevator} from '../../hooks/reactQuery/useServiceOrder';
import {OverviewTab} from './components/Tabs/OverviewTab';
import {MaintenanceHistoryTab} from './components/Tabs/MaintenanceHistoryTab';

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
    label: 'Breakdown History',
    icon: <GridOffIcon />,
  },
  {
    label: 'Performance',
    icon: <GraphicEqIcon />,
  },
  {
    label: 'Logged Service Calls',
    icon: <MiscellaneousServicesIcon />,
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
  const [elevator, setElevator] = useState<Elevator>();
  const [value, setValue] = useState(0);
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
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
    };
    doLoad();
  }, []);

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  const tabPanel = () => {
    switch (value) {
      case 0:
        return (
          <OverviewTab
            elevator={elevator as Elevator}
            runningServiceOrders={runningServiceOrders}
          />
        );
      case 2:
        return <MaintenanceHistoryTab elevator={elevator as Elevator} />;

      default:
        return null;
    }
  };

  return (
    <Box mb={4}>
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
      <Box sx={{height: '80vh', overflowY: 'scroll', px: 5, mt: '1px'}}>
        {tabPanel()}
      </Box>
    </Box>
  );
};
