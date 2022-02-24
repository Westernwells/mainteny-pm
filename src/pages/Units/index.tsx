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
import Drawer from '@mui/material/Drawer';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {createEmptyResource, makePage} from 'utils/paging-utils';
import {MultipleSelectCheckmarks} from 'components/MultipleSelectCheckmarks';
import {useAllElevators} from 'hooks/reactQuery/useElevator';
import {BtnGroupType} from 'models/misc';
import {FilterFields} from 'components/FilterFields';
import Slide from '@mui/material/Slide';
import useTheme from '@mui/material/styles/useTheme';
import {UnitSection} from './UnitSection';
import {UnitsMapsView} from './UnitsMapsView';
import {UnitColumns} from './UnitColumns';
import {LogIssueBody} from './LogIssue/LogIssueBody';
import {LogIssueDescription} from './LogIssue/LogIssueDescription';
import {LogIssueUnitInput} from './LogIssue/LogIssueUnitInput';
import {LogIssueTimePreference} from './LogIssue/LogIssueTimePreference';
import {LogIssueDateTime} from './LogIssue/LogIssueDateTime';

interface FormikFields {
  description: string;
  elevator?: ElevatorView;
  moreInformation: string;
}

const validationSchema = Yup.object().shape({
  description: Yup.string().required('description is required'),
});

export const MyUnits = () => {
  const fallback = useRef({
    elevator: createEmptyResource<ElevatorView>(10),
    centerCoord: {longitude: 0, latitude: 0},
  }).current;
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(makePage(0, 10)); // TODO: implement paging
  const [showFilter, setShowFilter] = useState(false);
  const [availability, setAvailability] = useState<number[][]>([]);
  const [status, setStatus] = useState<string[]>([]);
  const [nextVisit, setNextVisit] = useState<string[]>([]);
  const [showMapview, setShowMapview] = useState(false);
  const [issuElevator, setIssueElevator] = useState();
  const [sliderValue, setSliderValue] = useState<number[]>([20, 37]);
  const [logIssueDate, setLogIssueDate] = useState<Date | null>(null);
  const [logIssueTime, setLogIssueTime] = useState<Date | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();

  const {data: elevatorResponse = fallback} = useAllElevators(search, page, {
    status,
  });
  const {data: elevatorsByAddressList} = useFetchServiceOrdersByElevators(
    elevatorResponse.elevator,
    {nextVisit, availabilityRange: availability},
  );

  const availabilityRangeConvertor = (selectedItems: string[]) => {
    const range: number[][] = [];
    selectedItems.forEach((item) => {
      switch (item) {
        case 'Under 40%':
          range.push([0, 40]);
          // '40 - 60%', '60 - 80%', 'Above 80%'
          break;
        case '40 - 60%':
          range.push([40, 60]);

          break;
        case '60 - 80%':
          range.push([60, 80]);

          break;
        case 'Above 80%':
          range.push([80, 100]);

          break;
        default:
          break;
      }
    });
    setAvailability(range);
  };

  const {mutate: logIssue, isLoading} = useLogIssue();

  const formik = useFormik<FormikFields>({
    initialValues: {
      description: '',
      elevator: undefined,
      moreInformation: '',
    },
    onSubmit: async (values, {resetForm}) => {
      const body = {...values, elevatorId: values?.elevator?.id};
      delete body.elevator;
      await logIssue(body);
      // setModalOpen(false);
      setDrawerOpen(false);
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
      setAvailability([]);
    }
  }, [showFilter]);
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" maxWidth="100%">
        <Box sx={{mb: 4, mt: 1}}>
          <Typography variant="h4">Units</Typography>
        </Box>
        <Box>
          <Widget
            searchPlaceholder="Try ‘Schindler’ or ‘Mitsubishi’"
            onSearchTextChanged={onSearchTextChanged}
            openMapView={openMapView}
            closeMapView={closeMapView}
            mapViewActive={showMapview}
            setShowFilter={setShowFilter}
            showFilter={showFilter}
            btnGroupType={BtnGroupType.ICON}
          />
        </Box>
      </Box>

      <Fade in={showFilter} unmountOnExit>
        <Box>
          <FilterFields setShowFilter={setShowFilter}>
            <MultipleSelectCheckmarks
              label="Availability"
              options={['Under 40%', '40 - 60%', '60 - 80%', 'Above 80%']}
              getSelectedValue={(item) => availabilityRangeConvertor(item)}
              multiple={false}
            />

            <MultipleSelectCheckmarks
              label="Status"
              options={['RUNNING', 'STOPPED']}
              getSelectedValue={(item) => setStatus(item)}
            />

            <MultipleSelectCheckmarks
              label="Upcoming visits"
              options={['This week', 'Next week', 'Next month']}
              getSelectedValue={(item) => setNextVisit(item)}
              multiple={false}
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
                setDrawerOpen={setDrawerOpen}
                setField={formik.setFieldValue}
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

      <Drawer
        PaperProps={{
          sx: {
            paddingTop: 10,
            color: theme.palette.primary.main,
            background: '#fff',
          },
        }}
        anchor="right"
        hideBackdrop
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        // onBackdropClick={() => formik.resetForm()}
      >
        <Box sx={{width: '30.06rem'}}>
          <form onSubmit={formik.handleSubmit}>
            <LogIssue
              disabled={
                !!(
                  !formik.values.description ||
                  !formik.values.elevator ||
                  formik.errors.description ||
                  formik.errors.elevator
                )
              }
              handleCancel={() => setDrawerOpen(false)}
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
                  error={formik.errors.elevator}
                  touched={formik.touched.elevator}
                  handleBlur={formik.handleBlur}
                  selectedUnit={formik.values.elevator}
                />
                <LogIssueTimePreference
                  date={logIssueDate} // TODO: use formik
                  time={logIssueTime} // TODO: use formik
                  setDate={setLogIssueDate}
                  setTime={setLogIssueTime}
                >
                  <LogIssueDateTime
                    date={logIssueDate} // TODO: use formik
                    time={logIssueTime} // TODO: use formik
                    setDate={setLogIssueDate}
                    setTime={setLogIssueTime}
                  />
                </LogIssueTimePreference>
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
      </Drawer>
    </Box>
  );
};
