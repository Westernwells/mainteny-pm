import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
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
        <Box>
          <Typography variant="h4">Invoices</Typography>
          <Breadcrumbs aria-label="breadcrumb" sx={{mt: 1, mb: 2}}>
            <Link underline="hover" color="inherit" href="/">
              Invoices /
            </Link>
          </Breadcrumbs>
        </Box>
        <Box mt={1}>
          <Widget
            btnGroupType={BtnGroupType.ICON}
            searchPlaceholder="Try ‘Delfar Elevators’"
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
