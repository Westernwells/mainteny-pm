import {DataGrid, GridColDef, GridRowsProp} from '@mui/x-data-grid';
import useTheme from '@mui/material/styles/useTheme';
import {Box} from '@mui/system';
import {useNavigate} from 'react-router-dom';

interface Props {
  rows: GridRowsProp;
  columns: GridColDef[];
}

export const DataGridLayout = ({rows, columns}: Props) => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        height: 'max(400px, 73vh) !important',
        py: '1em',
        maxHeight: '73vh',
        width: '100%',

        '& > *': {
          border: 'none !important',
          backgroundColor: 'transparent',
          color: theme.palette.text.primary,
        },

        '& .MuiDataGrid-main': {
          '& *:focus, & *:focus-within': {
            '& *': {
              border: 'none !important',
              outline: 'none !important',
            },
          },

          '& .MuiDataGrid-virtualScroller': {
            mt: '3em !important',
          },

          '& .MuiDataGrid-row, & .MuiDataGrid-columnHeaders': {
            backgroundColor: theme.palette.common.white,

            borderRadius: '4px',
          },

          '& .MuiDataGrid-columnHeaders': {
            maxHeight: 'initial !important',
            minHeight: 'initial !important',
            lineHeight: 'initial !important',
            alignItems: 'flex-end',

            '& .MuiDataGrid-columnHeadersInner': {
              p: '0 !important',

              '& .MuiDataGrid-columnHeaderTitleContainer': {
                py: '.5em !important',
              },
            },
          },

          '& .MuiDataGrid-row': {
            my: '.5em',
            maxHeight: 'initial !important',
            minHeight: 'initial !important',
            lineHeight: 'initial !important',
            cursor: 'pointer',

            '& .MuiDataGrid-cell': {
              maxHeight: 'initial !important',
              minHeight: 'initial !important',
              lineHeight: 'initial !important',
              py: '.75em !important',
            },
          },

          '& .Mui-selected': {
            backgroundColor: `${theme.palette.common.white} !important`,
          },
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        disableSelectionOnClick
        onRowClick={(params) => navigate(params.row.contractId)}
      />
    </Box>
  );
};
