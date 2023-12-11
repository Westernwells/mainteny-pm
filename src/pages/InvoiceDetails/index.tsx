import {useParams} from 'react-router-dom';
import {useInvoiceDetail} from 'hooks/reactQuery/useInvoice';
import {useDownloadUrl} from 'hooks/reactQuery/useDownloadUrl';
import {useServiceOrderReport} from 'hooks/reactQuery/useServiceOrder';
import {InvoiceStatus} from 'models/invoice';
import {ServiceOrderStatus} from 'models/service-order';
import {Progress} from 'components/Progress';
import {EmptySection} from 'components/EmptySection';
import {ViewInvoice} from './ViewInvoice';

export const InvoiceDetails = () => {
  const {id: invoiceId} = useParams();
  const {data: invoice, isLoading, isFetched} = useInvoiceDetail(invoiceId);

  const {data: workReport, isLoading: isLoadingWorkReport} =
    useServiceOrderReport(invoice?.serviceOrder?.id ?? '', {
      enabled:
        !!invoice?.serviceOrder?.id &&
        invoice?.serviceOrder?.status === ServiceOrderStatus.COMPLETED,
    });

  const {data: downloadUrl} = useDownloadUrl(
    isFetched ? [invoice!.additionalInfo.pdfPath] : [],
  );

  if (isLoading || isLoadingWorkReport) {
    return <Progress />;
  }

  return isFetched && invoice && invoice.status !== InvoiceStatus.DRAFT ? (
    <ViewInvoice
      downloadUrl={downloadUrl ? Object.values(downloadUrl)[0] : ''}
      invoice={invoice}
      workReport={workReport!}
    />
  ) : (
    <EmptySection label="Sorry, we couldn't find the invoice." />
  );
};
