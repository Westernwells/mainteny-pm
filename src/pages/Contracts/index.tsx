import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import {GridRowsProp} from '@mui/x-data-grid';
import {DataGridLayout} from 'components/DataGridLayout';
import {MultipleSelectCheckmarks} from 'components/MultipleSelectCheckmarks';
import {FilterFields} from 'components/FilterFields';
import {PageOverviewLayout} from 'components/PageOverviewLayout';
import {CustomPagination} from 'components/CustomPagination';
import {
  useContractElevatorCount,
  useQueryContract,
} from 'hooks/reactQuery/useContract';
import {ContractOrderField, ContractView} from 'models/contract';
import {Order} from 'models/misc';
import {createEmptyResource, makePage} from 'utils/paging-utils';
import {Widget} from 'components/Widget';
import {useSearchParams} from 'react-router-dom';
import {Progress} from 'components/Progress';
import {
  formatSearchParamsPageSize,
  formatSearchParamsPageIndex,
} from 'utils/utils';
import {columns, makeRows} from './ContractsDataGridProps';

const pageSize = 25;

export const Contracts = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(makePage(0, pageSize));
  const [queryParams, setQueryParams] = useSearchParams();
  const [showFilter, setShowFilter] = useState(false);
  const [expiryDate, setExpiryDate] = useState<string[]>([]);
  const [contractor, setContractor] = useState<string[]>([]);
  const [cost, setCost] = useState<number[][]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [contractorFilterItems, setConractorFileterItems] = useState<string[]>(
    [],
  );
  const [rows, setRows] = useState<GridRowsProp>([]);
  const {
    data: contractResource = createEmptyResource<ContractView>(10),
    isLoading,
    isFetching,
  } = useQueryContract(
    {
      order: Order.DESC,
      orderBy: ContractOrderField.CREATED_TIME,
      pageIndex: page.pageIndex,
      pageSize: page.pageSize,
      query: search,
    },
    {expiryDate, contractor, price: cost},
    {keepPreviousData: true},
  );

  const {data: contractWithUnits} = useContractElevatorCount(
    contractResource.data,
    {keepPreviousData: true},
  );

  const costRangeConvertor = (selectedItems: string[]) => {
    const range: number[][] = [];
    selectedItems.forEach((item) => {
      switch (item) {
        case 'Below 1000 €':
          range.push([0, 1000]);
          break;

        case '1000 - 3000 €':
          range.push([1000, 3000]);
          break;

        case '3000 - 5000 €':
          range.push([3000, 5000]);
          break;

        case 'Above 5000 €':
          range.push([5000, 99999]);
          break;

        default:
          break;
      }
    });
    setCost(range);
  };

  useEffect(() => {
    const currentParams = Object.fromEntries([...queryParams]);

    setPage({
      ...page,
      pageSize: Number(currentParams.pageSize),
      pageIndex: Number(currentParams.pageIndex) - 1,
    });
  }, [queryParams]);

  useEffect(() => {
    const options: string[] = [];

    if (contractWithUnits) {
      contractWithUnits?.forEach((item) => {
        if (
          !options.includes(item.serviceCompany.name) &&
          !contractorFilterItems.includes(item.serviceCompany.name)
        ) {
          options.push(item.serviceCompany.name);
        }
      });
      setRows(makeRows(contractWithUnits));
    } else {
      setRows([]);
    }
    setConractorFileterItems([...contractorFilterItems, ...options]);
    if (!showFilter) {
      setExpiryDate([]);
      setContractor([]);
      setCost([]);
    }
  }, [contractWithUnits, showFilter]);

  useEffect(() => {
    setPageCount(Math.ceil(contractResource.total / page.pageSize));
  }, [contractResource, page.pageSize]);

  if (isLoading) {
    return <Progress />;
  }

  return (
    <PageOverviewLayout
      label="Contracts"
      renderWidget={
        <Widget
          searchPlaceholder="Try 'Astralift BV'"
          getSearchValue={(val: string) => {
            setSearch(val);
          }}
          setShowFilter={setShowFilter}
          showFilter={showFilter}
        />
      }>
      <Fade in={showFilter} unmountOnExit>
        <Box>
          <FilterFields setShowFilter={setShowFilter}>
            <MultipleSelectCheckmarks
              label="Expiry Date"
              options={[
                'Last 14 days', // TODO: Create an enum to handle this
                'Today',
                'Next 7 days',
                'Next 14 days',
              ]}
              getSelectedValue={(item) => setExpiryDate(item)}
              multiple={false}
            />

            <MultipleSelectCheckmarks
              label="Contractor"
              options={contractorFilterItems}
              getSelectedValue={(item) => setContractor(item)}
            />

            <MultipleSelectCheckmarks
              label="Cost/year"
              options={[
                'Below 1000 €',
                '1000 - 3000 €',
                '3000 - 5000 €',
                'Above 5000 €',
              ]}
              getSelectedValue={(item) => costRangeConvertor(item)}
              multiple={false}
            />
          </FilterFields>
        </Box>
      </Fade>
      {isLoading ? (
        <Progress />
      ) : (
        <>
          <DataGridLayout
            hideFooter
            rows={rows}
            columns={columns}
            loading={isFetching}
          />
          {pageCount && page.pageSize < contractResource.total ? (
            <CustomPagination
              pageSize={page.pageSize}
              pageIndex={page.pageIndex}
              handlePageSizeChange={(newPageSize: number) =>
                setQueryParams(
                  formatSearchParamsPageSize(newPageSize, queryParams),
                )
              }
              handlePageChange={(newPage: number) =>
                setQueryParams(
                  formatSearchParamsPageIndex(newPage, queryParams),
                )
              }
              pageCount={pageCount}
              totalRows={contractResource.total}
            />
          ) : null}
        </>
      )}
    </PageOverviewLayout>
  );
};
