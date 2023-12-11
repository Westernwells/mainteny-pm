import {useEffect, useRef, useState} from 'react';
import {GridRowsProp} from '@mui/x-data-grid';
import {useSearchParams, useNavigate} from 'react-router-dom';
import {FilterFields} from 'components/FilterFields';
import {MultipleSelectCheckmarks} from 'components/MultipleSelectCheckmarks';
import {DataGridLayout} from 'components/DataGridLayout';
import {
  InvoiceStatus,
  InvoiceStatusView,
  InvoiceStatusViewWithoutDraft,
  InvoiceView,
  mapInvoiceStatus,
} from 'models/invoice';
import {useInvoices} from 'hooks/reactQuery/useInvoice';
import {PageListingLayout} from 'components/PageListingLayout';
import {
  formatSearchParamsPageIndex,
  formatSearchParamsPageSize,
} from 'utils/utils';
import {Progress} from 'components/Progress';
import {EmptySection} from 'components/EmptySection';
import {useFormatDate} from 'hooks/useFormatDate';
import {useUserSession} from 'hooks/reactQuery/useUserSession';
import {columns, makeRows} from './InvoicesDataGridProps';
import {createEmptyResource, makePage} from '../../utils/paging-utils';
import {Widget} from '../../components/Widget';

const pageSize = 25;

export const Invoices = () => {
  const {user} = useUserSession();
  const navigate = useNavigate();
  const formatDate = useFormatDate();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(makePage(0, pageSize));
  const [queryParams, setQueryParams] = useSearchParams();
  const totalInvoiceRef = useRef(0);
  const [status, setStatus] = useState<InvoiceStatus>();
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [pageCount, setPageCount] = useState(0);
  const textInput = useRef<HTMLInputElement>(null);

  const {
    data: invoiceResource = createEmptyResource<InvoiceView>(10),
    isLoading,
    isFetching,
    isFetched,
    isIdle,
  } = useInvoices(
    {
      pageIndex: page.pageIndex,
      pageSize: page.pageSize,
      query: search,
      status: status
        ? [status]
        : [
            InvoiceStatus.CANCELLED,
            InvoiceStatus.EXPIRED,
            InvoiceStatus.NOT_PAID,
            InvoiceStatus.PAID,
            InvoiceStatus.PARTIALLY_PAID,
          ],
    },
    {keepPreviousData: true},
  );

  totalInvoiceRef.current = totalInvoiceRef.current || invoiceResource.total;

  useEffect(() => {
    if (page.pageIndex) {
      setQueryParams(formatSearchParamsPageIndex(1, queryParams));
    }
  }, [search, status]);

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
    if (!isLoading) {
      setRows(
        makeRows(
          invoiceResource.data,
          user?.userAccount.serviceCompany.id,
          formatDate,
        ),
      );
    }
  }, [invoiceResource.data, isLoading]);

  useEffect(() => {
    setPageCount(Math.ceil(invoiceResource.total / page.pageSize));
  }, [invoiceResource, pageSize]);

  const navigateToNewInvoice = () => {
    navigate('/invoices/new');
  };

  if (isIdle || isLoading) {
    return <Progress />;
  }

  const renderFilterItems = () => (
    <FilterFields
      onClear={() => {
        setStatus(undefined);
        setSearch('');
        if (textInput.current) {
          textInput.current.value = '';
        }
      }}>
      <MultipleSelectCheckmarks
        label="Status"
        options={Object.values(InvoiceStatusViewWithoutDraft).map(
          (value) => value,
        )}
        getSelectedValue={(items: string[]) => {
          setStatus(mapInvoiceStatus((items as InvoiceStatusView[])[0]));
        }}
        multiple={false}
        initialSelectedItems={status ? [status] : []}
      />
    </FilterFields>
  );

  if (isFetched && !totalInvoiceRef.current) {
    return (
      <EmptySection
        label="No invoices yet. Please click the button below to add."
        btnLabel="Add Invoice"
        containerStyle={{
          height: '100%',
          mb: '10em',
        }}
        btnAction={navigateToNewInvoice}
      />
    );
  }

  return (
    <PageListingLayout
      renderWidget={
        <Widget
          searchPlaceholder="Search by number, customer, service type etc."
          getSearchValue={(val: string) => setSearch(val)}
          refInput={textInput}
          filterItems={renderFilterItems()}
        />
      }>
      <DataGridLayout
        rows={rows}
        columns={columns}
        loading={isFetching}
        scrollToTop={search}
        hideFooter={pageCount <= 1}
        pageSize={page.pageSize}
        pageIndex={page.pageIndex + 1}
        handlePageSizeChange={(newPageSize: number) =>
          setQueryParams(formatSearchParamsPageSize(newPageSize, queryParams))
        }
        handlePageChange={(newPage: number) =>
          setQueryParams(formatSearchParamsPageIndex(newPage, queryParams))
        }
        pageCount={pageCount}
        totalRows={invoiceResource?.total}
      />
    </PageListingLayout>
  );
};
