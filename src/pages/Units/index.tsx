import {useEffect, useState} from 'react';
import ViewListIcon from '@mui/icons-material/ViewList';
import GridViewIcon from '@mui/icons-material/GridView';
import {formatSearchParams} from 'utils/utils';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {Tabs} from 'components/Tabs';
import {TabsBody} from 'components/TabsBody';
import {UnitListingView} from './Tabs/UnitListingView';
import {UnitMapsView} from './Tabs/UnitsMapView';

const tabItems = [
  {
    label: 'List View',
    icon: <ViewListIcon />,
  },
  {
    label: 'Map View',
    icon: <GridViewIcon />,
  },
];

export const MyUnits = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [queryParams, setQueryParams] = useSearchParams();

  useEffect(() => {
    const currentParams = Object.fromEntries([...queryParams]);
    if (currentParams.tab) setTabValue(Number(currentParams.tab));
  }, []);

  const onClickNewUnitBtn = () => {
    navigate('new');
  };

  return (
    <Tabs
      hideBackIcon
      tabItems={tabItems}
      btnOnClick={onClickNewUnitBtn}
      currentIndex={tabValue}
      pageTitle="Service Orders"
      onChange={(index) => {
        setQueryParams(
          formatSearchParams({tab: index.toString()}, queryParams),
        );
        setTabValue(index);
      }}>
      <TabsBody value={tabValue} index={0}>
        <UnitListingView />
      </TabsBody>
      <TabsBody value={tabValue} index={1}>
        <UnitMapsView />
      </TabsBody>
    </Tabs>
  );
};
