import {useState} from 'react';
import {addDays, format} from 'date-fns';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import useTheme from '@mui/material/styles/useTheme';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import * as _ from 'lodash';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import {Bar} from 'react-chartjs-2';

import {ReactComponent as Elevation} from '../../assets/icons/Elevation.svg';
import {SplitButton} from '../../components/SplitButton';
import {getDay} from '../../utils/datetime';

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

enum TimeFrame {
  LAST_7_DAYS = 'LAST 7 DAYS',
  LAST_14_DAYS = 'LAST 14 DAYS',
  LAST_21_DAYS = 'LAST 21 DAYS',
}

function getDays(timeFrame: TimeFrame): Date[] {
  let number: number;
  switch (timeFrame) {
    case TimeFrame.LAST_7_DAYS: {
      number = 7;
      break;
    }
    case TimeFrame.LAST_14_DAYS: {
      number = 14;
      break;
    }
    case TimeFrame.LAST_21_DAYS: {
      number = 21;
      break;
    }
    default: {
      number = 7;
    }
  }

  const currentDate = new Date();
  const days: Date[] = [];
  for (let i = number; i > 0; i -= 1) {
    days.push(addDays(currentDate, -i));
  }
  return days;
}

function generateLabels(timeFrame: TimeFrame) {
  return getDays(timeFrame).map((day) => day.getDate());
}

function generateData(timeFrame: TimeFrame) {
  return getDays(timeFrame).map((day) => _.random(100, 800));
}

export const ElevatorAvailabilitySection = () => {
  const theme = useTheme();
  const [timeFrame, setTimeFrame] = useState(TimeFrame.LAST_7_DAYS);
  const barData = {
    labels: generateLabels(timeFrame),
    datasets: [
      {
        id: 1,
        label: 'Runs',
        data: generateData(timeFrame),
        backgroundColor: theme.palette.primary.main,
      },
    ],
  };

  function getStartDate(): Date {
    const days = getDays(timeFrame);
    return days[0];
  }
  function getEndDate(): Date {
    const days = getDays(timeFrame);
    return days[days.length - 1];
  }
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
              <Typography>{format(getStartDate(), 'MMM')}</Typography>
              <Typography>{format(getEndDate(), 'MMM')}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{background: '#F7F9FC', px: '20px', py: 1, display: 'flex'}}>
        <SplitButton
          selectedOption={timeFrame}
          options={[
            TimeFrame.LAST_7_DAYS,
            TimeFrame.LAST_14_DAYS,
            TimeFrame.LAST_21_DAYS,
          ]}
          onSelectedOptionChanged={(value) => setTimeFrame(value as TimeFrame)}
        />
        <Box ml={4} display="flex">
          <ArrowBackIosIcon sx={{mt: 1}} />
          <Typography variant="tableHeaderText" mt={1}>
            {`${getDay(getStartDate())} - ${getDay(getEndDate())}`}
          </Typography>

          <ArrowForwardIosIcon sx={{mt: 1}} />
        </Box>
      </Box>
    </Box>
  );
};
