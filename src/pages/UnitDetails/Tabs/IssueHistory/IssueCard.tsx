import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useTheme from '@mui/material/styles/useTheme';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import GridOffIcon from '@mui/icons-material/GridOff';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import PendingIcon from '@mui/icons-material/Pending';
import Divider from '@mui/material/Divider';
import {CustomCard} from 'components/CustomCard';
import {
  ServiceOrderStatus,
  ServiceOrderType,
  ServiceOrderView,
} from 'models/service-order';
import {formatDate, toDate} from 'utils/datetime';
import {differenceInMinutes} from 'date-fns/esm';

interface Props {
  history: ServiceOrderView;
  selectedIssueHistory?: ServiceOrderView;
}

export const IssueCard = ({history, selectedIssueHistory}: Props) => {
  const theme = useTheme();
  const startTime = toDate(history.meta.createdAt);
  const endTime = history.actualEndTime
    ? toDate(history.actualEndTime)
    : new Date();
  const diffInHrs = differenceInMinutes(endTime, startTime) / 60;
  return (
    <CustomCard
      containerStyles={{
        background:
          selectedIssueHistory?.id === history.id
            ? theme.palette.secondary.outlinedHoverBg
            : 'none',
        border:
          selectedIssueHistory?.id === history.id
            ? ' 2px solid #00D1FF'
            : '1px solid #E0E0E0',
      }}
    >
      <>
        <Box
          sx={{
            background:
              selectedIssueHistory?.id === history.id
                ? theme.palette.secondary.outlinedHoverBg
                : theme.palette.inputBackground.main,
            px: 2,
            pt: 3,
          }}
        >
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h6">
              ISS{history.number.split('-')[1]} -{' '}
              {formatDate(history.meta.createdAt, 'dd MMM YYY')}
            </Typography>
            <Box display="flex">
              <Typography
                variant="largeBtnText"
                sx={{color: theme.palette.text.secondary}}
                mt="2px"
                mr={1}
              >
                {history.status === ServiceOrderStatus.COMPLETED
                  ? 'Resolved'
                  : 'Pending'}
              </Typography>
              {history.status === ServiceOrderStatus.COMPLETED ? (
                <CheckCircleIcon
                  color="success"
                  sx={{mt: '5px', height: '20px', width: '20px'}}
                />
              ) : (
                <PendingIcon
                  sx={{mt: '5px', height: '20px', width: '20px'}}
                  color="warning"
                />
              )}
            </Box>
          </Box>

          {history.type === ServiceOrderType.EMERGENCY ? (
            <Box display="flex" pt={3}>
              <GridOffIcon
                sx={{
                  color: theme.palette.action.active,
                  height: '15px',
                  width: '15px',
                  mt: '5px',
                }}
              />
              <Typography
                ml={1}
                mr={2}
                variant="mediumBtnText"
                sx={{color: theme.palette.warning.main}}
              >
                BREAKDOWN
              </Typography>
              <ArrowDownwardOutlinedIcon
                sx={{width: '16px', height: '16px', mt: '4px'}}
                color="error"
              />
              <Typography variant="mediumBtnText" ml={1} mr={1}>
                {Math.floor(diffInHrs)}h{' '}
                {Math.floor((diffInHrs - Math.floor(diffInHrs)) * 60)}m
              </Typography>
              <Typography
                variant="mediumBtnText"
                color={theme.palette.text.secondary}
              >
                Downtime
              </Typography>
            </Box>
          ) : null}

          <Divider sx={{mt: 1}} />
        </Box>
        <Box px={2} py={4}>
          <Typography variant="subtitle1">{history.description}</Typography>
        </Box>
      </>
    </CustomCard>
  );
};
