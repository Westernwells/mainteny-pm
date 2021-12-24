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
import {getDay} from '../../../../utils/datetime';

import {ServiceOrderView} from '../../../../models/service-order';
import {ExpandMore} from '../ExpandMore';
import {Sidebar} from '../Sidebar';
import {CardHeader as Header} from '../CardHeader';
import {HistoryDetails} from './HistoryDetails';
import {ElevatorMaintenanceHistoryView} from '../../../../models/elevator';

interface Props {
  serviceOrder: ServiceOrderView;
  serviceHistory: ElevatorMaintenanceHistoryView;
}

const ServiceHistoryCard = ({serviceHistory, serviceOrder}: Props) => {
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const {createdAt: createdAtDate, description} = serviceHistory;
  const createdAt = getDay(createdAtDate)!;
  const {type: serviceOrderType, status} = serviceOrder;
  const {firstName: technicianFirstName, lastName: technicianLastName} =
    serviceHistory.technician.userAccount;
  return (
    <Box display="flex">
      <Sidebar />
      <Card
        sx={{
          boxShadow: '0px 4px 15px rgba(144, 144, 144, 0.4)',
          background: '#F7F9FC',
          borderRadius: '4px',
          py: 2,
          px: 3,
          mb: 2,
          flexGrow: 1,
        }}
      >
        <CardHeader
          disableTypography
          sx={{py: 0, px: 0}}
          title={
            <Header
              status={status}
              createdAt={createdAt}
              serviceOrderType={serviceOrderType}
            />
          }
        />
        <Divider sx={{mt: 1}} />
        <CardContent sx={{py: 1, px: 0}}>
          <Typography>{description}</Typography>
        </CardContent>
        <CardActions disableSpacing sx={{m: 0, p: 0}}>
          <ExpandMore
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
            duration={serviceHistory.actualServiceTime.toString()}
          />
        </Collapse>
      </Card>
    </Box>
  );
};

export {ServiceHistoryCard};
