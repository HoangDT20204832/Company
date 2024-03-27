export interface IBuilding {
  id: number;
  displayName: string;
  code: string;
  parentId?: number;
  tenantId: number;
  projectCode: string;
  type: number;
  imageUrl?: string;
  description?: string;
  phoneNumber?: string;
  email?: string;
  address?: string;
  numberFloor?: number;
  numberCitizen?: number;
  numberApartment?: number;
  area?: number;
  buildingType?: number;
  city?: string;
  district?: string;
  urbanId?: number;
  urbanName?: string;
  provinceCode?: string;
  districtCode?: string;
  wardCode?: string;
}
