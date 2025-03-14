import {Article} from './article';
import {
  Amount,
  AmountRecord,
  Meta,
  PaymentInfo,
  PdfGenerationStatus,
  WithOptional,
} from './misc';
import {PropertyOwner} from './propertyManager';
import {QuotationItemRecord} from './quotation';
import {ServiceOrderView, ServiceOrderType} from './service-order';

export enum InvoiceStatus {
  PAID = 'PAID',
  NOT_PAID = 'NOT_PAID',
  DRAFT = 'DRAFT',
  EXPIRED = 'EXPIRED',
  PARTIALLY_PAID = 'PARTIALLY_PAID',
  CANCELLED = 'CANCELLED',
}

export enum InvoiceDueType {
  AFTER_EACH_VISIT = 'AFTER_EACH_VISIT',
  HALF_YEARLY = 'HALF_YEARLY',
  QUARTERLY = 'QUARTERLY',
  YEARLY = 'YEARLY',
}

export enum InvoiceStatusView {
  PAID = 'Paid',
  NOT_PAID = 'Unpaid',
  DRAFT = 'Draft',
  EXPIRED = 'Overdue',
  PARTIALLY_PAID = 'Partially Paid',
  CANCELLED = 'Cancelled',
}

export enum InvoiceStatusViewWithoutDraft {
  PAID = 'Paid',
  NOT_PAID = 'Unpaid',
  EXPIRED = 'Overdue',
  PARTIALLY_PAID = 'Partially Paid',
  CANCELLED = 'Cancelled',
}

export const mapInvoiceStatus = (invoiceStatus: InvoiceStatusView) => {
  switch (invoiceStatus) {
    case InvoiceStatusView.PAID:
      return InvoiceStatus.PAID;
    case InvoiceStatusView.NOT_PAID:
      return InvoiceStatus.NOT_PAID;
    case InvoiceStatusView.DRAFT:
      return InvoiceStatus.DRAFT;
    case InvoiceStatusView.EXPIRED:
      return InvoiceStatus.EXPIRED;
    case InvoiceStatusView.PARTIALLY_PAID:
      return InvoiceStatus.PARTIALLY_PAID;
    case InvoiceStatusView.CANCELLED:
      return InvoiceStatus.CANCELLED;
    default:
      return undefined;
  }
};

export interface InvoiceItem {
  article: Article;
  data: string;
  description: string;
  id: string;
  invoiceId: string;
  name: string;
  quantity: number;
  unitAmount: Amount;
}

export interface InvoiceAdditionalInfo {
  dueDate: string;
  pdfGenerationStatus: PdfGenerationStatus;
  pdfPath: string;
}

export interface InvoiceView {
  id: string;
  number: string;
  description: string;
  subject: string;
  type: InvoiceType;
  totalAmount: Amount;
  sentDate: string;
  dueDate: string;
  status: InvoiceStatus;
  serviceOrder: ServiceOrderView;
  propertyOwner: PropertyOwner;
  items: InvoiceItem[];
  search: string;
  meta: Meta;
  additionalInfo: InvoiceAdditionalInfo;
  paymentTerms: string;
}

export interface QueryInvoiceParams {
  pageIndex: number;
  pageSize: number;
  query: string;
  status: InvoiceStatus[];
}

export interface InvoiceFilters {
  amount: [number, number] | number[];
  status?: InvoiceStatus;
  serviceType: ServiceOrderType[];
}

export interface InvoiceItemRecord<T> {
  articleId: string;
  articleUnit: string;
  description: string;
  name: string;
  quantity: number;
  unitAmount: T;
}

export enum InvoiceType {
  FULL = 'FULL',
  PARTIAL = 'PARTIAL',
}

export interface CreateInvoice {
  subject: string;
  description: string;
  dueDate: string;
  issuedDate: string;
  items: QuotationItemRecord[] | InvoiceItemRecord<Amount>[];
  paymentInfo: PaymentInfo;
  paymentTerms: string;
  propertyOwnerId: string;
  serviceCompanyId: string;
  serviceOrderId: string;
  shouldSendOut: boolean;
  type: InvoiceType;
}

export interface UpdateInvoice {
  description: string;
  subject: string;
  dueDate: string;
  issuedDate: string;
  items: WithOptional<InvoiceItemRecord<AmountRecord>, 'articleUnit'>[];
  paymentInfo?: PaymentInfo;
  paymentTerms?: string;
  serviceOrderId: string;
  type: InvoiceType;
}
