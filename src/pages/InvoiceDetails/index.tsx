import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {useInvoiceDetail} from 'hooks/reactQuery/useInvoice';
import {useDownloadUrl} from 'hooks/reactQuery/useDownloadUrl';
import {InvoiceStatus} from 'models/invoice';
import {ServiceOrderReportView} from 'models/service-order';
import {Progress} from 'components/Progress';
import {EmptySection} from 'components/EmptySection';
import {ViewInvoice} from './ViewInvoice';

export const InvoiceDetails = () => {
  const {id: invoiceId} = useParams();
  const {data: invoice, isLoading, isFetched} = useInvoiceDetail(invoiceId);

  const [report, setReport] = useState<ServiceOrderReportView | undefined>(
    invoice?.serviceOrder?.reports?.[0],
  );

  const reportToUpdate = invoice?.serviceOrder?.reports?.find(
    (r) => r.externalId === report?.externalId,
  );

  const {data: downloadUrl} = useDownloadUrl(
    isFetched ? [invoice!.additionalInfo.pdfPath] : [],
  );

  useEffect(() => {
    if (reportToUpdate) {
      setReport(reportToUpdate);
    }
  }, [reportToUpdate]);

  if (isLoading) {
    return <Progress />;
  }

  return isFetched && invoice && invoice.status !== InvoiceStatus.DRAFT ? (
    <ViewInvoice
      downloadUrl={downloadUrl ? Object.values(downloadUrl)[0] : ''}
      invoice={invoice}
      workReport={report!}
    />
  ) : (
    <EmptySection label="Sorry, we couldn't find the invoice." />
  );
};
