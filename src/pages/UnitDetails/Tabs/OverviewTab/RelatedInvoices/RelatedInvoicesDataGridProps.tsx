import {GridColDef, GridRenderCellParams, GridRowsProp} from '@mui/x-data-grid';
import {formatCurrency} from 'utils/currency';
import {toDate} from 'utils/datetime';
import {InvoiceStatus, InvoiceView} from 'models/invoice';
import {FormatDate} from 'models/misc';
import {StatusChip} from 'components/StatusChip';
import {getColumnProps} from 'components/DataGridLayout';
import {ServiceOrderIcons} from 'components/ServiceOrderIcons';
import {ServiceOrderTypeText} from 'components/ServiceOrderTypeText';

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
    variant: 'titleCase',
  }),
  getColumnProps({
    field: 'date',
    headerName: 'invoice date',
    align: 'center',
    variant: 'titleCase',
  }),
  getColumnProps({
    field: 'order',
    headerName: 'order number',
    align: 'right',
    variant: 'titleCase',
  }),
  getColumnProps({
    field: 'type',
    headerName: 'service type',
    variant: 'titleCase',
    renderCell: (params: GridRenderCellParams<any, any, any>) => (
      <>
        <ServiceOrderIcons serviceOrderType={params.row.type} size="small" />
        <ServiceOrderTypeText
          serviceOrderType={params.row.type}
          capitalizeText
          variant="body2"
          style={{pl: '0.5rem'}}
        />
      </>
    ),
  }),
  getColumnProps({
    field: 'amount',
    headerName: 'total amount',
    align: 'right',
    variant: 'titleCase',
  }),
  getColumnProps({
    field: 'status',
    headerName: 'status',
    align: 'center',
    variant: 'titleCase',
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
  serviceCompanyId?: string,
  formatDate: FormatDate = () => '',
): GridRowsProp =>
  invoices.length
    ? invoices.map((item, index: number) => ({
        id: index,
        date: formatDate(toDate(item.issuedDate)),
        number: item.number,
        order: item.serviceOrder.number,
        customer: item.propertyOwner.name,
        type: item.serviceOrder.type,
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
        actions: {
          pdfPath: item.additionalInfo.pdfPath,
          serviceCompanyId,
        },
        invoice: item,
        navigateTo: `/invoices/details/${item.id}`,
      }))
    : [];
