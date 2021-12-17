import React, {useState} from 'react';
import Box from '@mui/material/Box';
import {makePage} from '../../utils/paging-utils';
import {InvoiceHeader} from './InvoiceHeader';
import {useInvoices} from '../../hooks/useInvoice';
import {InvoiceRow} from './InvoiceRow';

interface InvoicesProp {
  stopLoading: () => void;
}

export const Invoices = ({stopLoading}: InvoicesProp) => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(makePage(0, 10)); // TODO: implement paging
  const {data: invoiceResource} = useInvoices(search, page);

  return (
    <Box>
      <InvoiceHeader />
      <Box sx={{height: '73vh', overflowY: 'scroll'}}>
        {invoiceResource?.data.map((invoice) => (
          <InvoiceRow invoice={invoice} key={invoice.id} />
        ))}
      </Box>
    </Box>
  );
};
