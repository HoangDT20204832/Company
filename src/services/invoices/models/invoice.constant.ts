import { EBillType } from './invoice.model';

export const LIST_BILL_TYPE = Object.values(EBillType)
  .map((x) => parseInt(x as string))
  .filter((x) => !isNaN(x));
