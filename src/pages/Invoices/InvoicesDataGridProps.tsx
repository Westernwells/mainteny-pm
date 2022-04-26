import {
  GridAlignment,
  GridColDef,
  GridColumnHeaderParams,
  GridRenderCellParams,
  GridRowsProp,
} from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import Chip from '@mui/material/Chip';
// import {fetchDownloadUrl} from 'hooks/reactQuery/useDownloadUrl';
import {InvoiceStatus} from 'models/invoice';
import {formatCurrency} from 'utils/currency';
import {convertToText} from 'utils/utils';
import {formatDate, toDate} from '../../utils/datetime';

const defaultProps = {
  editable: false,
  renderHeader: (params: GridColumnHeaderParams) => (
    <Typography variant="tableHeaderText" color="textSecondary">
      {params.colDef.headerName}
    </Typography>
  ),
  renderCell: (params: GridRenderCellParams<any, any, any>) => (
    <Typography variant="subtitle2">{params.value}</Typography>
  ),
};
const defaultAlignment: {
  flex: number;
  headerAlign: GridAlignment;
  align: GridAlignment;
} = {
  flex: 1,
  headerAlign: 'center',
  align: 'center',
};

function getChipColor(status: InvoiceStatus) {
  switch (status) {
    case InvoiceStatus.PAID:
      return 'success';
    case InvoiceStatus.NOT_PAID:
      return 'warning';
    default:
      return 'default';
  }
}

export const columns: GridColDef[] = [
  {
    field: 'invoiceDate',
    headerName: 'INVOICE DATE',
    type: 'string',
    flex: 2,
    headerAlign: 'left',
    ...defaultProps,
  },
  {
    field: 'invoiceNumber',
    headerName: 'INVOICE NUMBER',
    type: 'string',
    ...defaultAlignment,
    ...defaultProps,
  },
  {
    field: 'serviceCompany',
    headerName: 'SERVICE COMPANY',
    type: 'string',
    flex: 1.5,
    ...defaultProps,
  },
  {
    field: 'amount',
    headerName: 'TOTAL AMOUNT',
    type: 'string',
    ...defaultAlignment,
    ...defaultProps,
  },
  {
    field: 'status',
    headerName: 'STATUS',
    type: 'string',
    ...defaultAlignment,
    editable: false,
    renderHeader: (params: GridColumnHeaderParams) => (
      <Typography variant="tableHeaderText" color="textSecondary">
        {params.colDef.headerName}
      </Typography>
    ),
    renderCell: (params: GridRenderCellParams<any, any, any>) => (
      <Chip
        variant="outlined"
        label={convertToText(params.value)}
        color={getChipColor(params.value)}
      />
    ),
  },
  {
    field: 'actions',
    headerName: 'ACTIONS',
    editable: false,
    sortable: false,
    disableColumnMenu: true,
    disableExport: true,
    ...defaultAlignment,

    renderHeader: (params) => (
      <Typography variant="tableHeaderText" color="textSecondary">
        {params.colDef.headerName}
      </Typography>
    ),
    renderCell: (params) => (
      <IconButton
        onClick={async () => {
          console.log(params);
          // const downloadUrls = await fetchDownloadUrl(
          //   params.value.pdfPath,
          //   params.value.serviceCompanyId,
          // );
          // const downloadUrlPaths = downloadUrls[params.value.pdfPath];
          // if (downloadUrlPaths) {
          //   window.open(`${process.env.REACT_APP_BASE_URL}/INV000128.pdf`, '_blank');
          // }
          window.open(
            `${process.env.REACT_APP_BASE_URL}/INV000128.pdf`,
            '_blank',
          );
        }}>
        <FileDownloadOutlinedIcon sx={{color: 'info.main'}} />
      </IconButton>
    ),
  },
];

export const makeRows = (invoices: any): GridRowsProp =>
  invoices.data &&
  invoices.data.map((item: any, index: number) => ({
    id: index,
    invoiceDate: formatDate(toDate(item.issuedDate)),
    invoiceNumber: item.number,
    serviceCompany: item.serviceCompany.name,
    amount: `${formatCurrency(
      item
        ? item.totalAmount.amount / 10 ** item.totalAmount.fractionDigits!
        : 0,
      {
        currency: item.totalAmount.currency,
      },
    )}`,
    status: item.status,
    actions: {
      pdfPath: item.additionalInfo.pdfPath,
      serviceCompanyId: item.serviceCompany.id,
    },
    navigateTo: `/invoices/details/${item.id}`,
  }));
