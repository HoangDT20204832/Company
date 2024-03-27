export enum ETypePayment {
  Bill = 1,
  BookingLocalService = 2,
  DebtBill = 3,
}

export enum EPaymentMethod {
  Cash = 1,
  Momo = 2,
  OnePAY = 3,
  ZaloPay = 4,
  AdminVerify = 5,
  Banking = 6,
}

export enum EStatusPayment {
  Pending = 1,
  Success = 2,
  Fail = 3,
  Cancel = 4,
}

export enum EBillType {
  Electric = 1,
  Water = 2,
  Parking = 3,
  Lighting = 4,
  Manager = 5,
  Resident = 6,
  Other = 7,
  Monthly = 8,
}

export const enum EBillStatus {
  OverPay = 3,
  Paid = 2,
  Debt = 1,
  WaitForConfirm = 4,
}

export const enum EMonthlyBillStatus {
  Pending = 1,
  Paid = 2,
  Debt = 3,
  WaitForConfirm = 4,
}

export interface IVerifyBillDebt {
  billDebtId: number;
  amount: number;
  apartmentCode: string;
  period: string;
  description?: string;
}

export interface IDebtBillByApartment {
  code: string;
  period: string;
  title: string;
  apartmentCode: string;
  billType: number;
  amount: number;
  properties: string;
  status: EMonthlyBillStatus;
  dueDate: string;
  lastCost: number;
  debtTotal: number;
  urbanId: number;
  buildingId: number;
  citizenTempId: number;
  carNumber: number;
  motorbikeNumber: number;
  bicycleNumber: number;
  otherVehicleNumber: number;
  indexEndPeriod?: number;
  indexHeadPeriod?: number;
  totalIndex: number;
  paymentMethod?: number;
  id: number;
}

export interface IBankAccount {
  id: number;
  bankBin: string;
  bankNumber: string;
}

export interface IDebtByUserBill {
  id: number;
  title: string;
  citizenTempId: number;
  apartmentCode: string;
  debtTotal: number;
  paidAmount?: number;
  tenantId: number;
  period: Date;
  creationTime: Date;
  userBillIds?: any;
  organizationUnitId?: any;
  billList?: any;
  citizenName?: string;
  buildingId?: number;
  urbanId: number;
}
