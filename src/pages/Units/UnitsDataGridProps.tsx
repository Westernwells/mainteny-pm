import {
  GridAlignment,
  GridColDef,
  GridColumnHeaderParams,
  GridRenderCellParams,
  GridRowsProp,
} from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Elevator from '@mui/icons-material/Elevator';
import {ElevatorStatus, ElevatorView} from 'models/elevator';
import {useTheme} from '@mui/material';
import {StatusChip} from 'components/StatusChip';
import {FormikErrors} from 'formik';
import {formatDate} from 'utils/datetime';
import {DataGridElevatorView} from './Models';

const defaultProps = {
  editable: false,
  sortable: false,
  renderHeader: (params: GridColumnHeaderParams) => (
    <Typography variant="tableHeaderText" color="textSecondary">
      {params.colDef.headerName}
    </Typography>
  ),
  renderCell: (params: GridRenderCellParams<any, any, any>) => (
    <Typography variant="subtitle2">{params.value || '-'}</Typography>
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
    field: 'unitName',
    headerName: 'UNIT NAME',
    type: 'string',
    flex: 2,
    headerAlign: 'left',
    editable: false,
    sortable: false,
    renderHeader: (params: GridColumnHeaderParams) => (
      <Typography variant="tableHeaderText" color="textSecondary">
        {params.colDef.headerName}
      </Typography>
    ),
    renderCell: (params: GridRenderCellParams<any, any, any>) => (
      <>
        <Elevator style={{marginInline: '.25em'}} />
        <Typography variant="subtitle2">{params.value || '-'}</Typography>
      </>
    ),
  },
  {
    field: 'lastVisit',
    headerName: 'LAST VISIT',
    type: 'string',
    ...defaultAlignment,
    ...defaultProps,
  },
  {
    field: 'nextVisit',
    headerName: 'NEXT VISIT',
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
    sortable: false,
    disableColumnMenu: true,
    renderHeader: (params: GridColumnHeaderParams) => (
      <Typography variant="tableHeaderText" color="textSecondary">
        {params.colDef.headerName}
      </Typography>
    ),
    renderCell: (params: GridRenderCellParams<any, any, any>) => {
      const theme = useTheme();
      return (
        <StatusChip
          label={
            params.value === ElevatorStatus.RUNNING
              ? ElevatorStatus.RUNNING
              : ElevatorStatus.STOPPED
          }
          bgColor={
            params.value === ElevatorStatus.RUNNING
              ? theme.palette.success.main
              : theme.state?.ratingActive
          }
        />
      );
    },
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
    renderCell: (params) => {
      const theme = useTheme();
      const handleClick = (elevator: ElevatorView) => {
        params.row.setField('elevator', elevator);
        params.row.setDrawerOpen(true);
      };
      return (
        <Button
          variant="outlined"
          color="warning"
          sx={{
            background: theme.palette.warning.outlinedHoverBg,
            px: 3,
            border: 'none',
          }}
          onClick={() => handleClick(params.row.elevator)}>
          <Typography variant="smallBtnText" sx={{textTransform: 'capitalize'}}>
            Log issue
          </Typography>
        </Button>
      );
    },
  },
];

export const makeRows = ({
  elevators,
  setDrawerOpen,
  setField,
}: {
  elevators: DataGridElevatorView[];
  setDrawerOpen: (state: boolean) => void;
  setField: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => Promise<void> | Promise<FormikErrors<any>>;
}): GridRowsProp => {
  const result = elevators.length
    ? elevators.map((elevator: DataGridElevatorView, index: number) => ({
        id: index,
        unitName: elevator.model,
        lastVisit: formatDate(elevator.lastVisitDate),
        nextVisit: formatDate(elevator.nextVisitDate),
        status: elevator.status,
        showHeader: elevator.showAddress,
        headerText: elevator.address.fullName,
        elevator,
        setDrawerOpen,
        setField,
        navigateTo: `details/${elevator.id}`,
      }))
    : console.error('No Data');
  return result || [];
};
