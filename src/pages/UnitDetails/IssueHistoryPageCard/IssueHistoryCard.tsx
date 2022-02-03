import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import GridOffIcon from '@mui/icons-material/GridOff';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import useTheme from '@mui/material/styles/useTheme';
import PendingIcon from '@mui/icons-material/Pending';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
  ServiceOrderStatus,
  ServiceOrderType,
  ServiceOrderView,
} from 'models/service-order';
import {formatDate, toDate} from 'utils/datetime';
import {differenceInMinutes} from 'date-fns';

interface Props {
  bodyContainerStyle?: {[key: string]: string | number};
  history: ServiceOrderView;
}

export const IssueHistoryCard = ({bodyContainerStyle, history}: Props) => {
  const theme = useTheme();
  const startTime = toDate(history.meta.createdAt);
  const endTime = history.actualEndTime
    ? toDate(history.actualEndTime)
    : new Date();
  const diffInHrs = differenceInMinutes(endTime, startTime) / 60;
  const renderHeader = () => (
    <Box display="flex" justifyContent="space-between">
      <Box display="flex">
        <Typography variant="subtitle1" sx={{mr: '0.4em'}}>
          #ISSUE-ISS{Number(history.number.split('-')[1])}
        </Typography>
        <Typography
          variant="caption"
          sx={{mt: '0.3em'}}
          color={theme.palette.text.secondary}
        >
          Created on {formatDate(history.meta.createdAt, 'dd MMM YYY')}{' '}
        </Typography>
      </Box>

      <Box display="flex">
        {history.type === ServiceOrderType.EMERGENCY ? (
          <Box display="flex" mr="0.7em">
            <Box>
              <GridOffIcon
                sx={{width: '0.947rem', height: '0.947rem', mt: '0.3em'}}
              />
            </Box>
            <Box ml="0.4em">
              <Typography variant="caption" color={theme.palette.warning.main}>
                BREAKDOWN
              </Typography>
            </Box>
          </Box>
        ) : null}

        {history.type === ServiceOrderType.EMERGENCY ? (
          <Box display="flex" mr="0.5em">
            <Box mt="0.2em">
              <ArrowDownwardOutlinedIcon
                sx={{width: '1rem', height: '1rem'}}
                color="error"
              />
            </Box>
            <Box ml="0.3em">
              <Typography variant="caption" color="primary" mr="0.5em">
                {Math.floor(diffInHrs)}h{' '}
                {Math.floor((diffInHrs - Math.floor(diffInHrs)) * 60)}m
              </Typography>
              <Typography
                variant="caption"
                color={theme.palette.text.secondary}
              >
                downtime
              </Typography>
            </Box>
          </Box>
        ) : null}

        <Box display="flex">
          <Box mr="0.2em">
            <Typography variant="chip" color={theme.palette.text.secondary}>
              {history.status === ServiceOrderStatus.COMPLETED
                ? 'Resolved'
                : 'Pending'}
            </Typography>
          </Box>
          <Box mt="0.1em">
            {history.status === ServiceOrderStatus.COMPLETED ? (
              <CheckCircleIcon
                color="success"
                sx={{mt: '0.3em', height: '0.833rem', width: '0.833rem'}}
              />
            ) : (
              <PendingIcon
                sx={{mt: '0.3em', height: '0.833rem', width: '0.833rem'}}
                color="warning"
              />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Card sx={{border: 'none', boxShadow: 'none'}}>
      <CardHeader sx={{pb: '0.4em'}} title={renderHeader()} />
      <CardContent sx={{py: 0, ...bodyContainerStyle}}>
        <Typography variant="caption">{history.description}</Typography>
      </CardContent>
    </Card>
  );
};
