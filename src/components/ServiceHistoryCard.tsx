import {Box} from '@mui/system';
import useTheme from '@mui/material/styles/useTheme';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import {CardContent, CardHeader, CardActions, Collapse} from '@mui/material';
import {styled} from '@mui/material/styles';
import {useState} from 'react';
import IconButton, {IconButtonProps} from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import {ServiceOrderIcons} from './ServiceOrderIcons';
import {ServiceOrderType} from '../models/service-order';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const {expand, ...other} = props;
  return <IconButton {...other} />;
})(({theme, expand}) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface Props {
  createdAt?: string;
  serviceOrderType: ServiceOrderType;
  status: 'Completed' | 'Scheduled';
  description?: string;
}

interface SidebarProps {
  isCompleted: boolean;
}

interface CardHeaderProps {
  createdAt?: string;
  serviceOrderType: ServiceOrderType;
  status: 'Completed' | 'Scheduled';
}

const Sidebar = ({isCompleted}: SidebarProps) => {
  const theme = useTheme();
  const Icon = isCompleted ? CheckCircleIcon : RadioButtonCheckedIcon;
  return (
    <Box>
      <Box
        sx={{
          borderLeft: '1px dashed #9E9E9E',
          height: 60,
          ml: '11px',
          zIndex: 1000,
        }}
      />
      <Icon
        sx={{
          mr: 1,
          color: isCompleted
            ? theme.palette.text.disabled
            : theme.palette.secondary.main,
        }}
      />
      <Box
        sx={{
          borderLeft: '1px dashed #9E9E9E',
          height: '100%',
          ml: '11px',
        }}
      />
    </Box>
  );
};

const ServiceHistoryCardHeader = ({
  createdAt,
  serviceOrderType,
  status,
}: CardHeaderProps) => {
  const isCompleted = status === 'Completed';
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Typography variant="h6" mr={3}>
        {createdAt}
      </Typography>
      <Box flexGrow={1} display="flex" alignItems="center">
        <ServiceOrderIcons
          serviceOrderType={serviceOrderType}
          style={{width: '18px', height: '18px', marginRight: '4px'}}
        />
        <Typography variant="largeBtnText">{serviceOrderType}</Typography>
      </Box>
      <Chip
        sx={{
          py: 2,
          color: isCompleted
            ? theme.palette.text.secondary
            : theme.palette.secondary.main,
          background: `${
            isCompleted ? '#FAFAFA' : theme.palette.info.outlinedHoverBg
          }`,
          border: `1px solid  ${
            isCompleted
              ? theme.palette.text.secondary
              : theme.palette.secondary.main
          }`,
        }}
        label={
          <Typography
            variant="largeBtnText"
            sx={{textTransform: isCompleted ? null : 'uppercase'}}
          >
            {status}
          </Typography>
        }
        size="medium"
      />
    </Box>
  );
};

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
            <ServiceHistoryCardHeader
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
          <CardContent>Hi</CardContent>
        </Collapse>
      </Card>
    </Box>
  );
};

export default ServiceHistoryCard;
