import Box, {BoxProps} from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useTheme from '@mui/material/styles/useTheme';
import {Grid} from '@mui/material';
import {ServiceOrderIcons} from 'components/ServiceOrderIcons';
import {ServiceOrderStatusText} from 'components/ServiceOrderStatusText';
import {ServiceOrderTypeText} from 'components/ServiceOrderTypeText';
import {ServiceOrderView} from 'models/service-order';
import {formatDate} from 'utils/datetime';

interface Props extends Omit<BoxProps, 'onClick'> {
  serviceOrder: ServiceOrderView;
  onClick: (serviceOrder: ServiceOrderView) => void;
  isSelected: Boolean;
}

export const TimelineCard = ({
  serviceOrder,
  onClick,
  isSelected,
  ...rest
}: Props) => {
  const theme = useTheme();

  return (
    <Box
      onClick={() => onClick(serviceOrder)}
      sx={{
        py: '0.5em',
        px: '1em',
        borderBottom: `1px solid ${theme.palette.action.disabledBackground}`,
        cursor: 'pointer',
        ...(isSelected && {
          backgroundColor: theme.palette.secondary.outlinedHoverBg,
        }),
        '&:hover': {
          backgroundColor: theme.palette.secondary.outlinedHoverBg,
        },
      }}
      {...rest}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="subtitle1">
            {formatDate(new Date(serviceOrder.dueDate)) || '-'}
          </Typography>
          <Box sx={{display: 'flex'}}>
            <ServiceOrderIcons
              serviceOrderType={serviceOrder.type}
              size="small"
            />
            <ServiceOrderTypeText
              variant="body2"
              style={{pl: '0.5em'}}
              capitalizeText
              serviceOrderType={serviceOrder.type}
            />
          </Box>
        </Grid>
        <Grid item>
          <ServiceOrderStatusText serviceOrderStatus={serviceOrder.status} />
        </Grid>
      </Grid>

      <Typography variant="caption">{serviceOrder.description}</Typography>
    </Box>
  );
};
