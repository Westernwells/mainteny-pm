import {useEffect, useState, SyntheticEvent} from 'react';
import Box from '@mui/material/Box';
import {useNavigate, useParams} from 'react-router-dom';
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
import {ElevatorBasicSection} from './ElevatorBasicSection';
import {ServiceHistorySection} from './ServiceHistorySection';
import {TechnicianSection} from './TechnicianSection';
import {ElevatorBreakDownSection} from './ElevatorBreakDownSection';
import {ElevatorAvailabilitySection} from './ElevatorAvailabilitySection';

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
      // borderBottom: '2px solid red',
    },
  },
}));

const tabItem = [
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
  const theme = useTheme();
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
  return (
    <Box mb={4}>
      <Box
        sx={{
          backgroundColor: '#fff',
          paddingTop: 2,
          paddingBottom: 1,
          paddingLeft: '15px',
          boxShadow: '0px 0px 0px 1px #E0E0E0',
          borderRadius: '4px',
          mt: 10,
          transition: theme.transitions.create('all', {
            duration: theme.transitions.duration.shortest,
          }),
        }}
      >
        <Tabs
          className={classes.tabs}
          value={value}
          onChange={handleChange}
          textColor="secondary"
          aria-label="basic tabs example"
        >
          {tabItem.map((item) => (
            <Tab
              disableRipple
              iconPosition="start"
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
              {...a11yProps(0)}
              className={classes.tab}
            />
          ))}
        </Tabs>
      </Box>

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
