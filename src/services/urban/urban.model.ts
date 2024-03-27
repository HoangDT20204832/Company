export interface IUrban {
  id: number;
  projectCode: string;
  displayName: string;
  organizationUnitId: number;
  imageUrl?: string;
  isManager: boolean;
  tenantId: number | null;
  description?: string;
  address?: string;
  phoneNumber?: string;
  email?: string;
  area?: number;
  numberBuilding?: number;
  numberCitizen?: number;
}

export interface IBuildingTenant {
  projectCode: string;
  id: number;
  code: string;
  displayName: string;
  parentId: number;
  description?: string;
  imageUrl?: string;
  isManager: boolean;
  tenantId: number | null;
  children?: IBuildingTenant[];
  urbanId: number;
}
export interface ICreateUrbanDto {
  projectCode: string;
  displayName: string;
  description?: string;
  imageUrl?: any;
  address?: string;
  phoneNumber?: string;
  email?: string;
  provinceCode?: string;
  districtCode?: string;
  wardCode?: string;
}

export interface IUpdateUrbanDto {
  id: number;
  projectCode: string;
  displayName: string;
  description?: string;
  imageUrl?: any;
  address?: string;
  phoneNumber?: string;
  email?: string;
  provinceCode?: string;
  districtCode?: string;
  wardCode?: string;
}
