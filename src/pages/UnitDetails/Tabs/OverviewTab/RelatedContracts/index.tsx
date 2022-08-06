import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import Typography from '@mui/material/Typography';
import useTheme from '@mui/material/styles/useTheme';
import {GridRowsProp} from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import {ContractSimpleView} from 'models/contract';
import {getDataGridHeight} from 'utils/utils';
import {useFormatDate} from 'hooks/useFormatDate';
import {DataGridLayout} from 'components/DataGridLayout';
import {InfoCard} from 'components/InfoCard';
import {columns, makeRows} from './RelatedContractsDataGridProps';

interface Props {
  containerStyles?: {[key: string]: any};
  contracts: ContractSimpleView[];
}

export const RelatedContracts = ({containerStyles, contracts}: Props) => {
  const formatDate = useFormatDate();
  const theme = useTheme();
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    setRows(makeRows(!showAll ? contracts.slice(0, 3) : contracts, formatDate));
  }, [contracts]);

  const {t} = useTranslation();
  return (
    <InfoCard
      containerStyles={{...containerStyles}}
      header={
        <Typography variant="subtitle1">{t('Related Contracts')}</Typography>
      }
      showHeaderBackground
      headerStyles={{
        py: '0.25rem',
        px: '0.5rem',
      }}>
      <DataGridLayout
        fullHeight={false}
        height={getDataGridHeight(rows.length, 3)}
        hideFooter
        isWidget
        rows={rows}
        columns={columns}
        containerStyle={{
          borderBottom: 'none',
        }}
      />
      {contracts.length > 3 ? (
        <Box
          sx={{textAlign: 'center', cursor: 'pointer'}}
          onClick={() => setShowAll(!showAll)}>
          <Typography variant="caption" color={theme.palette.info.main}>
            {showAll ? t('see less') : t('see more')}
          </Typography>
        </Box>
      ) : null}
    </InfoCard>
  );
};
