// TODO: we do not have the model in backend yet
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import useTheme from '@mui/material/styles/useTheme';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import {Bar} from 'react-chartjs-2';

import {ReactComponent as Elevation} from '../../assets/icons/Elevation.svg';
import {SplitButton} from '../../components/BtnGroup';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    yAxes: {
      ticks: {
        min: 0,
        max: 600,
        stepSize: 200,
        lineWidth: 3,
      },
    },
  },
};

export const ElevatorAvailabilitySection = () => {
  const theme = useTheme();

  const barData = {
    labels: ['22', '23', '24', '25', '26', '27', '28'],
    datasets: [
      {
        id: 1,
        label: 'Runs',
        data: [200, 400, 200, 600, 500, 300, 600],
        backgroundColor: theme.palette.primary.main,
      },
    ],
  };

  return (
    <Box
      sx={{
        background: '#fff',
        borderRadius: '8px',
        height: 500,
        boxShadow: '0px 4px 15px rgba(144, 144, 144, 0.4)',
      }}
    >
      <Box sx={{px: '20px'}} pt={2} pb={3}>
        <Box>
          <Box display="flex" mt={1}>
            <Typography
              variant="h6"
              mt={1}
              mr={8}
              flexGrow={1}
              color={theme.palette.primary.main}
            >
              Stats
            </Typography>
            <Box>
              <Elevation />
            </Box>
          </Box>
          <Box
            display="flex"
            sx={{
              background: theme.palette.background.default,
              px: 4,
              py: 2,
              mt: 3,
              borderRadius: '8px',
            }}
          >
            <Typography variant="h4" mr={2} color={theme.palette.success.main}>
              98%
            </Typography>
            <Typography variant="mediumBtnText" mr={2} mt={2} flexGrow={1}>
              AVAILABILITY
            </Typography>
            <Typography variant="h4" mr={2}>
              17:21
            </Typography>
            <Typography variant="mediumBtnText" mt={2}>
              {' '}
              HRS OF RUNTIME
            </Typography>
          </Box>
          <Box width="100%">
            <Box mt={2}>
              <Bar data={barData} options={options} height={220} />
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              ml="70px"
              mr="35px"
            >
              <Typography>Nov</Typography>
              <Typography>Nov</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{background: '#F7F9FC', px: '20px', py: 1, display: 'flex'}}>
        <SplitButton
          options={['Last 7 days', 'Last 14 days', 'Last 21 days']}
        />
        <Box ml={4} display="flex">
          <ArrowBackIosIcon sx={{mt: 1}} />
          <Typography variant="tableHeaderText" mt={1}>
            22 Nov 2021 - 28 Nov 2021
          </Typography>

          <ArrowForwardIosIcon sx={{mt: 1}} />
        </Box>
      </Box>
    </Box>
  );
};
