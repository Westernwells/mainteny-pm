import useTheme from '@mui/material/styles/useTheme';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import Box from '@mui/system/Box';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import {getDay} from '../../../../utils/datetime';

import {ServiceOrderView} from '../../../../models/service-order';
import {Sidebar} from '../Sidebar';
import {CardHeader as Header} from '../CardHeader';
import {calculateNextVisitDate} from '../../../Units/Models';

interface Props {
  serviceOrder: ServiceOrderView;
}

const RunningServiceOrderCard = ({serviceOrder}: Props) => {
  const theme = useTheme();
  const createdAt = getDay(calculateNextVisitDate(serviceOrder))!;
  const {type: serviceOrderType, status, description} = serviceOrder;
  return (
    <Box display="flex">
      <Sidebar active />
      <Card
        sx={{
          boxShadow: '0px 4px 15px rgba(144, 144, 144, 0.4)',
          border: `1px solid  ${theme.palette.secondary.main}`,
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
              active
            />
          }
        />
        <Divider sx={{mt: 1}} />
        <CardContent sx={{py: 1, px: 0}}>
          <Typography>{description}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export {RunningServiceOrderCard};
