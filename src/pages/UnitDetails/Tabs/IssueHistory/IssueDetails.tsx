import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {ServiceOrderStatus, ServiceOrderView} from 'models/service-order';
import {ScrollableCard} from 'components/ScrollableCard';
import {EmptyIllustration} from 'components/EmptyIllustration';
import {SyntheticEvent, useState} from 'react';
import {useServiceOrderReport} from 'hooks/reactQuery/useServiceOrder';
import {IssueOverview} from './IssueOverview';
import {IssueInfo} from './IssueInfo';
import {UnitInfo} from './UnitInfo';
import {IssueAlert} from './IssueAlert';
import {ResolutionReport} from './ResolutionReport';
import ServiceDone from './ServiceDone';
import {AdditionalDetails} from './AdditionalDetails';

interface Props {
  selectedIssueHistory?: ServiceOrderView;
}

export const IssueDetails = ({selectedIssueHistory}: Props) => {
  const [value, setValue] = useState(0);
  const {data: serviceOrderReports} = useServiceOrderReport(
    selectedIssueHistory && {serviceOrderId: selectedIssueHistory?.id},
  );
  console.log(serviceOrderReports, '.......................>>>>>>>>>>>>');

  return (
    <ScrollableCard
      renderIcon={() => <MoreVertIcon />}
      addShadowToCard
      cardHeight={700}
      contentHeight="67vh"
      renderHeaderText={() => (
        <Typography variant="h5">Issue Details</Typography>
      )}
    >
      {!selectedIssueHistory ? (
        <Box display="flex" flexDirection="column" alignItems="center" mt={3}>
          <EmptyIllustration label="Please select an issue to see details!" />
        </Box>
      ) : (
        <>
          <Tabs
            value={value}
            onChange={(event: SyntheticEvent, newValue: number) => {
              setValue(newValue);
            }}
          >
            <Tab label="Overview" />
            <Tab label="Resolution report" />
          </Tabs>

          {value === 0 ? (
            <>
              {selectedIssueHistory.status !== ServiceOrderStatus.COMPLETED &&
              selectedIssueHistory.schedules.length ? (
                <IssueAlert selectedIssueHistory={selectedIssueHistory} />
              ) : null}
              <IssueOverview>
                <IssueInfo selectedIssueHistory={selectedIssueHistory} />
                <UnitInfo selectedIssueHistory={selectedIssueHistory} />
              </IssueOverview>
            </>
          ) : (
            <ResolutionReport>
              <ServiceDone serviceOrderReports={serviceOrderReports} />
              <AdditionalDetails serviceOrderReports={serviceOrderReports} />
            </ResolutionReport>
          )}
        </>
      )}
    </ScrollableCard>
  );
};
