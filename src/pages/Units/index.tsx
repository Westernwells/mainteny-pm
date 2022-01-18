import React, {useEffect, useRef, useState} from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import {ElevatorView} from 'models/elevator';

import {Widget} from 'components/Widget';
import {LogIssue} from 'pages/Units/LogIssue';
import {
  useFetchServiceOrdersByElevators,
  useLogIssue,
} from 'hooks/reactQuery/useServiceOrder';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {createEmptyResource, makePage} from 'utils/paging-utils';
import {MultipleSelectCheckmarks} from 'components/MultipleSelectCheckmarks';
import {useAllElevators} from 'hooks/reactQuery/useElevator';
import {FilterFields} from 'components/FilterFields';
import {UnitSection} from './UnitSection';
import {UnitsMapsView} from './UnitsMapsView';
import {UnitColumns} from './UnitColumns';
import {LogIssueBody} from './LogIssue/LogIssueBody';
import {LogIssueDescription} from './LogIssue/LogIssueDescription';
import {LogIssueUnitInput} from './LogIssue/LogIssueUnitInput';

const validationSchema = Yup.object().shape({
  description: Yup.string().required('description is required'),
  elevatorId: Yup.string().required('unit is required'),
});

export const MyUnits = () => {
  const fallback = useRef({
    elevator: createEmptyResource<ElevatorView>(10),
    centerCoord: {longitude: 0, latitude: 0},
  }).current;
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(makePage(0, 10)); // TODO: implement paging
  const [showFilter, setShowFilter] = useState(false);
  const [status, setStatus] = useState<string[]>([]);
  const [nextVisit, setNextVisit] = useState<string[]>([]);
  const [showMapview, setShowMapview] = useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [sliderValue, setSliderValue] = React.useState<number[]>([20, 37]);

  const {data: elevatorResponse = fallback} = useAllElevators(search, page, {
    status,
  });
  const {data: elevatorsByAddressList} = useFetchServiceOrdersByElevators(
    elevatorResponse.elevator,
    {nextVisit},
  );

  const {mutate: logIssue, isLoading} = useLogIssue();

  const formik = useFormik({
    initialValues: {
      description: '',
      elevatorId: '',
      moreInformation: '',
    },
    onSubmit: async (values, {resetForm}) => {
      await logIssue(values);
      setModalOpen(false);
      resetForm();
    },
    validationSchema,
  });

  const onSearchTextChanged = (value: string) => {
    setSearch(value);
  };

  const openMapView = () => {
    setShowMapview(true);
  };

  const closeMapView = () => {
    setShowMapview(false);
  };

  useEffect(() => {
    if (!showFilter) {
      setStatus([]);
      setNextVisit([]);
    }
  }, [showFilter]);

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
            setShowFilter={setShowFilter}
            showFilter={showFilter}
          />
        </Box>
      </Box>

      <Fade in={showFilter} unmountOnExit>
        <Box>
          <FilterFields setShowFilter={setShowFilter}>
            <MultipleSelectCheckmarks
              label="Status"
              options={['RUNNING', 'STOPPED']}
              getSelectedValue={(item) => setStatus(item)}
            />

            <MultipleSelectCheckmarks
              label="Upcoming visits"
              options={['This week', 'Next week', 'Next month']}
              getSelectedValue={(item) => setNextVisit(item)}
            />
          </FilterFields>
        </Box>
      </Fade>

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
                setModalOpen={setModalOpen}
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

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onBackdropClick={() => formik.resetForm()}
        sx={{
          maxHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          width="50vw"
          sx={{
            bgcolor: 'background.paper',
            boxShadow: 24,
            borderRadius: '20px',
          }}
        >
          <form onSubmit={formik.handleSubmit}>
            <LogIssue
              disabled={
                !!(
                  !formik.values.description ||
                  !formik.values.elevatorId ||
                  formik.errors.description ||
                  formik.errors.elevatorId
                )
              }
              handleCancel={() => setModalOpen(false)}
            >
              <LogIssueBody>
                <LogIssueDescription
                  error={formik.errors.description}
                  touched={formik.touched.description}
                  value={formik.values.description}
                  handleChange={formik.handleChange}
                  handleBlur={formik.handleBlur}
                  name="description"
                  label=" Tell us what happened"
                />
                <LogIssueUnitInput
                  setField={formik.setFieldValue}
                  elevators={elevatorResponse.elevator.data}
                  error={formik.errors.elevatorId}
                  touched={formik.touched.elevatorId}
                  handleBlur={formik.handleBlur}
                />
                <Box mb={1}>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="At the earliest"
                    sx={{mr: 6}}
                  />
                </Box>
                <LogIssueDescription
                  handleChange={formik.handleChange}
                  value={formik.values.moreInformation}
                  name="moreInformation"
                  label="Add special instructions, if any "
                />
              </LogIssueBody>
            </LogIssue>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};
