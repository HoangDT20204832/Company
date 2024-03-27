export interface IProvince {
  code: string;
  name: string;
  nameEn: string;
  fullName: string;
  fullNameEn: string;
  codeName: string;
  administrativeRegionId: number;
  administrativeUnitId: number;
}

export interface IDistrict {
  code: string;
  name: string;
  nameEn: string;
  fullName: string;
  fullNameEn: string;
  codeName: string;
  provinceCode: number;
  administrativeUnitId: number;
}

export interface IWard {
  code: string;
  name: string;
  nameEn: string;
  fullName: string;
  fullNameEn: string;
  codeName: string;
  districtCode: number;
  administrativeUnitId: number;
}
