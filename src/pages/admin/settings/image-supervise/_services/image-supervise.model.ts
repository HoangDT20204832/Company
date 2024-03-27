export const CONFIG_TYPE = [
  { value: 0, label: 'Khác' },
  { value: 1, label: 'Yoolife Banner' },
  { value: 2, label: 'Yoolife Logo' },
  { value: 3, label: 'Yoolife Shopping Banner' },
  { value: 4, label: 'Yoolife Avatar' },
  { value: 20, label: 'Yoolife Login Background' },
  { value: 5, label: 'YooSeller Banner' },
  { value: 6, label: ' YooSeller Logo' },
  { value: 7, label: 'YooSeller Avatar' },
  { value: 8, label: 'YooIot Banner' },
  { value: 9, label: 'YooIot Logo' },
  { value: 10, label: 'YooIot Avatar' },
  { value: 11, label: 'YooAdmin Banner' },
  { value: 12, label: 'YooAdmin Logo' },
  { value: 13, label: 'YooAdmin Avatar' },
  { value: 14, label: 'YooSeller Web Banner' },
  { value: 15, label: 'YooSeller Web Logo' },
  { value: 16, label: 'YooSeller Web Avatar' },
  { value: 17, label: 'YooShopping Web Banner' },
  { value: 18, label: 'YooShopping Web Logo' },
  { value: 19, label: 'YooShopping Web Avatar' },
];

export enum EImageConfigType {
  Other = 0,
  YoolifeBanner = 1,
  YoolifeLogo = 2,
  YoolifeShoppingBanner = 3,
  YoolifeAvatar = 4,
  YooSellerBanner = 5,
  YooSellerLogo = 6,
  YooSellerAvatar = 7,
  YooIotBanner = 8,
  YooIotLogo = 9,
  YooIotAvatar = 10,
  YooAdminBanner = 11,
  YooAdminLogo = 12,
  YooAdminAvatar = 13,
  YooSellerWebBanner = 14,
  YooSellerWebLogo = 15,
  YooSellerWebAvatar = 16,
  YooShoppingWebBanner = 17,
  YooShoppingWebLogo = 18,
  YooShoppingWebAvatar = 19,
}

export enum EImageConfigScope {
  Global = 0,
  Tenant = 1,
}
export interface IImageSupervise {
  tenantId?: number;
  type: number;
  scope?: number;
  imageUrl: string;
  properties?: string;
  actions?: string;
  data?: string;
}

export interface IImageSuperviseTenant {
  tenantId?: number;
  type: number;
  properties?: string;
  imageUrl: string;
  scope?: number;
  id: number;
}
