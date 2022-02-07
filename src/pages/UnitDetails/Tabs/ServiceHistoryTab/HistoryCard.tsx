import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import useTheme from '@mui/material/styles/useTheme';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import IconButton from '@mui/material/IconButton';
import {CardAlert} from 'components/CardAlert';
import {MaintenanceBasicInfo} from './ServiceBasicInfo';
import {HistoryCardHeader} from './HistoryCardHeader';

interface Props {
  bodyContainerStyle?: {[key: string]: string | number};
  containerStyles?: {[key: string]: string | number};
  showTimeCategory?: boolean;
  isDetailCard?: boolean;
  headerActionIcon?: JSX.Element;
  minHeight?: string | number;
  removeShadows?: boolean;
  removeTopLeftRadius?: boolean;
  removeTopRightRadius?: boolean;
  removeBottomLeftRadius?: boolean;
  removeBottomRightRadius?: boolean;
  removeServiceOrderType?: boolean;
  removeServiceOrderStatus?: boolean;
  headerTitle?: string;
  subtitle?: string;
  showMoreReportDetails?: boolean;
  showAlert?: boolean;
}

export const HistoryCard = ({
  bodyContainerStyle,
  showTimeCategory,
  isDetailCard,
  headerActionIcon,
  minHeight,
  removeShadows,
  removeTopLeftRadius,
  removeTopRightRadius,
  removeBottomLeftRadius,
  removeBottomRightRadius,
  containerStyles,
  removeServiceOrderType,
  removeServiceOrderStatus,
  headerTitle,
  subtitle,
  showMoreReportDetails,
  showAlert,
}: Props) => {
  const theme = useTheme();
  return (
    <Card
      sx={{
        border: 'none',
        boxShadow: removeShadows ? 'none' : 'default',
        borderTopLeftRadius: removeTopLeftRadius ? 0 : 'default',
        borderTopRightRadius: removeTopRightRadius ? 0 : 'default',
        borderBottomRightRadius: removeBottomRightRadius ? 0 : 'default',
        borderBottomLeftRadius: removeBottomLeftRadius ? 0 : 'default',
        minHeight,
        ...containerStyles,
      }}
    >
      <CardHeader
        sx={{pb: '0.4em'}}
        action={
          headerActionIcon ? <IconButton>{headerActionIcon}</IconButton> : null
        }
        title={
          <HistoryCardHeader
            isDetailCard={isDetailCard}
            removeServiceOrderType={removeServiceOrderType}
            removeServiceOrderStatus={removeServiceOrderStatus}
            headerTitle={headerTitle}
            subtitle={subtitle}
          />
        }
      />
      <CardContent
        sx={{
          py: 0,
          mt: isDetailCard ? '2em' : 'default',
          ...bodyContainerStyle,
        }}
      >
        <Typography variant={isDetailCard ? 'body1' : 'caption'}>
          Checked the inner shaft of the elevator engine door....
        </Typography>

        {showTimeCategory ? (
          <Box display="flex" mt="2.5em">
            <MaintenanceBasicInfo
              label="Scheduled Time"
              bodyTextVariant="subtitle1"
              icon={<TimerOutlinedIcon color="info" />}
              iconBackground={theme.palette.info.outlinedHoverBg}
              bodyText="24 Sep 2021, 5 PM - 7PM "
            />
            <MaintenanceBasicInfo
              label="Preferred Time"
              bodyTextVariant="body1"
              icon={<TimerOutlinedIcon color="warning" />}
              iconBackground={theme.palette.warning.outlinedHoverBg}
              bodyText="24 Sep 2021, 3PM"
            />
          </Box>
        ) : null}

        {showMoreReportDetails ? (
          <Box display="flex" mt="2.5em">
            <MaintenanceBasicInfo
              label="Technician"
              bodyTextVariant="body1"
              icon={<TimerOutlinedIcon color="info" />}
              iconBackground={theme.palette.info.outlinedHoverBg}
              bodyText="John Doe"
            />
            <MaintenanceBasicInfo
              label="Cost"
              bodyTextVariant="caption"
              icon={<TimerOutlinedIcon color="success" />}
              iconBackground={theme.palette.success.outlinedHoverBg}
              bodyText="9,700 EUR"
            />

            <MaintenanceBasicInfo
              label="Duration"
              bodyTextVariant="body1"
              icon={<TimerOutlinedIcon color="warning" />}
              iconBackground={theme.palette.warning.outlinedHoverBg}
              bodyText="45 mins"
            />
          </Box>
        ) : null}
        {showAlert ? (
          <CardAlert message="Chris Anderson will be visiting your location in the next 20 minutes" />
        ) : null}
      </CardContent>
    </Card>
  );
};
