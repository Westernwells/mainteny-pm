import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import {GridRowsProp} from '@mui/x-data-grid';
import {FilterFields} from 'components/FilterFields';
import {MultipleSelectCheckmarks} from 'components/MultipleSelectCheckmarks';
import {DataGridLayout} from 'components/DataGridLayout';
import {PageOverviewLayout} from 'components/PageOverviewLayout';
import {CustomPagination} from 'components/CustomPagination';

import {useQueryClient} from 'react-query';
import {queryKeys as qks} from 'reactQuery/constants';
import {createEmptyResource, makePage} from 'utils/paging-utils';
import {fetchInvoices, useInvoices} from 'hooks/reactQuery/useInvoice';
import {Widget} from 'components/Widget';
import {usePropertyManager} from 'hooks/reactQuery/usePropertyManager';

import {InvoiceStatus, InvoiceStatusView, InvoiceView} from 'models/invoice';
import {columns, makeRows} from './InvoicesDataGridProps';

const pageSize = 25;

export const Invoices = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(makePage(0, pageSize)); // TODO: implement paging
  const [showFilter, setShowFilter] = useState(false);
  const [amount, setAmount] = useState<number[][]>([]);
  const [status, setStatus] = useState<string[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [rows, setRows] = useState<GridRowsProp>([]);
  const queryClient = useQueryClient();
  const {data: user} = usePropertyManager();

  const {data: invoiceResource = createEmptyResource<InvoiceView>(10)} =
    useInvoices(
      {
        pageIndex: page.pageIndex,
        pageSize: page.pageSize,
        query: search,
        status: [InvoiceStatus.PAID, InvoiceStatus.NOT_PAID],
      },
      {amount, status},
      user,
    );

  //  prefetch next page when page changes
  useEffect(() => {
    // assume increment of page by one
    const nextPage = page.pageIndex + 1;
    const newPageInfo = {pageIndex: nextPage, pageSize: page.pageSize};
    const params = {
      pageIndex: newPageInfo.pageIndex,
      pageSize: newPageInfo.pageSize,
      query: search,
      status: [InvoiceStatus.PAID, InvoiceStatus.NOT_PAID],
    };
    if (user && invoiceResource) {
      queryClient.prefetchQuery([qks.fetchInvoices, params], () =>
        fetchInvoices(params, user.propertyOwner.id),
      );
    }
  }, [queryClient, page, search, user, invoiceResource]);

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
    if (invoiceResource?.data) {
      setRows(makeRows(invoiceResource));
    } else {
      setRows([]);
    }

    if (!showFilter) {
      setAmount([]);
      setStatus([]);
    }
  }, [invoiceResource, showFilter]);

  useEffect(() => {
    setPageCount(Math.ceil(invoiceResource.total / page.pageSize));
  }, [invoiceResource, pageSize]);

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
      <Box>
        <DataGridLayout hideFooter rows={rows} columns={columns} />
        {pageCount ? (
          <CustomPagination
            pageSize={page.pageSize}
            handlePageSizeChange={(newPageSize: number) =>
              setPage({...page, pageSize: newPageSize})
            }
            handlePageChange={(newPage: number) => {
              setPage({...page, pageIndex: newPage - 1});
            }}
            pageCount={pageCount}
            totalRows={invoiceResource?.total}
          />
        ) : null}
      </Box>
    </PageOverviewLayout>
  );
};
