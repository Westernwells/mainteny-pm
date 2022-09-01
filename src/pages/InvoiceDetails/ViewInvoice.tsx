import {useTranslation} from 'react-i18next';
import useTheme from '@mui/material/styles/useTheme';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import {CustomButtonUnstyled} from 'components/CustomButtonUnstyled';
import {StatusChip} from 'components/StatusChip';
import {PageCard} from 'components/PageCard';
import {PDFContainer} from 'components/PDFContainer';
import {FormLabel} from 'components/form/FormLabel';
import {EmptySection} from 'components/EmptySection';
import {InvoiceView} from 'models/invoice';
import {ServiceOrderReport} from 'models/service-order';
import {getInvoiceStatusStyles} from 'pages/Invoices/InvoicesDataGridProps';
import {PdfGenerationStatus} from 'models/misc';
import {formatNetAmount} from 'utils/currency';
import {
  getServiceOrderStatusColor,
  serviceOrderStatusToString,
} from 'utils/service-order-utils';
import {useFormatDate} from 'hooks/useFormatDate';

interface Props {
  downloadUrl: string;
  invoice: InvoiceView;
  workReport: ServiceOrderReport;
}

export const ViewInvoice = ({downloadUrl, invoice, workReport}: Props) => {
  const {t} = useTranslation();
  const formatDate = useFormatDate();
  const theme = useTheme();

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        gap="2em">
        <Box ml="auto">
          <StatusChip
            label={getInvoiceStatusStyles(invoice.status).label}
            color={getInvoiceStatusStyles(invoice.status).color}
            size="small"
            variant="filled"
          />
        </Box>
        {downloadUrl && (
          <CustomButtonUnstyled
            label={t('Download Invoice')}
            size="medium"
            onClick={() => window.open(`${downloadUrl}`, '_blank')}
            startIcon={<FileDownloadIcon />}
            disabled={
              invoice!.additionalInfo.pdfGenerationStatus !==
              PdfGenerationStatus.DONE
            }
            styles={{
              color: theme.palette.primary.main,
              '&:hover': {
                background: theme.palette.primary.main,
                color: 'white',
              },
            }}
          />
        )}
      </Box>
      <Grid container width="100%" mt="2.5em" mb="2em" gap={2}>
        <Grid item xs={8}>
          <PageCard
            containerStyles={{mb: '1.5em'}}
            contentContainerStyles={{display: 'flex', gap: '6em'}}>
            <Box>
              <FormLabel text="Invoice Number" sx={{color: 'text.main'}} />
              <Typography variant="subtitle1">{invoice.number}</Typography>
            </Box>

            <Box>
              <FormLabel
                text="Total"
                sx={{color: 'text.main', textTransform: 'initial'}}
              />
              <Typography variant="subtitle1">
                {formatNetAmount(invoice.totalAmount)}
              </Typography>
            </Box>
          </PageCard>
          {invoice!.additionalInfo.pdfGenerationStatus ===
            PdfGenerationStatus.DONE && downloadUrl.length ? (
            <PDFContainer url={downloadUrl} />
          ) : (
            <PageCard>
              <EmptySection
                label={t(
                  'The PDF generation is in progress, please try again after sometime. We apologize for the inconvenience.',
                )}
                size="small"
              />
            </PageCard>
          )}
        </Grid>
        <Grid item xs sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
          <PageCard
            headerLabel={t('Service Order')}
            headerStyles={{
              pt: '11px',
            }}>
            <Box>
              <Box sx={{float: 'right'}}>
                <StatusChip
                  color={getServiceOrderStatusColor(
                    invoice.serviceOrder.status,
                  )}
                  label={serviceOrderStatusToString(
                    invoice.serviceOrder.status,
                  )}
                  size="small"
                />
              </Box>
              <FormLabel text="Order Number" sx={{color: 'text.primary'}} />
              <Typography variant="body2">
                {invoice.serviceOrder.number}
              </Typography>
              <Typography variant="caption" sx={{color: 'text.secondary'}}>
                {`${t('Created on')} ${formatDate(
                  invoice.serviceOrder.meta.createdAt,
                )}`}
              </Typography>
              <Box display="flex" pt="2em">
                <Typography variant="caption">
                  {invoice.serviceOrder.description}
                </Typography>
              </Box>
            </Box>
          </PageCard>
          {!!workReport && (
            <PageCard
              headerLabel={t('Work Report')}
              headerStyles={{
                pt: '11px',
              }}>
              <Typography variant="body1">
                {formatDate(workReport.serviceOrder.actualStartTime)}:{' '}
                {workReport.description || '-'}
              </Typography>
            </PageCard>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};
