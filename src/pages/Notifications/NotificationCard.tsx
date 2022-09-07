import {useMemo} from 'react';
import {useNavigate} from 'react-router-dom';
import Box, {BoxProps} from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import useTheme from '@mui/material/styles/useTheme';
import {useTranslation} from 'react-i18next';
import {
  ContractExpiryAlertData,
  MessageType,
  NotificationMessage,
  ServiceOrderScheduleAlertData,
} from 'models/notification';
import {
  notificationButtonLabel,
  notificationJSONDataToObject,
  notificationSubtitle,
  notificationTitle,
  notificationTypeToString,
} from 'utils/notification';
import {useMarkNotificationAsRead} from 'hooks/reactQuery/useNotifications';
import {useFormatDateDistance} from 'hooks/useFormatDateDistance';
import {Button} from 'components/Button';
import {NotificationIcon} from 'components/NotificationIcon';

interface Props extends BoxProps {
  notification: NotificationMessage<string>;
  closeSideDrawer: () => void;
  read?: boolean;
}

export const NotificationCard = ({
  notification,
  closeSideDrawer,
  read = false,
  ...rest
}: Props) => {
  const {t} = useTranslation();
  const theme = useTheme();
  const formatDateDistance = useFormatDateDistance();
  const navigate = useNavigate();

  const {
    mutate: markNotificationAsRead,
    isLoading: isLoadingMarkNotificationAsRead,
  } = useMarkNotificationAsRead();
  const notificationData = useMemo(
    () =>
      notificationJSONDataToObject(notification.messageType, notification.data),
    [notification.id],
  );

  const ctaButtonHandler = () => {
    switch (notification.messageType) {
      case MessageType.SERVICE_ORDER_SCHEDULE_ALERT:
        navigate(
          `/orders/details/${
            (notificationData as ServiceOrderScheduleAlertData).serviceOrder.id
          }`,
        );
        if (!read) {
          markNotificationAsRead(notification.id);
        }
        closeSideDrawer();
        break;
      case MessageType.CONTRACT_EXPIRY_ALERT:
        navigate(
          `/contracts/details/${
            (notificationData as ContractExpiryAlertData).contract.id
          }`,
        );
        if (!read) {
          markNotificationAsRead(notification.id);
        }
        closeSideDrawer();
        break;
      default:
        break;
    }
  };

  return (
    <Box>
      <Box
        sx={{
          py: '1.5em',
          px: '1em',
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
            '& #mark-as-read-button': {
              display: 'inline-flex',
            },
            [`& #unread-indicator-${notification.id}`]: {
              display: 'none',
            },
          },
        }}
        {...rest}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '0.5rem',
            }}>
            <Box
              sx={{
                width: '2rem',
                height: '2rem',
                bgcolor:
                  notification.messageType === MessageType.CONTRACT_EXPIRY_ALERT
                    ? '#FF182F14'
                    : '#0f4c6414',
                p: '0.5rem',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <NotificationIcon
                messageType={notification.messageType}
                style={{fontSize: '1rem'}}
              />
            </Box>
            <Typography variant="h6" sx={{textTransform: 'capitalize'}}>
              {t(notificationTypeToString(notification.messageType))}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Typography variant="caption" color={theme.palette.text.secondary}>
              {formatDateDistance(new Date(notification.timestamp))}
            </Typography>
            {!read && (
              <Box
                id={`unread-indicator-${notification.id}`}
                width="0.75rem"
                height="0.75rem"
                borderRadius="50%"
                ml="0.5rem"
                bgcolor={theme.palette.error.main}
              />
            )}
          </Box>
        </Box>

        <Typography variant="subtitle2" pt="0.5rem">
          {notificationTitle(notification.messageType, notificationData)}
        </Typography>
        <Typography variant="body2">
          {notificationSubtitle(notification.messageType, notificationData)}
        </Typography>

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Button
            label={notificationButtonLabel(notification.messageType)}
            buttonProps={{
              onClick: ctaButtonHandler,
              size: 'medium',
              variant: 'contained',
              sx: {mt: '1rem', py: '0.53rem', px: '1.25rem'},
            }}
          />

          {!read && (
            <Button
              label={t('Mark as read')}
              buttonProps={{
                id: 'mark-as-read-button',
                onClick: () => markNotificationAsRead(notification.id),
                size: 'small',
                variant: 'text',
                sx: {
                  display: 'none',
                  mt: '1rem',
                  py: '0.53rem',
                  px: '1.25rem',
                  textTransform: 'none',
                },
              }}
            />
          )}
        </Box>
      </Box>

      {isLoadingMarkNotificationAsRead && (
        <Box height="4px">
          <LinearProgress />
        </Box>
      )}
    </Box>
  );
};
