export interface ICreateAmenityAttribute {
  key?: string;
  dataType: number;
  inputType: number;
  businessType: number;
  iconUrl?: string;
  isRequired?: boolean;
  displayName: string;
  unitList?: string[];
  valueList?: string[];
}

export enum EAmenityObjectType {
  Item = 1,
  Group = 2,
  Combo = 3,
}
