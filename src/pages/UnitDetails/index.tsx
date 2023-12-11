import {useState} from 'react';
import {useParams} from 'react-router-dom';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import DateRange from '@mui/icons-material/DateRange';
import {useElevatorById} from 'hooks/reactQuery/useElevator';
import {TabsBody} from 'components/TabsBody';
import {Tabs} from 'components/Tabs';
import {Progress} from 'components/Progress';
import {OverviewTab} from './Tabs/OverviewTab';
import {AppointmentPreferencesTab} from './Tabs/AppointmentPreferencesTab';

const tabItems = [
  {
    label: 'Overview',
    icon: <ManageSearchIcon />,
  },
  {
    label: 'Appointment Preferences',
    icon: <DateRange />,
  },
];

export const UnitDetails = () => {
  const [value, setValue] = useState(0);
  const {id: elevatorId} = useParams();
  const {data: elevator, isLoading: isLoadingElevator} =
    useElevatorById(elevatorId);

  return (
    <Tabs
      tabItems={tabItems}
      currentIndex={value}
      onChange={(index) => setValue(index)}>
      {isLoadingElevator ? (
        <Progress />
      ) : (
        <>
          <TabsBody value={value} index={0}>
            <OverviewTab elevator={elevator!} />
          </TabsBody>
          <TabsBody value={value} index={1}>
            <AppointmentPreferencesTab elevator={elevator!} />
          </TabsBody>
        </>
      )}
    </Tabs>
  );
};
