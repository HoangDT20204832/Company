export interface ICreateMomoTenantInput {
  name: string;
  partnerCode: string;
  accessKey: string;
  secretKey: string;
  storeName?: string;
  storeId?: string;
}

export interface IMomoTenant {
  id: number;
  tenantId?: number;
  name: string;
  partnerCode: string;
  accessKey: string;
  secretKey: string;
  storeName?: string;
  storeId?: string;
}
