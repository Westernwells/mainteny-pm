import {useState} from 'react';
import * as _ from 'lodash';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import {useAllElevators} from '../../hooks/useElevator';
import {useFetchServiceOrdersByElevators} from '../../hooks/useServiceOrder';
import {UnitSection} from './UnitSection';
import {UnitColumns} from './UnitColumns';
import {Widget} from '../../components/Widget';
import {makePage} from '../../utils/paging-utils';
import {UnitsMapsView} from './UnitsMapsView';
import {Location} from '../../models/misc';

interface Props {
  stopLoading: () => void;
}

export const MyUnits = ({stopLoading}: Props) => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(makePage(0, 10)); // TODO: implement paging
  const [showMapview, setShowMapview] = useState(false);

  const {data: elevatorResponse} = useAllElevators(search, page);
  const {data: elevatorsByAddressList} = useFetchServiceOrdersByElevators(
    elevatorResponse?.elevator,
    stopLoading,
  );

  const onSearchTextChanged = (value: string) => {
    setSearch(value);
  };

  const openMapView = () => {
    setShowMapview(true);
  };

  const closeMapView = () => {
    setShowMapview(false);
  };

  return (
    <Box>
      <Box mb={5} display="flex" justifyContent="space-between">
        <Typography variant="h4">Units</Typography>
        <Widget
          searchPlaceholder="Type ‘Schindler’ or ‘Blue Plaza’"
          onSearchTextChanged={onSearchTextChanged}
          openMapView={openMapView}
          closeMapView={closeMapView}
          mapViewActive={showMapview}
        />
      </Box>

      {!showMapview ? (
        <>
          <UnitColumns />
          <Box sx={{height: '73vh', overflowY: 'scroll'}}>
            {elevatorsByAddressList?.map((elevatorsByAddress) => (
              <UnitSection
                key={elevatorsByAddress.address.id}
                elevatorsByAddress={elevatorsByAddress}
              />
            ))}
          </Box>
        </>
      ) : (
        <UnitsMapsView
          elevators={elevatorResponse?.elevator.data}
          centerCoord={elevatorResponse?.centerCoord}
        />
      )}
    </Box>
  );
};
