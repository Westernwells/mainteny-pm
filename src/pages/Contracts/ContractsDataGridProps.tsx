import {
  GridAlignment,
  GridColDef,
  GridColumnHeaderParams,
  GridRenderCellParams,
  GridRowsProp,
} from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import {ContractView} from 'models/contract';
import {formatDate} from '../../utils/datetime';

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

export const columns: GridColDef[] = [
  {
    field: 'contractor',
    headerName: 'CONTRACTOR',
    type: 'string',
    flex: 2,
    headerAlign: 'left',
    ...defaultProps,
  },
  {
    field: 'contractNumber',
    headerName: 'CONTRACT NO',
    type: 'string',
    ...defaultAlignment,
    ...defaultProps,
  },
  {
    field: 'units',
    headerName: 'UNITS',
    type: 'number',
    ...defaultAlignment,
    ...defaultProps,
  },
  {
    field: 'cost',
    headerName: 'COST/YEAR',
    type: 'number',
    ...defaultAlignment,
    ...defaultProps,
  },
  {
    field: 'expiryDate',
    headerName: 'EXPIRY DATE',
    type: 'string',
    ...defaultAlignment,
    ...defaultProps,
  },
  {
    field: 'actions',
    headerName: 'ACTIONS',
    // TODO: Actions not working as expected
    // type: 'actions',
    // getActions: (params: GridRowParams) => [
    //   <GridActionsCellItem
    //     icon={<FileDownloadOutlinedIcon sx={{color: '#2196F3'}} />}
    //     onClick={() => console.log('ACTION: Click', params.id)}
    //     label="Download"
    //   />,
    // ],
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
    renderCell: () => (
      <IconButton
        onClick={() =>
          window.open(`${process.env.PUBLIC_URL}/CNT1000001.pdf`, '_blank')
        }>
        <FileDownloadOutlinedIcon sx={{color: 'info.main'}} />
      </IconButton>
    ),
  },
];

export const makeRows = (contracts: any): GridRowsProp =>
  contracts
    ? contracts.map((item: ContractView, index: number) => ({
        id: index,
        contractor: item.serviceCompany.name,
        contractNumber: item.number,
        units: item.unitCount,
        cost: `${item.price} €`,
        expiryDate: formatDate(item.endTime),
        navigateTo: `details/${item.id}`,
      }))
    : console.error('No Data');
