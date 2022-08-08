import {useCallback, useEffect, useRef, useState} from 'react';
import {ElevatorView} from 'models/elevator';
import {Widget} from 'components/Widget';
import {LogIssue} from 'pages/Units/LogIssue';
import Drawer from '@mui/material/Drawer';
import {useLogIssue} from 'hooks/reactQuery/useServiceOrder';
import {LogIssueBody} from 'pages/Units/LogIssue/LogIssueBody';
import {LogIssueDescription} from 'pages/Units/LogIssue/LogIssueDescription';
import {LogIssueUnitInput} from 'pages/Units/LogIssue/LogIssueUnitInput';
import {LogIssueTimePreference} from 'pages/Units/LogIssue/LogIssueTimePreference';
import {LogIssueDateTime} from 'pages/Units/LogIssue/LogIssueDateTime';
import {GridRowsProp, GridSortModel} from '@mui/x-data-grid';
import {DataGridLayout} from 'components/DataGridLayout';
import {createEmptyResource, makePage} from 'utils/paging-utils';
import {useAllElevators} from 'hooks/reactQuery/useElevator';
import {FilterFields} from 'components/FilterFields';
import {Progress} from 'components/Progress';
import {EmptySection} from 'components/EmptySection';
import {ServiceOrderOrderField} from 'models/service-order';
import {DatePicker} from 'components/DatePicker';
import {Order} from 'models/misc';
import {useFormatDate} from 'hooks/useFormatDate';
import {
  formatSearchParamsPageIndex,
  formatSearchParamsPageSize,
} from 'utils/utils';
import useTheme from '@mui/material/styles/useTheme';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {FlexContainer} from 'components/FlexContainer';
import Box from '@mui/material/Box';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {columns, makeRows} from './UnitsDataGridProps';

const pageInfo = makePage(0, 50);

const validationSchema = Yup.object().shape({
  description: Yup.string().required('description is required'),
});

interface FormikFields {
  description: string;
  elevator?: ElevatorView;
  moreInformation: string;
}

export const UnitListingView = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const formatDate = useFormatDate();
  const [queryParams, setQueryParams] = useSearchParams();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [lastVisitStart, setLastVisitStart] = useState<Date | null>(null);
  const [lastVisitEnd, setLastVisitEnd] = useState<Date | null>(null);
  const [nextVisitStart, setNextVisitStart] = useState<Date | null>(null);
  const [logIssueDate, setLogIssueDate] = useState<Date | null>(null);
  const [logIssueTime, setLogIssueTime] = useState<Date | null>(null);
  const [nextVisitEnd, setNextVisitEnd] = useState<Date | null>(null);
  const [sortOrder, setSortOrder] = useState<Order | undefined>();
  const [orderBy, setOrderBy] = useState<ServiceOrderOrderField | undefined>();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(pageInfo);
  const totalUnitsRef = useRef(0);
  const [pageCount, setPageCount] = useState(0);
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [resetDatePicker, setResetDatePicker] = useState(false);
  const textInput = useRef<HTMLInputElement>(null);
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

  useEffect(() => {
    if (page.pageIndex) {
      setQueryParams(formatSearchParamsPageIndex(1, queryParams));
    }
  }, [search, lastVisitStart, lastVisitEnd, nextVisitStart, nextVisitEnd]);

  useEffect(() => {
    if (!isLoading) {
      setRows(makeRows(elevatorResponse.data, formatDate));
    }
  }, [elevatorResponse, isLoading]);

  useEffect(() => {
    const currentParams = Object.fromEntries([...queryParams]);
    if (currentParams.pageSize)
      setPage({
        ...page,
        pageSize: Number(currentParams.pageSize),
      });
    if (currentParams.pageIndex)
      setPage({
        ...page,
        pageIndex: Number(currentParams.pageIndex) - 1,
      });
  }, [queryParams]);

  useEffect(() => {
    if (elevatorResponse) {
      setPageCount(Math.ceil(elevatorResponse.total / page.pageSize));
    }
  }, [elevatorResponse, page]);

  const handleSortModelChange = useCallback((sortModel: GridSortModel) => {
    // Here you save the data you need from the sort model
    setSortOrder(sortModel[0].sort?.toUpperCase() as Order);
    setOrderBy(sortModel[0].field as ServiceOrderOrderField);
  }, []);

  const clearFilters = () => {
    setLastVisitStart(null);
    setLastVisitEnd(null);
    setNextVisitStart(null);
    setNextVisitEnd(null);
    setResetDatePicker(true);
    setSearch('');
    if (textInput.current) {
      textInput.current.value = '';
    }
  };

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

  if (isFetched && !totalUnitsRef.current) {
    return (
      <EmptySection
        label="No units yet. Please click the button below add."
        btnLabel="Add Unit"
        btnAction={() => {
          navigate('/units/new');
        }}
        containerStyle={{
          height: '100%',
          mb: '10em',
        }}
      />
    );
  }

  const renderFilterItems = () => (
    <FilterFields onClear={() => clearFilters()} wrapperStyle={{width: '90%'}}>
      <DatePicker
        defaultDate={lastVisitStart}
        containerStyles={{mr: '1em'}}
        reset={resetDatePicker}
        getReset={(val) => {
          if (val) {
            setResetDatePicker(false);
          }
        }}
        maxDate={lastVisitEnd || new Date()}
        getSelectedDate={(date) => setLastVisitStart(date)}
        inputLabelProps={{shrink: undefined}}
        textFieldProps={{
          label: 'Last Visit Start',
          sx: {background: '#fff'},
        }}
      />
      <DatePicker
        defaultDate={lastVisitEnd}
        maxDate={new Date()}
        minDate={lastVisitStart || undefined}
        reset={resetDatePicker}
        getReset={(val) => {
          if (val) {
            setResetDatePicker(false);
          }
        }}
        containerStyles={{mr: '1em'}}
        getSelectedDate={(date) => setLastVisitEnd(date)}
        inputLabelProps={{shrink: undefined}}
        textFieldProps={{
          label: 'Last Visit End',
          sx: {background: '#fff'},
        }}
      />

      <DatePicker
        defaultDate={nextVisitStart}
        minDate={new Date()}
        maxDate={nextVisitEnd || undefined}
        reset={resetDatePicker}
        getReset={(val) => {
          if (val) {
            setResetDatePicker(false);
          }
        }}
        containerStyles={{mr: '1em'}}
        getSelectedDate={(date) => setNextVisitStart(date)}
        inputLabelProps={{shrink: undefined}}
        textFieldProps={{
          label: 'Next Visit Start',
          sx: {background: '#fff'},
        }}
      />
      <DatePicker
        defaultDate={nextVisitEnd}
        minDate={nextVisitStart || new Date()}
        reset={resetDatePicker}
        getReset={(val) => {
          if (val) {
            setResetDatePicker(false);
          }
        }}
        containerStyles={{mr: '1em'}}
        getSelectedDate={(date) => setNextVisitEnd(date)}
        inputLabelProps={{shrink: undefined}}
        textFieldProps={{
          label: 'Next Visit End',
          sx: {background: '#fff'},
        }}
      />
    </FilterFields>
  );

  const renderWidget = () => (
    <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
      <Widget
        searchPlaceholder="Search by number, model, customer, address etc."
        getSearchValue={(val) => setSearch(val)}
        refInput={textInput}
        filterItems={renderFilterItems()}
      />
    </Box>
  );

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
        scrollToTop={search}
        loading={isFetching}
        pageSize={page.pageSize}
        pageIndex={page.pageIndex + 1}
        onSortModelChange={handleSortModelChange}
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
