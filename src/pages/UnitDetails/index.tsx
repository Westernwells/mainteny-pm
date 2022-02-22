import {useState, SyntheticEvent} from 'react';
import Box from '@mui/material/Box';
import {useParams, useNavigate} from 'react-router-dom';
import makeStyles from '@mui/styles/makeStyles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import ArrowBack from '@mui/icons-material/ArrowBack';
import useTheme from '@mui/material/styles/useTheme';
import {
  useElevatorById,
  useElevatorMaintainers,
} from 'hooks/reactQuery/useElevator';
import {OverviewTab} from './Tabs/OverviewTab';
import {ServiceHistoryTab} from './Tabs/ServiceHistoryTab';
import {TabsBody} from './Tabs';

const pageSize = 10;

const useStyles = makeStyles(() => {
  const theme = useTheme();
  return {
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
  };
});

const tabItems = [
  {
    label: 'Overview',
    icon: <ManageSearchIcon />,
  },
  {
    label: 'Service History',
    icon: <EngineeringOutlinedIcon />,
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
  const {id: elevatorId} = useParams();
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const navigate = useNavigate();
  const classes = useStyles();

  const {data: elevator} = useElevatorById(elevatorId);

  const {data: maintainers = []} = useElevatorMaintainers(elevatorId);

  return (
    <Box
      sx={{
        pb: '1em',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          paddingLeft: '35px',
          mt: 11,
        }}
      >
        <ArrowBack
          onClick={() => navigate(-1)}
          sx={{
            cursor: 'pointer',
            color: theme.palette.text.secondary,
            my: 'auto',
            mr: '40px',
          }}
        />
        <Tabs
          className={classes.tabs}
          value={value}
          onChange={(e: any, newValue: number) => setValue(newValue)}
          textColor="secondary"
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
          px: '2.5em',
          mt: 2,
          '::-webkit-scrollbar': {
            width: 0,
            background: 'transparent',
          },
        }}
      >
        <TabsBody value={value} index={0}>
          <OverviewTab elevator={elevator} maintainers={maintainers} />;
        </TabsBody>

        <TabsBody value={value} index={1}>
          <ServiceHistoryTab />
        </TabsBody>
      </Box>
    </Box>
  );
};
