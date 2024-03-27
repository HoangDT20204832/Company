export interface IApartment {
  id: number;
  imageUrl?: string;
  apartmentCode: string;
  name: string;
  ownerName?: string;
  ownerPhoneNumber?: string;
  buildingId: number;
  buildingName?: string;
  urbanId: number;
  urbanName?: string;
  area?: number;
  blockId?: number;
  blockName?: string;
  floorId?: number;
  floorName?: string;
  typeId?: number;
  typeName?: string;
  statusId?: number;
  colorCode?: string;
  provinceCode?: string;
  districtCode?: string;
  wardCode?: string;
  address?: string;
  description?: string;
  numberOfMember?: number;
  vehicles: IApartmentVehicle[];
  members: IApartmentMember[];
}

export enum ERelationShipWithOwner {
  Contractor = 1,
  Wife = 2,
  Husband = 3,
  Daughter = 4,
  Son = 5,
  Family = 6,
  Father = 7,
  Mother = 8,
  Grandfather = 9,
  Grandmother = 10,
  Guest = 11,
  Wife_Guest = 12,
  Husband_Guest = 13,
  Daughter_Guest = 14,
  Son_Guest = 15,
  Family_Guest = 16,
  Father_Guest = 17,
  Mother_Guest = 18,
  Grandfather_Guest = 19,
  Grandmother_Guest = 20,
}

export interface IApartmentMember {
  id: number;
  name: string;
  phoneNumber?: string;
  relationship: ERelationShipWithOwner;
  generation: number;
  isStayed: boolean;
}

export interface IApartmentVehicle {
  vehicleName: string;
  vehicleType: number;
  vehicleCode: string;
  apartmentCode: string;
  parkingId: number | null;
}
