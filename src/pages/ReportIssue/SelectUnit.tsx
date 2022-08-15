import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {GridCellParams, GridRowsProp} from '@mui/x-data-grid';
import {createEmptyResource, makePage} from 'utils/paging-utils';
import {useAllElevators} from 'hooks/reactQuery/useElevator';
import {useFormatDate} from 'hooks/useFormatDate';
import {ElevatorView} from 'models/elevator';
import {DataGridLayout} from 'components/DataGridLayout';
import {PageCard} from 'components/PageCard';
import {Progress} from 'components/Progress';
import {columns, makeRows} from './UnitDataGridProps';

interface Props {
  getSelectedUnit: (val?: ElevatorView) => void;
  initialSelectedUnit?: ElevatorView;
}

const pageInfo = makePage(0, 10);

export const SelectUnit = ({getSelectedUnit, initialSelectedUnit}: Props) => {
  const {t} = useTranslation();
  const formatDate = useFormatDate();
  const [page, setPage] = useState(pageInfo);
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [selectedUnit, setSelectedUnit] = useState<ElevatorView | undefined>(
    initialSelectedUnit,
  );
  const [pageCount, setPageCount] = useState(0);
  const {
    data: elevatorResponse = createEmptyResource<ElevatorView>(10),
    isFetching,
    isLoading,
    isIdle,
  } = useAllElevators(
    {query: '', pageIndex: page.pageIndex, pageSize: page.pageSize},
    {keepPreviousData: true},
  );

  useEffect(() => {
    if (!isLoading && elevatorResponse.data.length) {
      setRows(makeRows(elevatorResponse.data, formatDate));
    }
  }, [elevatorResponse.data, isLoading]);

  useEffect(() => {
    setPageCount(Math.ceil(elevatorResponse.total / page.pageSize));
  }, [elevatorResponse.total, page.pageSize]);

  useEffect(() => {
    if (getSelectedUnit) {
      getSelectedUnit(selectedUnit);
    }
  }, [selectedUnit]);

  if (isIdle || isLoading) {
    return <Progress />;
  }

  return (
    <PageCard
      containerStyles={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
      }}
      headerLabel={t('Units')}
      contentContainerStyles={{
        display: 'flex',
        flexGrow: 1,
        pt: 0,
      }}>
      <DataGridLayout
        hideFooter={pageCount <= 1}
        rows={rows}
        columns={columns(selectedUnit?.id || '')}
        onCellClick={(params: GridCellParams) => {
          setSelectedUnit(params.row.elevator);
        }}
        loading={isFetching}
        pageSize={page.pageSize}
        pageIndex={page.pageIndex + 1}
        handlePageChange={(newPage: number) => {
          setPage({...page, pageIndex: newPage - 1});
        }}
        pageCount={pageCount}
        totalRows={elevatorResponse.total}
      />
    </PageCard>
  );
};
