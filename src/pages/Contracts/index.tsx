import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import {GridRowsProp} from '@mui/x-data-grid';
import {DataGridLayout} from 'components/DataGridLayout';
import {MultipleSelectCheckmarks} from 'components/MultipleSelectCheckmarks';
import {FilterFields} from 'components/FilterFields';
import {useQueryContract} from 'hooks/reactQuery/useContract';
import {ContractOrderField, ContractView} from 'models/contract';
import {Order} from 'models/misc';
import {createEmptyResource, makePage} from 'utils/paging-utils';
import {PageOverviewLayout} from 'components/PageOverviewLayout';
import {Widget} from 'components/Widget';
import {
  convertToMacro,
  convertToText,
  formatSearchParamsPageIndex,
  formatSearchParamsPageSize,
} from 'utils/utils';
import {useSearchParams} from 'react-router-dom';
import {EmptySection} from 'components/EmptySection';
import {Progress} from 'components/Progress';
import {costRangeConvertor as crConverter} from 'utils/contract-utils';
import {columns, makeRows} from './ContractsDataGridProps';
import {upcommingDates} from './Date';

const pageSize = 25;

interface ExpiryDate {
  start: Date;
  end: Date;
}

export const Contracts = () => {
  const [search, setSearch] = useState('');
  const [queryParams, setQueryParams] = useSearchParams();
  const [page, setPage] = useState(makePage(0, pageSize));
  const [showFilter, setShowFilter] = useState(false);
  const [expiryDate, setExpiryDate] = useState<ExpiryDate | null>();
  const [contractor, setContractor] = useState<string[]>([]);
  const [cost, setCost] = useState<number[][]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [contractorFilterItems, setContractorFilterItems] = useState<string[]>(
    [],
  );
  const [rows, setRows] = useState<GridRowsProp>([]);

  const {data: {total: totalContract} = createEmptyResource<ContractView>(10)} =
    useQueryContract(
      {
        order: Order.DESC,
        orderBy: ContractOrderField.CREATED_TIME,
        pageIndex: 0,
        pageSize: 1,
        query: '',
        status: [],
      },
      {},
      {keepPreviousData: true},
    );

  const {
    data: contractResource = createEmptyResource<ContractView>(10),
    isLoading,
    isFetching,
    isFetched,
    isIdle,
  } = useQueryContract(
    {
      order: Order.DESC,
      orderBy: ContractOrderField.CREATED_TIME,
      pageIndex: page.pageIndex,
      pageSize: page.pageSize,
      query: search,
      status: [],
    },
    {expiryDate, contractor, price: cost},
    {keepPreviousData: true},
  );

  useEffect(() => {
    const currentParams = Object.fromEntries([...queryParams]);

    setPage({
      ...page,
      pageSize: Number(currentParams.pageSize),
      pageIndex: Number(currentParams.pageIndex) - 1,
    });
  }, [queryParams]);

  const costRangeConvertor = (selectedItems: string[]) => {
    const range = crConverter(selectedItems);
    setCost(range);
  };

  useEffect(() => {
    const options: string[] = [];
    // TODO: Resolve 'any' here
    contractResource.data.forEach((item: any) => {
      if (
        !options.includes(item.serviceCompany.name) &&
        !contractorFilterItems.includes(item.serviceCompany.name)
      ) {
        options.push(item.serviceCompany.name);
      }
    });
    setRows(makeRows(contractResource.data));

    setContractorFilterItems([...contractorFilterItems, ...options]);
  }, [contractResource, showFilter]);

  useEffect(() => {
    setPageCount(Math.ceil(contractResource.total / page.pageSize));
  }, [contractResource, page.pageSize]);

  if (isFetched && !totalContract) {
    return (
      <EmptySection
        label="Contracts will appear here once they are created!"
        containerStyle={{
          height: '100%',
          mb: '10em',
        }}
      />
    );
  }

  if (isLoading || isIdle) {
    return <Progress />;
  }

  return (
    <PageOverviewLayout
      label="Contracts"
      renderWidget={
        <Widget
          searchPlaceholder="Try 'Astralift BV'"
          getSearchValue={(val: string) => setSearch(val)}
          setShowFilter={setShowFilter}
          showFilter={showFilter}
        />
      }>
      <Fade in={showFilter} unmountOnExit>
        <Box>
          <FilterFields setShowFilter={setShowFilter}>
            <MultipleSelectCheckmarks
              label="Expiry Date"
              options={Object.keys(upcommingDates).map((item) =>
                convertToText(item),
              )}
              getSelectedValue={(item) => {
                if (item.length)
                  setExpiryDate(upcommingDates[convertToMacro(item[0])]);
                else setExpiryDate(null);
              }}
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

      <DataGridLayout
        hideFooter={pageCount <= 1}
        rows={rows}
        columns={columns}
        loading={isFetching}
        pageSize={page.pageSize}
        pageIndex={page.pageIndex}
        handlePageSizeChange={(newPageSize: number) =>
          setQueryParams(formatSearchParamsPageSize(newPageSize, queryParams))
        }
        handlePageChange={(newPage: number) =>
          setQueryParams(formatSearchParamsPageIndex(newPage, queryParams))
        }
        pageCount={pageCount}
        totalRows={contractResource.total}
      />
    </PageOverviewLayout>
  );
};
