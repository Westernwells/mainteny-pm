import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import {GridRowsProp} from '@mui/x-data-grid';
import {FilterFields} from 'components/FilterFields';
import {MultipleSelectCheckmarks} from 'components/MultipleSelectCheckmarks';
import {DataGridLayout} from 'components/DataGridLayout';
import {PageOverviewLayout} from 'components/PageOverviewLayout';
import {CustomPagination} from 'components/CustomPagination';
import {createEmptyResource, makePage} from 'utils/paging-utils';
import {useInvoices} from 'hooks/reactQuery/useInvoice';
import {Widget} from 'components/Widget';
import {InvoiceStatus, InvoiceStatusView, InvoiceView} from 'models/invoice';
import {EmptySection} from 'components/EmptySection';
import {Progress} from 'components/Progress';
import {useSearchParams} from 'react-router-dom';
import {
  formatSearchParamsPageSize,
  formatSearchParamsPageIndex,
} from 'utils/utils';
import {columns, makeRows} from './InvoicesDataGridProps';

const pageSize = 25;

export const Invoices = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(makePage(0, pageSize));
  const [queryParams, setQueryParams] = useSearchParams();
  const [showFilter, setShowFilter] = useState(false);
  const [amount, setAmount] = useState<number[][]>([]);
  const [status, setStatus] = useState<string[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [rows, setRows] = useState<GridRowsProp>([]);
  const {
    data: invoiceResource = createEmptyResource<InvoiceView>(10),
    isLoading,
    isFetching,
    isFetched,
  } = useInvoices(
    {
      pageIndex: page.pageIndex,
      pageSize: page.pageSize,
      query: search,
      status: [InvoiceStatus.PAID, InvoiceStatus.NOT_PAID],
    },
    {amount, status},
    {keepPreviousData: true},
  );

  useEffect(() => {
    const currentParams = Object.fromEntries([...queryParams]);

    setPage({
      ...page,
      pageSize: Number(currentParams.pageSize),
      pageIndex: Number(currentParams.pageIndex) - 1,
    });
  }, [queryParams]);

  const amountRangeConvertor = (selectedItems: string[]) => {
    const range: number[][] = [];
    selectedItems.forEach((item) => {
      switch (item) {
        case 'Below 1000 EUR':
          range.push([0, 1000]);
          break;

        case '1000 - 3000 EUR':
          range.push([1000, 3000]);
          break;

        case '3000 - 5000 EUR':
          range.push([3000, 5000]);
          break;

        case 'Above 5000 EUR':
          range.push([5000, 99999]);
          break;

        default:
          break;
      }
    });
    setAmount(range);
  };

  useEffect(() => {
    if (invoiceResource.total) {
      setRows(makeRows(invoiceResource));
    }
  }, [invoiceResource]);

  useEffect(() => {
    if (!showFilter) {
      setAmount([]);
      setStatus([]);
    }
  }, [showFilter]);

  useEffect(() => {
    setPageCount(Math.ceil(invoiceResource.total / page.pageSize));
  }, [invoiceResource, pageSize]);

  if (isFetched && !invoiceResource.total) {
    return (
      <EmptySection
        label="No invoices yet. You will see invoices here once they are created"
        btnLabel="Add Invoice"
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
    <PageOverviewLayout
      label="Invoices"
      renderWidget={
        <Widget
          searchPlaceholder="Try 'INV000001'"
          onSearchTextChanged={(val: string) => setSearch(val)}
          setShowFilter={setShowFilter}
          showFilter={showFilter}
        />
      }>
      <Fade in={showFilter} unmountOnExit>
        <Box>
          <FilterFields setShowFilter={setShowFilter}>
            <MultipleSelectCheckmarks
              label="Total Amount"
              options={[
                'Below 1000 EUR',
                '1000 - 3000 EUR',
                '3000 - 5000 EUR',
                'Above 5000 EUR',
              ]}
              getSelectedValue={(item) => amountRangeConvertor(item)}
              multiple={false}
            />

            <MultipleSelectCheckmarks
              label="Status"
              options={Object.values(InvoiceStatusView).map((value) => value)}
              getSelectedValue={(items) =>
                setStatus(
                  items.map((item) =>
                    item === 'Paid'
                      ? InvoiceStatus.PAID
                      : InvoiceStatus.NOT_PAID,
                  ),
                )
              }
              multiple={false}
            />
          </FilterFields>
        </Box>
      </Fade>

      <>
        <DataGridLayout
          rows={rows}
          columns={columns}
          loading={isFetching}
          hideFooter
        />
        {pageCount ? (
          <CustomPagination
            pageSize={page.pageSize}
            pageIndex={page.pageIndex}
            handlePageSizeChange={(newPageSize: number) =>
              setQueryParams(
                formatSearchParamsPageSize(newPageSize, queryParams),
              )
            }
            handlePageChange={(newPage: number) =>
              setQueryParams(formatSearchParamsPageIndex(newPage, queryParams))
            }
            pageCount={pageCount}
            totalRows={invoiceResource?.total}
          />
        ) : null}
      </>
    </PageOverviewLayout>
  );
};
