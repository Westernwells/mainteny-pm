import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {makePage} from '../../utils/paging-utils';
import {InvoiceHeader} from './InvoiceHeader';
import {useInvoices} from '../../hooks/useInvoice';
import {InvoiceRow} from './InvoiceRow';
import {Widget} from '../../components/Widget';
import {BtnGroupType} from '../../models/misc';

interface InvoicesProp {
  stopLoading: () => void;
}

export const Invoices = ({stopLoading}: InvoicesProp) => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(makePage(0, 10)); // TODO: implement paging
  const {data: invoiceResource} = useInvoices(search, page);

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Box sx={{mb: 6}}>
          <Typography variant="h4">Invoices</Typography>
        </Box>
        <Box mt={1}>
          <Widget
            btnGroupType={BtnGroupType.ICON}
            searchPlaceholder="Try 'INV000001'"
            onSearchTextChanged={setSearch}
          />
        </Box>
      </Box>
      <Box>
        <InvoiceHeader />
        <Box sx={{height: '73vh', overflowY: 'scroll'}}>
          {invoiceResource?.data.map((invoice) => (
            <InvoiceRow invoice={invoice} key={invoice.id} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};
