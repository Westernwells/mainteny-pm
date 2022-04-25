import Box from '@mui/material/Box';
import {
  DataGrid,
  DataGridProps,
  GridColDef,
  GridRowsProp,
} from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';
import {useNavigate} from 'react-router-dom';
import {CustomPagination} from './CustomPagination';

interface Props extends DataGridProps {
  rows: GridRowsProp;
  columns: GridColDef[];
  hideFooter?: boolean;
  height?: string | number;
  containerStyle?: {[key: string]: string | number};
  pageSize?: number;
  pageIndex?: number;
  handlePageSizeChange?: (pageSize: number) => any;
  handlePageChange?: (pageSize: number) => any;
  pageCount?: number;
  totalRows?: number;
  fullHeight?: boolean;
}

export const DataGridLayout = ({
  rows,
  columns,
  hideFooter = false,
  height,
  containerStyle,
  loading,
  pageSize,
  pageIndex,
  handlePageSizeChange = (n: number) => n,
  handlePageChange = (n: number) => n,
  pageCount,
  totalRows,
  fullHeight = true,
  ...rest
}: Props) => {
  const navigate = useNavigate();

  const renderFooter = () => (
    <CustomPagination
      pageSize={pageSize}
      pageIndex={pageIndex}
      handlePageSizeChange={handlePageSizeChange}
      handlePageChange={handlePageChange}
      pageCount={pageCount}
      totalRows={totalRows}
    />
  );

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
          paddingLeft: '.75em',
          borderTop: '2px solid #F0F4F5',
          borderBottom: '2px solid #FFF',
          background: '#fff',
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
    <Box
      sx={{
        flexGrow: fullHeight ? 1 : 'unset',
        ...(!fullHeight && {height}),
      }}>
      <DataGrid
        components={{
          LoadingOverlay: LinearProgress,
          Footer: renderFooter,
        }}
        loading={loading}
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
          height,
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
            '.MuiLinearProgress-root': {
              top: 50,
              zIndex: 1,
            },
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
          ...containerStyle,
          ...rest,
        }}
      />
    </Box>
  );
};
