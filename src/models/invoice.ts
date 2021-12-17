import {Fee, Meta} from './misc';

export enum InvoiceStatus {
  PAID = 'PAID',
  UNPAID = 'UNPAID',
}

export interface InvoiceView {
  id: string;
  number: string;
  amount: Fee;
  issueDate: string;
  status: InvoiceStatus;
  search: string;
  meta: Meta;
}
