export interface IOwnerApartment {
  fullName: string;
  userId: number | null;
  citizenTempId: number;
  apartmentCode: string;
  apartmentAreas: number | null;
  organizationUnitId: number | null;
  tenantId: number | null;
  relationShip: number;
  isStayed: boolean;
  ownerGeneration: number;
  id: number;
}

export interface ICitizen {
  urbanName: string;
  fullName: string;
  address: any;
  nationality: any;
  identityNumber: any;
  tenantId: number;
  imageUrl: any;
  phoneNumber: any;
  email: any;
  gender: string;
  dateOfBirth: Date;
  isVoter: boolean;
  apartmentCode: string;
  state: any;
  buildingCode?: string;
  type: number;
  isStayed: boolean;
  otherPhones: any;
  birthYear: number;
  organizationUnitId: any;
  urbanCode: any;
  urbanId: number;
  buildingId: number;
  taxCode: any;
  citizenCode: any;
  relationShip: number;
  memberNum: any;
  career: any;
  ownerGeneration: number;
  ownerId: any;
  isDeleted: boolean;
  deleterUserId: any;
  deletionTime: any;
  lastModificationTime: any;
  lastModifierUserId: any;
  creationTime: Date;
  creatorUserId: any;
  id: number;
}
