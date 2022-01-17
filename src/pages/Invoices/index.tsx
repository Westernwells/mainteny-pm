import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {BtnGroupType} from 'models/misc';
import {makePage} from '../../utils/paging-utils';
import {InvoiceHeader} from './InvoiceHeader';
import {useInvoices} from '../../hooks/reactQuery/useInvoice';
import {InvoiceRow} from './InvoiceRow';
import {Widget} from '../../components/Widget';

export const Invoices = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(makePage(0, 10)); // TODO: implement paging
  const [showFilter, setShowFilter] = useState(false);
  const {data: invoiceResource} = useInvoices(search, page);

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
      <Box>
        <InvoiceHeader />
        <Box sx={{height: '73vh', overflowY: 'scroll', paddingBottom: '1rem'}}>
          {invoiceResource?.data.map((invoice) => (
            <InvoiceRow invoice={invoice} key={invoice.id} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};
