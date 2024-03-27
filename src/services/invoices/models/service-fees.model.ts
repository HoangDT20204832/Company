export interface IBillConfig {
  billType: number;
  title: string;
  code: string;
  level: number;
  vehicleType: any;
  parentId: any;
  pricesType: number;
  appendToBillConfigIds: string;
  properties: any;
  tenantId: number;
  isDefault: boolean;
  buildingId: any;
  urbanId: any;
  isPrivate: any;
  parkingId: any;
  isDeleted: boolean;
  deleterUserId: any;
  deletionTime: any;
  lastModificationTime: Date;
  lastModifierUserId: number;
  creationTime: Date;
  creatorUserId: any;
  id: number;
}

export enum EPricesType {
  None = -1,
  Normal = 1,
  Level = 2,
  Percentage = 3,
  PerArea = 4,
  VehiclesType = 5,
  NumberOfVehicles = 6,
  OtherAdjust = 100,
  OtherApartmentArea = 101,
  OtherApartmentMember = 102,
}

export const PricesTypeDefault = [
  {
    label: 'Không có',
    value: EPricesType.None,
  },
  {
    label: 'Giá cố định',
    value: EPricesType.Normal,
  },
  {
    label: 'Giá theo phần trăm',
    value: EPricesType.Percentage,
  },
];
