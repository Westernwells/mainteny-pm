import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import {Widget} from 'components/Widget';
import {LogIssue} from 'components/LogIssue';
import {useFetchServiceOrdersByElevators} from 'hooks/reactQuery/useServiceOrder';
import Modal from '@mui/material/Modal';
import {makePage} from 'utils/paging-utils';
import {useAllElevators} from 'hooks/reactQuery/useElevator';
import {UnitSection} from './UnitSection';
import {UnitsMapsView} from './UnitsMapsView';
import {UnitColumns} from './UnitColumns';

export const MyUnits = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(makePage(0, 10)); // TODO: implement paging
  const [showMapview, setShowMapview] = useState(false);
  const [open, setOpen] = React.useState(false);

  const {data: elevatorResponse} = useAllElevators(search, page);
  const {data: elevatorsByAddressList} = useFetchServiceOrdersByElevators(
    elevatorResponse?.elevator,
  );

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

      <Modal open={open} onClose={handleClose}>
        <Box
          width={400}
          sx={{
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <LogIssue />
        </Box>
      </Modal>
    </Box>
  );
};
