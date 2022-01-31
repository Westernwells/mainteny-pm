import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import Box from '@mui/system/Box';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Collapse from '@mui/material/Collapse';
import {useState} from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useTheme from '@mui/material/styles/useTheme';
import {formatDate} from 'utils/datetime';

import {
  ServiceOrderStatus,
  ServiceOrderType,
  ServiceOrderView,
} from 'models/service-order';
import {ElevatorMaintenanceHistoryView} from 'models/elevator';
import {ExpandMore} from '../ExpandMore';

import {CardHeader as Header} from '../CardHeader';
import {HistoryDetails} from './HistoryDetails';
import {Sidebar} from './Sidebar';

interface Props {
  serviceHistory: ElevatorMaintenanceHistoryView;
  running?: boolean;
  active?: boolean;
  hideMoreDetailArrow?: boolean;
}

const HistoryCard = ({
  serviceHistory,
  active,
  running,
  hideMoreDetailArrow,
}: Props) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const {description} = serviceHistory;
  const {firstName: technicianFirstName, lastName: technicianLastName} =
    serviceHistory.technician.userAccount;
  return (
    <Box display="flex">
      <Sidebar />
      <Card
        sx={{
          boxShadow: 'none',
          borderRadius: '4px',
          py: 1,
          px: 3,
          mb: 2,
          flexGrow: 1,
          background: active
            ? theme.palette.secondary.outlinedHoverBg
            : '#F7F9FC',
          border: active ? ' 2px solid #00D1FF' : 'none',
        }}
      >
        <CardHeader
          disableTypography
          sx={{py: 0, px: 0}}
          title={
            <Header
              status={serviceHistory.serviceOrder.status}
              createdAt={formatDate(
                serviceHistory.serviceOrder.actualEndTime,
                'dd MMM YYY',
              )}
              serviceOrderType={serviceHistory.serviceOrder.type}
              running={running}
            />
          }
        />
        <Divider sx={{mt: 1}} />
        <CardContent sx={{py: 1, px: 0}}>
          <Typography>{serviceHistory.description}</Typography>
        </CardContent>
        <CardActions disableSpacing sx={{m: 0, p: 0}}>
          <ExpandMore
            sx={{visibility: hideMoreDetailArrow ? 'hidden' : 'visible'}}
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Divider sx={{mt: 1}} />
          <HistoryDetails
            cost={`${serviceHistory.fee.amount} ${serviceHistory.fee.currency}`}
            technician={`${technicianFirstName} ${technicianLastName}`}
            images={serviceHistory.attachments.map(
              (attchment) => attchment.fileResource.uri,
            )}
            duration={`${serviceHistory.actualServiceTime / 60} hrs`}
          />
        </Collapse>
      </Card>
    </Box>
  );
};

export {HistoryCard};
