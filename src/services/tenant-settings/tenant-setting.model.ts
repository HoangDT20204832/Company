export interface ITimeScheduleCheckBill {
  isEnableCreateE: boolean;
  isEnableCreateW: boolean;
  isEnableCreateP: boolean;
  isEnableCreateM: boolean;
  electricHeadPeriodDay: number;
  electricEndPeriodDay: number;
  parkingCreateDay: number;
  managerCreateDay: number;
  waterHeadPeriodDay: number;
  waterEndPeriodDay: number;
  billNotificationTime1: number;
  billNotificationTime2: number;
  billNotificationTime3: number;
}

export interface IUserBillSetting {
  dueDate: number;
  dueMonth: number;
  dueDateElectric: number;
  dueMonthElectric: number;
  dueDateWater: number;
  dueMonthWater: number;
  dueDateParking: number;
  dueMonthParking: number;
  dueDateLighting: number;
  dueMonthLighting: number;
  dueDateManager: number;
  dueMonthManager: number;
  dueDateResidence: number;
  dueMonthResidence: number;
  sendUserBillNotificationDay: number;
  parkingBillType: number;
}

export interface IBankTransferSetting {
  bankCode: string;
  bankNumber: string;
  qrCode?: string | File | null;
}

export interface ITenantSettings {
  timeScheduleCheckBill: ITimeScheduleCheckBill;
  userBillSetting: IUserBillSetting;
  bankTransferSetting: IBankTransferSetting;
}
export interface ITenantSettingApp {
  tenancyName: string;
  name: string;
  mobileConfig: string;
  adminPageConfig: string;
  permissions: string;
  isActive: boolean;
  id: number;
}
