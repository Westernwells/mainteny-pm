/* eslint-disable */
import {useEffect, useRef, useState} from 'react';
import Box from '@mui/material/Box';
import {ElevatorStatus, ElevatorView} from 'models/elevator';
import * as _ from 'lodash';
import {getCenter} from 'geolib';
import {Location, Order, Resource} from 'models/misc';

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
import MapIcon from '@mui/icons-material/Map';
import {EmptySection} from 'components/EmptySection';
import {useFormatDate} from 'hooks/useFormatDate';
import {columns, makeRows} from '../UnitsDataGridProps';
import {LogIssueBody} from '../LogIssue/LogIssueBody';
import {LogIssueDescription} from '../LogIssue/LogIssueDescription';
import {LogIssueUnitInput} from '../LogIssue/LogIssueUnitInput';
import {LogIssueTimePreference} from '../LogIssue/LogIssueTimePreference';
import {LogIssueDateTime} from '../LogIssue/LogIssueDateTime';
import {DataGridElevatorView, ElevatorByAddr} from '../Models';
import {upcommingDates} from '../Date';
import {ServiceOrderOrderField} from 'models/service-order';
import {FlexContainer} from 'components/FlexContainer';

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

export const UnitListingView = () => {
  const fallback = useRef({
    elevatorByAddress: {} as ElevatorByAddr,
    centerCoord: {longitude: 0, latitude: 0},
  }).current;

  const [search, setSearch] = useState('');
  const formatDate = useFormatDate();
  const [page, setPage] = useState(makePage(0, pageSize));
  const [queryParams, setQueryParams] = useSearchParams();
  const totalUnitsRef = useRef(0);
  const [lastVisitStart, setLastVisitStart] = useState<Date | null>(null);
  const [lastVisitEnd, setLastVisitEnd] = useState<Date | null>(null);
  const [nextVisitStart, setNextVisitStart] = useState<Date | null>(null);
  const [nextVisitEnd, setNextVisitEnd] = useState<Date | null>(null);
  const [sortOrder, setSortOrder] = useState<Order | undefined>();
  const [orderBy, setOrderBy] = useState<ServiceOrderOrderField | undefined>();
  const [showFilter, setShowFilter] = useState(false);
  const [showMapview, setShowMapview] = useState(false);
  const [logIssueDate, setLogIssueDate] = useState<Date | null>(null);
  const [logIssueTime, setLogIssueTime] = useState<Date | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [status, setStatus] = useState('');
  const textInput = useRef<HTMLInputElement>(null);
  const [upcommingVisit, setUpcommingVisit] = useState<UpcommingVisit | null>(
    null,
  );

  const theme = useTheme();

  const [elevatorView, setElevatorView] = useState<{
    elevatorByAddress: ElevatorByAddr;
    centerCoord: Location;
  }>(fallback);

  const {
    data: elevatorResponse = createEmptyResource<ElevatorView>(10),
    isLoading,
    isFetched,
    isFetching,
  } = useAllElevators(
    {
      query: search,
      pageIndex: page.pageIndex,
      pageSize: page.pageSize,
      ...(lastVisitStart && {
        lastVisitDateStart: formatDate(lastVisitStart, 'yyyy-MM-dd'),
      }),
      ...(lastVisitEnd && {
        lastVisitDateEnd: formatDate(lastVisitEnd, 'yyyy-MM-dd'),
      }),
      ...(nextVisitStart && {
        nextVisitDateStart: formatDate(nextVisitStart, 'yyyy-MM-dd'),
      }),
      ...(nextVisitEnd && {
        nextVisitDateEnd: formatDate(nextVisitEnd, 'yyyy-MM-dd'),
      }),
      ...(sortOrder && {order: sortOrder}),
      ...(orderBy && {orderBy}),
    },
    {keepPreviousData: true},
  );

  const {mutate: logIssue} = useLogIssue();

  totalUnitsRef.current = totalUnitsRef.current || elevatorResponse.total;

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
    if (elevatorResponse && !isLoading) {
      setPageCount(Math.ceil(elevatorResponse.total / page.pageSize));
    }
  }, [elevatorResponse, page, isLoading]);

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
        serviceCompanyId: values.elevator?.propertyOwner.serviceCompany.id,
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

  const renderWidget = () => (
    <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
      <Widget
        searchPlaceholder="Search by number, model, customer, address etc."
        getSearchValue={(val) => setSearch(val)}
        refInput={textInput}
        filterItems={null}
      />
    </Box>
  );

  if (isFetched && !totalUnitsRef.current) {
    return (
      <EmptySection
        label="Units will appear here once they are added!"
        containerStyle={{
          height: '100%',
          mb: '10em',
        }}
      />
    );
  }
  if (isLoading) {
    return <Progress />;
  }
  return (
    <FlexContainer>
      {renderWidget()}
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
    </FlexContainer>
  );
};
