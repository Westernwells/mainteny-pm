import {GridColDef, GridRenderCellParams, GridRowsProp} from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import {capitalize} from 'lodash';
import ElevatorIcon from '@mui/icons-material/Elevator';
import {Stack} from '@mui/material';
import {formatDate} from '../../../utils/datetime';
import {Elevator, ElevatorStatus} from '../../../models/elevator';

function getElevatorStatusChipColor(status: ElevatorStatus) {
  switch (status) {
    case ElevatorStatus.RUNNING:
      return 'success';
    case ElevatorStatus.BROKEN:
      return 'error';
    case ElevatorStatus.STOPPED:
      return 'warning';
    default:
      return 'default';
  }
}

const defaultProps: Partial<GridColDef> = {
  flex: 1,
  headerAlign: 'left',
  align: 'left',
  editable: false,
  renderHeader: (params) => (
    <Typography variant="tableHeaderText" color="textSecondary">
      {params.colDef.headerName}
    </Typography>
  ),
  renderCell: (params) => (
    <Typography variant="subtitle2">{params.value}</Typography>
  ),
};

export const columns: GridColDef[] = [
  {
    ...defaultProps,
    field: 'model',
    headerName: 'MODEL',
    type: 'string',
    flex: 2,
    renderCell: (params) => (
      <Stack direction="row" spacing={1.5}>
        <ElevatorIcon />
        <Typography variant="subtitle2">{params.value}</Typography>
      </Stack>
    ),
  },
  {
    ...defaultProps,
    field: 'unitNumber',
    headerName: 'UNIT NUMBER',
    type: 'string',
  },
  {
    ...defaultProps,
    flex: 2,
    field: 'address',
    headerName: 'ADDRESS',
    type: 'number',
  },
  {
    ...defaultProps,
    flex: 0.5,
    field: 'lastVisitDate',
    headerName: 'LAST VISIT',
    type: 'string',
  },
  {
    ...defaultProps,
    flex: 0.5,
    field: 'nextVisitDate',
    headerName: 'NEXT VISIT',
    type: 'string',
  },
  {
    ...defaultProps,
    field: 'status',
    headerName: 'STATUS',
    renderCell: (params: GridRenderCellParams<ElevatorStatus>) => (
      <Chip
        variant="outlined"
        label={capitalize(params.value.toLocaleLowerCase())}
        color={getElevatorStatusChipColor(params.value)}
      />
    ),
  },
];

export const makeRows = (elevators: Elevator[]): GridRowsProp =>
  elevators.map((elevator, index) => ({
    id: index,
    model: elevator.model,
    unitNumber: elevator.number,
    address: elevator.address.fullName,
    lastVisitDate: formatDate(elevator.lastVisitDate),
    nextVisitDate: '2022-04-12', // TODO: calculate it
    status: elevator.status,
    navigateTo: `/units/details/${elevator.id}`,
  }));
