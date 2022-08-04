import {useState} from 'react';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import DateRange from '@mui/icons-material/DateRange';
import {TabsBody} from 'components/TabsBody';
import {Tabs} from 'components/Tabs';
import {OverviewTab} from './Tabs/OverviewTab';
import {ServiceOrdersTab} from './Tabs/ServiceOrdersTab';
import {AppointmentPreferencesTab} from './Tabs/AppointmentPreferencesTab';
import {PerformanceTab} from './Tabs/PerformanceTab';

const tabItems = [
  {
    label: 'Overview',
    icon: <ManageSearchIcon />,
  },
  {
    label: 'Service Orders',
    icon: <EngineeringOutlinedIcon />,
  },
  {
    label: 'Performance',
    icon: <GraphicEqIcon />,
  },
  {
    label: 'Appointment Preferences',
    icon: <DateRange />,
  },
];

export const UnitDetails = () => {
  const [value, setValue] = useState(0);

  return (
    <Tabs
      tabItems={tabItems}
      currentIndex={value}
      onChange={(index) => setValue(index)}>
      <TabsBody value={value} index={0}>
        <OverviewTab />
      </TabsBody>

      <TabsBody value={value} index={1}>
        <ServiceOrdersTab />
      </TabsBody>

      <TabsBody value={value} index={2}>
        <PerformanceTab />
      </TabsBody>

      <TabsBody value={value} index={3}>
        <AppointmentPreferencesTab />
      </TabsBody>
    </Tabs>
  );
};
