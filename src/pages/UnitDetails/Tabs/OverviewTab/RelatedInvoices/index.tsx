import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';
import useTheme from '@mui/material/styles/useTheme';
import {GridRowsProp} from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {InvoiceView} from 'models/invoice';
import {Resource} from 'models/misc';
import {getDataGridHeight} from 'utils/utils';
import {useFormatDate} from 'hooks/useFormatDate';
import {DataGridLayout} from 'components/DataGridLayout';
import {InfoCard} from 'components/InfoCard';
import {EmptySection} from 'components/EmptySection';
import {columns, makeRows} from './RelatedInvoicesDataGridProps';

interface Props {
  invoices: Resource<InvoiceView>;
}

export const RelatedInvoices = ({invoices}: Props) => {
  const {t} = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  const formatDate = useFormatDate();
  const [rows, setRows] = useState<GridRowsProp>([]);

  useEffect(() => {
    if (invoices.data.length) {
      setRows(makeRows(invoices.data, formatDate));
    }
  }, [invoices]);

  const renderNoRowsSection = () => (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}>
      <EmptySection
        illustration="clipboard"
        size="tiny"
        containerStyle={{m: 'auto', width: '60%'}}
        label={t('No invoice yet.')}
      />
    </Box>
  );

  return (
    <InfoCard
      header={
        <Typography variant="subtitle1">{t('Related Invoices')}</Typography>
      }
      showHeaderBackground
      headerStyles={{
        py: '0.25rem',
        px: '0.5rem',
      }}>
      {!invoices.total ? (
        renderNoRowsSection()
      ) : (
        <>
          <DataGridLayout
            rows={rows}
            height={getDataGridHeight(rows.length, 3)}
            columns={columns}
            fullHeight={false}
            hideFooter
            containerStyle={{
              borderBottom: 'none',
            }}
          />
          {invoices.total > 3 ? (
            <Box
              sx={{textAlign: 'center', cursor: 'pointer', pt: '1rem'}}
              onClick={() => navigate('/invoices')}>
              <Typography
                variant="caption"
                textTransform="capitalize"
                color={theme.palette.info.main}>
                {t('see more')}
              </Typography>
            </Box>
          ) : null}
        </>
      )}
    </InfoCard>
  );
};
