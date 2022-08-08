import {useEffect, useState} from 'react';
import {GridRowsProp} from '@mui/x-data-grid';
import {Widget} from 'components/Widget';
import {DataGridLayout} from 'components/DataGridLayout';
import {makePage} from 'utils/paging-utils';
import {TabContentContainer} from 'components/TabContentContainer';
import {EmptySection} from 'components/EmptySection';
import {useNavigate} from 'react-router-dom';
import {useFormatDate} from 'hooks/useFormatDate';
import {ContractElevatorSimpleView} from 'models/contract';
import {ElevatorView} from 'models/elevator';
import {columns, makeRows} from './UnitsDataGridProps';

interface Props {
  elevators: ContractElevatorSimpleView[];
}

export const Units = ({elevators}: Props) => {
  const formatDate = useFormatDate();
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const [page, setPage] = useState(makePage(0, 25)); // TODO: implement paging
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    if (elevators.length) {
      setRows(
        makeRows(
          {
            elevators: elevators
              .map(
                (elevator) =>
                  ({
                    ...elevator.elevator,
                  } as ElevatorView),
              )
              .filter((i) =>
                `${i.model} ${i.address.fullName} ${i.externalId}`
                  .toLowerCase()
                  .includes(search.toLowerCase()),
              ),
          },
          formatDate,
        ),
      );
    }
  }, [elevators, search]);

  useEffect(() => {
    if (elevators) {
      setPageCount(Math.ceil(elevators.length / page.pageSize));
    }
  }, [elevators, page]);

  return (
    <TabContentContainer>
      <Widget
        containerStyles={{flexGrow: 0}}
        searchPlaceholder="Search by number, model, customer, address etc."
        getSearchValue={(val) => setSearch(val)}
      />
      <DataGridLayout
        hideFooter={pageCount <= 1}
        noRowsEmptySection={
          <EmptySection
            illustration="clipboard"
            size="tiny"
            containerStyle={{my: 'auto'}}
            btnAction={() => navigate('/units/new')}
            label="No units yet. They will appear here once added!"
            btnLabel="+ Add Unit"
          />
        }
        noResultsEmptySection={
          <EmptySection
            illustration="clipboard"
            size="tiny"
            containerStyle={{my: 'auto'}}
            btnAction={() => navigate('/units/new')}
            label="No units yet. They will appear here once added!"
            btnLabel="+ Add Unit"
          />
        }
        rows={rows}
        columns={columns}
        pageSize={page.pageSize}
        pageIndex={page.pageIndex}
        handlePageSizeChange={(newPageSize) =>
          setPage({...page, pageSize: newPageSize})
        }
        handlePageChange={(newPage) => setPage({...page, pageIndex: newPage})}
      />
    </TabContentContainer>
  );
};
