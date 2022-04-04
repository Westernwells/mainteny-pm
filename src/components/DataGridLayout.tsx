import {DataGrid, GridColDef, GridRowsProp} from '@mui/x-data-grid';
import {useNavigate} from 'react-router-dom';

interface Props {
  rows: GridRowsProp;
  columns: GridColDef[];
  hideFooter?: boolean;
}

export const DataGridLayout = ({rows, columns, hideFooter = false}: Props) => {
  const navigate = useNavigate();

  const rowClassNames: any[string] = [];
  rows.forEach((item) => {
    if (item.showHeader) {
      rowClassNames[`& .MuiDataGrid-rowHeading-${item.id}`] = {
        marginTop: '2em',
        position: 'relative',
        '&::before': {
          content: `"${item.headerText}"`,
          position: 'absolute',
          width: '100%',
          top: '-2em',
          paddingBlock: '.5em .25em',
          paddingLeft: '.75em',
          color: 'text.secondary',
          fontWeight: 600,
          fontSize: '0.9375rem',
          lineHeight: 1.73,
          letterSpacing: '0.15px',
        },
      };
    }
  });

  return (
    <DataGrid
      headerHeight={50}
      rows={rows}
      columns={columns}
      disableSelectionOnClick
      disableColumnFilter
      hideFooter={hideFooter}
      onCellClick={(params, e) => {
        e.preventDefault();
        if (params.field !== 'actions') {
          navigate(params.row.navigateTo);
        }
      }}
      getRowClassName={(params) =>
        params.row.showHeader ? `MuiDataGrid-rowHeading-${params.row.id}` : ''
      }
      sx={{
        height: 'max(400px, 60vh) !important',
        maxHeight: '73vh',
        width: '100%',
        my: '0.5em',

        borderLeft: 'none',
        borderRight: 'none',
        borderTop: 'none',
        borderBottom: '2px solid #F0F4F5',
        '& .MuiDataGrid-row': {
          background: '#fff',
          cursor: 'pointer',
        },
        '& .MuiDataGrid-columnHeaders': {
          background: '#fff',
          borderBottom: '2px solid #F0F4F5',
        },
        '& .MuiDataGrid-columnSeparator': {
          display: 'none',
        },
        '& .MuiDataGrid-main': {
          background: '#fff',
          '& *:focus, & *:focus-within': {
            '& *': {
              outline: 'none',
              cursor: 'pointer',
            },
          },
        },
        '& .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-columnHeader:focus ':
          {
            outline: 'none',
            border: 'none',
          },
        '& .MuiDataGrid-cell': {
          borderBottom: '2px solid #F0F4F5',
        },
        ...rowClassNames,
      }}
    />
  );
};
