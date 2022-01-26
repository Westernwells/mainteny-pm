import {Fee, Meta} from './misc';

export enum InvoiceStatus {
  PAID = 'PAID',
  NOT_PAID = 'NOT_PAID',
}

export interface InvoiceView {
  id: string;
  number: string;
  amount: Fee;
  issueDate: string;
  status: InvoiceStatus;
  serviceCompany: string;
  search: string;
  meta: Meta;
}

export interface QueryInvoiceParams {
  pageIndex: number;
  pageSize: number;
  query: string;
  status: InvoiceStatus[];
}
