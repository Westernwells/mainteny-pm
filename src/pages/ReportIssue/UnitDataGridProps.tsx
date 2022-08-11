import {GridColDef, GridRenderCellParams, GridRowsProp} from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {FormatDate} from 'models/misc';
import {ElevatorView} from 'models/elevator';
import {FormRadio} from 'components/form/FormRadio';
import {getColumnProps} from 'components/DataGridLayout';

export const columns = (activeId: string): GridColDef[] => [
  getColumnProps({
    field: 'number',
    headerName: 'Unit Number',
    variant: 'titleCase',
    renderCell: (params: GridRenderCellParams<any, ElevatorView, any>) => (
      <Box sx={{display: 'flex'}}>
        <FormRadio
          value={params.row.id}
          checked={params.row.id === activeId}
          label={
            <Typography
              variant="body2"
              component="span"
              sx={{display: 'flex', alignItems: 'center'}}>
              {params.value || '-'}
            </Typography>
          }
        />
      </Box>
    ),
  }),
  getColumnProps({
    field: 'model',
    headerName: 'Model',
    variant: 'titleCase',
  }),
  getColumnProps({
    field: 'address',
    headerName: 'Address',
    variant: 'titleCase',
  }),
  getColumnProps({
    field: 'lastVisit',
    headerName: 'Last Visit',
    variant: 'titleCase',
  }),
];

export const makeRows = (
  elevators: ElevatorView[],
  formatDate: FormatDate = () => '',
): GridRowsProp => {
  const result =
    elevators.length &&
    elevators.map((elevator: ElevatorView) => ({
      id: elevator.id,
      number: elevator.externalId,
      model: elevator.model,
      lastVisit: formatDate(elevator.lastVisitDate, 'dd.MM.yyyy'),
      address: elevator.address.fullName,
      elevator,
    }));
  return result || [];
};
