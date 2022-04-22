import {useEffect, useRef, useState} from 'react';
import Box from '@mui/material/Box';
import {ElevatorView} from 'models/elevator';

import {Widget} from 'components/Widget';
import {DataGridLayout} from 'components/DataGridLayout';
import {GridRowsProp} from '@mui/x-data-grid';
import {CustomPagination} from 'components/CustomPagination';
import {LogIssue} from 'pages/Units/LogIssue';
import {
  useFetchServiceOrdersByElevators,
  useLogIssue,
} from 'hooks/reactQuery/useServiceOrder';
import Fade from '@mui/material/Fade';
import Drawer from '@mui/material/Drawer';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {createEmptyResource, makePage} from 'utils/paging-utils';
import {MultipleSelectCheckmarks} from 'components/MultipleSelectCheckmarks';
import {useAllElevators} from 'hooks/reactQuery/useElevator';
import {PageOverviewLayout} from 'components/PageOverviewLayout';

import {FilterFields} from 'components/FilterFields';
import {Progress} from 'components/Progress';
import {useSearchParams} from 'react-router-dom';
import {
  formatSearchParamsPageIndex,
  formatSearchParamsPageSize,
} from 'utils/utils';

import useTheme from '@mui/material/styles/useTheme';
import {columns, makeRows} from './UnitsDataGridProps';
import {UnitsMapsView} from './UnitsMapsView';
import {LogIssueBody} from './LogIssue/LogIssueBody';
import {LogIssueDescription} from './LogIssue/LogIssueDescription';
import {LogIssueUnitInput} from './LogIssue/LogIssueUnitInput';
import {LogIssueTimePreference} from './LogIssue/LogIssueTimePreference';
import {LogIssueDateTime} from './LogIssue/LogIssueDateTime';

const pageSize = 15;

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
  const [page, setPage] = useState(makePage(0, pageSize));
  const [queryParams, setQueryParams] = useSearchParams();
  const [showFilter, setShowFilter] = useState(false);
  const [status, setStatus] = useState<string[]>([]);
  const [nextVisit, setNextVisit] = useState<string[]>([]);
  const [showMapview, setShowMapview] = useState(false);
  const [logIssueDate, setLogIssueDate] = useState<Date | null>(null);
  const [logIssueTime, setLogIssueTime] = useState<Date | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [rows, setRows] = useState<GridRowsProp>([]);
  const theme = useTheme();

  const {data: elevatorResponse = fallback} = useAllElevators(
    search,
    page,
    status,
    {keepPreviousData: true},
  );

  const {
    data: elevatorsByAddressList,
    isIdle,
    isLoading,
    isFetching,
  } = useFetchServiceOrdersByElevators(
    elevatorResponse.elevator,
    {nextVisit},
    {keepPreviousData: true},
  );

  // TODO: LogIssue to be refactored and improved after VFA
  const {mutate: logIssue} = useLogIssue();

  const formik = useFormik<FormikFields>({
    initialValues: {
      description: '',
      elevator: undefined,
      moreInformation: '',
    },
    onSubmit: async (values, {resetForm}) => {
      const body = {
        description: values.description,
        moreInstruction: values.moreInformation,
        serviceCompanyId: values.elevator?.propertyOwner.serviceCompanyId,
        timePreference: logIssueTime
          ? logIssueDate
              ?.toJSON()
              .split('T')[0]
              .concat('T', logIssueTime.toJSON().split('T')[1])
          : logIssueDate
          ? logIssueDate.toJSON()
          : new Date().toJSON(),
        elevatorId: values.elevator?.id,
      };
      await logIssue(body);
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
    const currentParams = Object.fromEntries([...queryParams]);

    setPage({
      ...page,
      pageSize: Number(currentParams.pageSize),
      pageIndex: Number(currentParams.pageIndex) - 1,
    });
  }, [queryParams]);

  useEffect(() => {
    if (!showFilter) {
      setStatus([]);
      setNextVisit([]);
    }
  }, [showFilter]);

  useEffect(() => {
    if (elevatorsByAddressList?.length) {
      setRows(
        makeRows({
          elevatorsByAddress: elevatorsByAddressList,
          setDrawerOpen,
          setField: formik.setFieldValue,
        }),
      );
    } else {
      setRows([]);
    }
  }, [elevatorsByAddressList]);

  useEffect(() => {
    setPageCount(Math.ceil(elevatorResponse.elevator.total / page.pageSize));
  }, [elevatorResponse, page.pageSize]);

  useEffect(() => {
    if (!logIssueTime) setLogIssueDate(null);
  }, [logIssueTime]);

  if (isIdle || isLoading) {
    return <Progress />;
  }

  return (
    <PageOverviewLayout
      label="Units"
      renderWidget={
        <Widget
          searchPlaceholder="Try ‘Schindler’ or ‘Mitsubishi’"
          onSearchTextChanged={onSearchTextChanged}
          openMapView={openMapView}
          closeMapView={closeMapView}
          mapViewActive={showMapview}
          setShowFilter={setShowFilter}
          showFilter={showFilter}
        />
      }>
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
              multiple={false}
            />
          </FilterFields>
        </Box>
      </Fade>

      {!showMapview ? (
        <>
          <DataGridLayout
            hideFooter
            rows={rows}
            columns={columns}
            loading={isFetching}
          />
          {pageCount && page.pageSize < elevatorResponse.elevator.total ? (
            <CustomPagination
              pageSize={page.pageSize}
              pageIndex={page.pageIndex}
              handlePageSizeChange={(newPageSize: number) =>
                setQueryParams(
                  formatSearchParamsPageSize(newPageSize, queryParams),
                )
              }
              handlePageChange={(newPage: number) =>
                setQueryParams(
                  formatSearchParamsPageIndex(newPage, queryParams),
                )
              }
              pageCount={pageCount}
              totalRows={elevatorResponse.elevator.total}
            />
          ) : null}
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
        onClose={() => setDrawerOpen(false)}>
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
              handleCancel={() => setDrawerOpen(false)}>
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
                  setTime={setLogIssueTime}>
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
    </PageOverviewLayout>
  );
};
