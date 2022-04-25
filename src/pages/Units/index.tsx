import {useEffect, useRef, useState} from 'react';
import Box from '@mui/material/Box';
import {ElevatorStatus, ElevatorView} from 'models/elevator';
import * as _ from 'lodash';
import {getCenter} from 'geolib';
import {Location, Resource} from 'models/misc';

import {Widget} from 'components/Widget';
import {DataGridLayout} from 'components/DataGridLayout';
import {GridRowsProp} from '@mui/x-data-grid';
import {LogIssue} from 'pages/Units/LogIssue';
import {useLogIssue} from 'hooks/reactQuery/useServiceOrder';
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
  convertToMacro,
  convertToText,
  formatSearchParamsPageIndex,
  formatSearchParamsPageSize,
} from 'utils/utils';
import useTheme from '@mui/material/styles/useTheme';
import {EmptySection} from 'components/EmptySection';
import {columns, makeRows} from './UnitsDataGridProps';
import {UnitsMapsView} from './UnitsMapsView';
import {LogIssueBody} from './LogIssue/LogIssueBody';
import {LogIssueDescription} from './LogIssue/LogIssueDescription';
import {LogIssueUnitInput} from './LogIssue/LogIssueUnitInput';
import {LogIssueTimePreference} from './LogIssue/LogIssueTimePreference';
import {LogIssueDateTime} from './LogIssue/LogIssueDateTime';
import {DataGridElevatorView, ElevatorByAddr} from './Models';
import {upcommingDates} from './Date';

const pageSize = 15;
interface FormikFields {
  description: string;
  elevator?: ElevatorView;
  moreInformation: string;
}

interface UpcommingVisit {
  start: Date;
  end: Date;
}

const validationSchema = Yup.object().shape({
  description: Yup.string().required('description is required'),
});

export const MyUnits = () => {
  const fallback = useRef({
    elevatorByAddress: {} as ElevatorByAddr,
    centerCoord: {longitude: 0, latitude: 0},
  }).current;

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(makePage(0, pageSize));
  const [queryParams, setQueryParams] = useSearchParams();
  const [showFilter, setShowFilter] = useState(false);
  const [showMapview, setShowMapview] = useState(false);
  const [logIssueDate, setLogIssueDate] = useState<Date | null>(null);
  const [logIssueTime, setLogIssueTime] = useState<Date | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [status, setStatus] = useState('');
  const [upcommingVisit, setUpcommingVisit] = useState<UpcommingVisit | null>(
    null,
  );

  const theme = useTheme();

  const [elevatorView, setElevatorView] = useState<{
    elevatorByAddress: ElevatorByAddr;
    centerCoord: Location;
  }>(fallback);

  const {
    data: {total: totalElevators} = createEmptyResource<ElevatorView>(10),
  } = useAllElevators('', makePage(0, 1));

  const {
    data: elevatorResponse = createEmptyResource<ElevatorView>(10),
    isLoading,
    isFetched,
    isFetching,
    isIdle,
  } = useAllElevators(
    search,
    page,
    {status, upcommingVisit},
    {keepPreviousData: true},
  );

  const {mutate: logIssue} = useLogIssue();

  const groupElevatorByAddressList = (elevatorRes?: Resource<ElevatorView>) => {
    const elevatorMap = _.groupBy(
      elevatorRes?.data,
      (elevator: ElevatorView) => elevator.address.fullName,
    );

    return elevatorMap;
  };

  const flatenn = (elevators: {[key: string]: ElevatorView[]}) => {
    let prevAdddressId = '';
    const flatArray: DataGridElevatorView[] = [];
    Object.keys(elevators).forEach((key) => {
      elevators[key].forEach((elevator) => {
        const {address} = elevator;
        const showAddress = address.id !== prevAdddressId;
        flatArray.push({showAddress, ...elevator});
        prevAdddressId = address.id;
      });
    });
    return flatArray;
  };

  useEffect(() => {
    if (!isLoading) {
      const latLng = elevatorResponse?.data.map((elevator: ElevatorView) => ({
        latitude: elevator.address.location.latitude,
        longitude: elevator.address.location.longitude,
      }));
      const centerCoord = getCenter(latLng) as unknown as Location;
      const result = groupElevatorByAddressList(elevatorResponse);

      setElevatorView({
        elevatorByAddress: result,
        centerCoord,
      });
    }
  }, [isLoading, elevatorResponse]);

  useEffect(() => {
    if (elevatorResponse) {
      setPageCount(Math.ceil(elevatorResponse.total / page.pageSize));
    }
  }, [elevatorResponse, page]);

  // TODO: LogIssue to be refactored and improved after VFA

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

  useEffect(() => {
    const currentParams = Object.fromEntries([...queryParams]);

    setPage({
      ...page,
      pageSize: Number(currentParams.pageSize),
      pageIndex: Number(currentParams.pageIndex) - 1,
    });
  }, [queryParams]);

  useEffect(() => {
    if (elevatorView.elevatorByAddress) {
      const flatArr = flatenn(elevatorView.elevatorByAddress);
      setRows(
        makeRows({
          elevators: flatArr,
          setDrawerOpen,
          setField: formik.setFieldValue,
        }),
      );
    } else {
      setRows([]);
    }
  }, [elevatorView]);

  useEffect(() => {
    if (!logIssueTime) setLogIssueDate(null);
  }, [logIssueTime]);

  useEffect(() => {
    if (!showFilter) {
      setStatus('');
      setUpcommingVisit(null);
    }
  }, [showFilter]);

  const openMapView = () => {
    setShowMapview(true);
  };

  const closeMapView = () => {
    setShowMapview(false);
  };

  if (isFetched && !totalElevators) {
    return (
      <EmptySection
        label="No Elevators yet."
        showActionBtn
        btnLabel="Add Elevator"
        containerStyle={{
          height: '100%',
          mb: '10em',
        }}
      />
    );
  }

  if (isLoading || isIdle) {
    return <Progress />;
  }
  return (
    <PageOverviewLayout
      label="Units"
      renderWidget={
        <Widget
          searchPlaceholder="Try ‘Schindler’ or ‘Mitsubishi’"
          openMapView={openMapView}
          closeMapView={closeMapView}
          mapViewActive={showMapview}
          setShowFilter={setShowFilter}
          showFilter={showFilter}
          getSearchValue={(val: string) => {
            setSearch(val);
          }}
        />
      }>
      <Fade in={showFilter} unmountOnExit>
        <Box>
          <FilterFields setShowFilter={setShowFilter}>
            <MultipleSelectCheckmarks
              label="Status"
              options={Object.values(ElevatorStatus).map((item) =>
                convertToText(item),
              )}
              getSelectedValue={(item) => {
                if (item.length) setStatus(convertToMacro(item[0]));
                else setStatus('');
              }}
              multiple={false}
            />

            <MultipleSelectCheckmarks
              label="Upcoming visits"
              options={Object.keys(upcommingDates).map((item) =>
                convertToText(item),
              )}
              getSelectedValue={(item: string[]) => {
                if (item.length)
                  setUpcommingVisit(upcommingDates[convertToMacro(item[0])]);
                else setUpcommingVisit(null);
              }}
              multiple={false}
            />
          </FilterFields>
        </Box>
      </Fade>

      {!showMapview ? (
        <DataGridLayout
          hideFooter={pageCount <= 1}
          rows={rows}
          columns={columns}
          loading={isFetching}
          pageSize={page.pageSize}
          pageIndex={page.pageIndex}
          handlePageSizeChange={(newPageSize: number) =>
            setQueryParams(formatSearchParamsPageSize(newPageSize, queryParams))
          }
          handlePageChange={(newPage: number) =>
            setQueryParams(formatSearchParamsPageIndex(newPage, queryParams))
          }
          pageCount={pageCount}
          totalRows={elevatorResponse.total}
        />
      ) : (
        <UnitsMapsView
          defaultCenterCoord={elevatorView?.centerCoord}
          search={search}
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
                  elevators={elevatorResponse.data}
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
