import {useTranslation} from 'react-i18next';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {InvoiceView} from 'models/invoice';
import {getDataGridHeight} from 'utils/utils';
import {useFormatDate} from 'hooks/useFormatDate';
import {DataGridLayout} from 'components/DataGridLayout';
import {InfoCard} from 'components/InfoCard';
import {EmptySection} from 'components/EmptySection';
import {columns, makeRows} from './InvoicesDataGridProps';

interface Props {
  invoices: InvoiceView[];
}

export const Invoices = ({invoices}: Props) => {
  const {t} = useTranslation();
  const formatDate = useFormatDate();

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
      header={<Typography variant="subtitle1">{t('Invoices')}</Typography>}
      showHeaderBackground
      headerStyles={{
        py: '0.25rem',
        px: '0.5rem',
      }}>
      {!invoices.length ? (
        renderNoRowsSection()
      ) : (
        <DataGridLayout
          rows={makeRows(invoices, formatDate)}
          columns={columns}
          fullHeight={false}
          height={getDataGridHeight(invoices.length, invoices.length)}
          hideFooter
          containerStyle={{
            borderBottom: 'none',
          }}
        />
      )}
    </InfoCard>
  );
};
