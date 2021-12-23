import useTheme from '@mui/material/styles/useTheme';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import {Box} from '@mui/system';
import {CardContent, CardHeader, CardActions, Collapse} from '@mui/material';
import {useState} from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import {ServiceOrderType} from '../../models/service-order';
import {ExpandMore} from './ExpandMore';
import {Sidebar} from './Sidebar';
import {Header} from './Header';
import {HistoryDetails} from './HistoryDetails';

interface Props {
  createdAt?: string;
  serviceOrderType: ServiceOrderType;
  status: 'Completed' | 'Scheduled';
  description?: string;
}

const ServiceHistoryCard = ({
  createdAt,
  serviceOrderType,
  status,
  description,
}: Props) => {
  const theme = useTheme();
  const isCompleted = status === 'Completed';
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Box display="flex">
      <Sidebar isCompleted={isCompleted} />
      <Card
        sx={{
          border: isCompleted
            ? null
            : `1px solid  ${theme.palette.secondary.main}`,
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
              createdAt={createdAt}
              serviceOrderType={serviceOrderType}
              status={status}
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
            cost="200"
            technician="Joe"
            images={[]}
            duration="1min"
          />
        </Collapse>
      </Card>
    </Box>
  );
};

export {ServiceHistoryCard};
