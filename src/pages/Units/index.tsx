import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import {useAllElevators} from '../../hooks/useElevator';
import {useFetchServiceOrdersByElevators} from '../../hooks/useServiceOrder';
import {UnitSection} from './UnitSection';
import {UnitColumns} from './UnitColumns';
import {Widget} from '../../components/Widget';
import {makePage} from '../../utils/paging-utils';
import {UnitsMapsView} from './UnitsMapsView';

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
      <Box display="flex" justifyContent="space-between">
        <Box sx={{mb: 4}}>
          <Typography variant="h4">Units</Typography>
        </Box>
        <Box mt={1}>
          <Widget
            searchPlaceholder="Try ‘Schindler’ or ‘Mitsubishi’"
            onSearchTextChanged={onSearchTextChanged}
            openMapView={openMapView}
            closeMapView={closeMapView}
            mapViewActive={showMapview}
          />
        </Box>
      </Box>

      {!showMapview ? (
        <>
          <UnitColumns />
          <Box
            sx={{height: '69vh', overflowY: 'scroll', paddingBottom: '1rem'}}
          >
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
          elevatorsByAddressList={elevatorsByAddressList}
          centerCoord={elevatorResponse?.centerCoord}
        />
      )}
    </Box>
  );
};
