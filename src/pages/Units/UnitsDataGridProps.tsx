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
import {FormikErrors} from 'formik';
import {StatusChip} from 'components/StatusChip';
import {ElevatorsByAddress} from './Models';
// import {formatDate, toDate} from '../../utils/datetime';

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

const flaten = (elevators: any, flatArray: any[] = []) => {
  let pervAdddressId = '';
  elevators.forEach((elevator: any) => {
    const {address} = elevator;
    elevator.elevators.forEach((item: any) => {
      const showAddress = address.id !== pervAdddressId;
      flatArray.push({address, showAddress, ...item});
      pervAdddressId = address.id;
    });
  });

  return flatArray;
};
export interface UnitsSectionProperty {
  elevatorsByAddress: ElevatorsByAddress[];
  setDrawerOpen: (state: boolean) => void;
  setField: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => Promise<void> | Promise<FormikErrors<any>>;
}

export const makeRows = ({
  elevatorsByAddress,
  setDrawerOpen,
  setField,
}: UnitsSectionProperty): GridRowsProp => {
  const elevatorsList: any[] = flaten(elevatorsByAddress, []);
  const result = elevatorsList.length
    ? elevatorsList.map((item: any, index: number) => ({
        id: index,
        unitName: item.elevator.model,
        lastVisit: item.elevator.lastVisitDate,
        nextVisit: item.elevator.nextVisitDate,
        status: item.elevator.status,
        showHeader: item.showAddress,
        headerText: item.address.fullName,
        elevator: item.elevator,
        setDrawerOpen,
        setField,
        navigateTo: `details/${item.elevator.id}`,
      }))
    : console.error('No Data');
  return result || [];
};
