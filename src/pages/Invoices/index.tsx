import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {GridRowsProp} from '@mui/x-data-grid';
import {DataGridLayout} from 'components/DataGridLayout';
import {BtnGroupType} from 'models/misc';
import {InvoiceStatus} from 'models/invoice';
import {columns, makeRows} from './InvoicesDataGridProps';
import {makePage} from '../../utils/paging-utils';
import {useInvoices} from '../../hooks/reactQuery/useInvoice';
import {Widget} from '../../components/Widget';

export const Invoices = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(makePage(0, 10)); // TODO: implement paging
  const [showFilter, setShowFilter] = useState(false);
  const [rows, setRows] = useState<GridRowsProp>([]);
  const {data: invoiceResource} = useInvoices({
    pageIndex: page.pageIndex,
    pageSize: page.pageSize,
    query: search,
    status: [InvoiceStatus.PAID, InvoiceStatus.NOT_PAID],
  });

  useEffect(() => {
    if (invoiceResource?.data) {
      setRows(makeRows(invoiceResource));
    }
  }, [invoiceResource]);

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Box sx={{mb: 4}}>
          <Typography variant="h4">Invoices</Typography>
        </Box>
        <Box mt={1}>
          <Widget
            btnGroupType={BtnGroupType.ICON}
            searchPlaceholder="Try 'INV000001'"
            onSearchTextChanged={setSearch}
            setShowFilter={setShowFilter}
            showFilter={showFilter}
          />
        </Box>
      </Box>
      <DataGridLayout rows={rows} columns={columns} />
    </Box>
  );
};
