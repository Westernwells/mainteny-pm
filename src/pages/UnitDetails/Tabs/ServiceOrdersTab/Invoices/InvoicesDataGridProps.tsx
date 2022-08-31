import {GridColDef, GridRenderCellParams, GridRowsProp} from '@mui/x-data-grid';
import {formatCurrency} from 'utils/currency';
import {toDate} from 'utils/datetime';
import {InvoiceStatus, InvoiceView} from 'models/invoice';
import {FormatDate} from 'models/misc';
import {StatusChip} from 'components/StatusChip';
import {getColumnProps} from 'components/DataGridLayout';

export const getInvoiceStatusStyles = (
  status: string,
): {
  label: string;
  color:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning'
    | 'action.active';
} => {
  switch (status) {
    case InvoiceStatus.PAID:
      return {label: 'Paid', color: 'success'};
    case InvoiceStatus.DRAFT:
      return {label: 'Draft', color: 'action.active'};
    case InvoiceStatus.EXPIRED:
      return {label: 'Expired', color: 'error'};
    case InvoiceStatus.NOT_PAID:
      return {label: 'Unpaid', color: 'warning'};
    default:
      return {label: '-', color: 'default'};
  }
};

export const columns: GridColDef[] = [
  getColumnProps({
    field: 'number',
    headerName: 'number',
    variant: 'uppercase',
  }),
  getColumnProps({
    field: 'date',
    headerName: 'invoice date',
    variant: 'uppercase',
  }),
  getColumnProps({
    field: 'amount',
    headerName: 'total amount',
    align: 'right',
    variant: 'uppercase',
  }),
  getColumnProps({
    field: 'status',
    headerName: 'status',
    align: 'center',
    variant: 'uppercase',
    renderCell: (params: GridRenderCellParams<any, any, any>) => (
      <StatusChip
        label={getInvoiceStatusStyles(params.value).label}
        color={getInvoiceStatusStyles(params.value).color}
        maxChars={8}
      />
    ),
  }),
];

export const makeRows = (
  invoices: InvoiceView[],
  formatDate: FormatDate = () => '',
): GridRowsProp =>
  invoices.length
    ? invoices.map((item, index: number) => ({
        id: index,
        date: formatDate(toDate(item.issuedDate)),
        number: item.number,
        amount: `${formatCurrency(
          item
            ? item.totalAmount.netAmount /
                10 ** item.totalAmount.fractionDigits!
            : 0,
          {
            currency: item.totalAmount.currency,
          },
        )}`,
        status: item.status,
        invoice: item,
        navigateTo: `/invoices/details/${item.id}`,
      }))
    : [];
