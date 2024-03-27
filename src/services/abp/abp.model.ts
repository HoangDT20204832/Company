export interface IAbpConfiguration {
  multiTenancy: any;
  session: any;
  localization: any;
  features: any;
  auth: {
    allPermissions: any;
    grantedPermissions: any;
  };
  nav: any;
  setting: any;
  clock: any;
  timing: any;
  security: any;
  custom: any;
}

export interface IAbpState {
  permissions: string[];
  curLoginInfo?: IGetCurLoginInfoResult;
}

export interface IGetCurLoginInfoResult {
  application: {
    version: string;
  };
  user: {
    id: number;
    name: string;
    surname: string;
    userName: string;
    emailAddress: string;
    imageUrl?: string;
  };
  tenant: {
    id: number;
    name: string;
    tenancyName: string;
  };
}

export type TAbpActionType = 'setPermissions' | 'setCurLoginInfo';
