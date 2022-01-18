import {useParams} from 'react-router-dom';
import {useState} from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import useTheme from '@mui/material/styles/useTheme';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {ServiceOrderStatus, ServiceOrderView} from 'models/service-order';
import {useServiceOrders} from 'hooks/reactQuery/useServiceOrder';
import {ScrollableCard} from 'components/ScrollableCard';
import {SplitButton} from 'components/SplitButton';
import {EmptyItem} from 'components/EmptyItem';
import {endOfMonth, startOfYear, endOfYear} from 'date-fns';
import {createEmptyResource} from 'utils/paging-utils';
import {toRestDateTime} from 'utils/datetime';
import {IssueDetails} from './IssueDetails';
import {IssueCard} from './IssueCard';

const pageSize = 10;

export const IssueHistory = () => {
  const theme = useTheme();
  const [year, setYear] = useState('2022');
  const [status, setStatus] = useState('ALL');
  const {id: elevatorId} = useParams();
  const [selectedIssueHistory, setSelectedIssueHistory] =
    useState<ServiceOrderView>();
  const {
    data: serviceOrders = createEmptyResource<ServiceOrderView>(pageSize),
  } = useServiceOrders({
    elevatorIds: elevatorId,
    start: toRestDateTime(startOfYear(new Date(year))),
    end: toRestDateTime(endOfYear(new Date(year))),
    pageSize,
    pageIndex: 0,
    query: '',
    status:
      status.toUpperCase() === ServiceOrderStatus.ALL
        ? []
        : [status.toUpperCase().split(' ').join('_')],
  });

  return (
    <Grid container spacing={2} sx={{mt: 2}}>
      <Grid item xs={5}>
        <ScrollableCard
          addShadowToCard
          cardHeight="59%"
          contentHeight="85%"
          containerStyles={{px: 2, overflow: 'hidden'}}
          renderHeaderText={() => (
            <Box display="flex" flexDirection="column" pb={2}>
              <Typography
                variant="largeBtnText"
                color={theme.palette.text.secondary}
              >
                Issue History
              </Typography>

              <Box display="flex" mt={3}>
                <Box mr={2}>
                  <SplitButton
                    variant="outlined"
                    disableRipple
                    selectionStyle={{background: '#fff', cursor: 'default'}}
                    selectedOption={`Year: ${year}`}
                    options={['2020', '2021', '2022']}
                    onSelectedOptionChanged={(value) => setYear(value)}
                  />
                </Box>
                <SplitButton
                  variant="outlined"
                  disableRipple
                  selectionStyle={{background: '#fff', cursor: 'default'}}
                  selectedOption={`Status: ${status.toLowerCase()}`}
                  options={Object.keys(ServiceOrderStatus).map((item) =>
                    item.split('_').join(' ').toLowerCase(),
                  )}
                  onSelectedOptionChanged={(value) => setStatus(value)}
                />
              </Box>
            </Box>
          )}
          renderIcon={() => <MoreVertIcon />}
        >
          {serviceOrders?.data.length ? (
            serviceOrders?.data.map((serviceOrder) => (
              <Box
                mt={3}
                mb={3}
                key={serviceOrder.id}
                onClick={() => setSelectedIssueHistory(serviceOrder)}
                sx={{}}
              >
                <IssueCard
                  serviceOrder={serviceOrder}
                  selectedIssueHistory={selectedIssueHistory}
                />
              </Box>
            ))
          ) : (
            <EmptyItem label="No issue history for this elevator" />
          )}
        </ScrollableCard>
      </Grid>

      <Grid item xs={7}>
        <IssueDetails selectedIssueHistory={selectedIssueHistory} />
      </Grid>
    </Grid>
  );
};
