export interface ILoginInput {
  userNameOrEmailAddress: string;
  password: string;
  tenancyName?: string;
  rememberClient?: boolean;
}

export interface ILoginResult {
  accessToken: string;
  encryptedAccessToken: string;
  expireInSeconds: number;
  refreshToken: string;
  refreshTokenExpireInSeconds: number;
  userId: number;
  tenantId: number | null;
  emailAddress: string;
  isCitizen: boolean | null;
  mobileConfig: any;
}

export interface IRegisterInput {
  name: string;
  surname: string;
  userName: string;
  emailAddress: string;
  password: string;
  captchaResponse?: string;
  isCitizen?: boolean;
  phoneNumber?: string;
  address?: string;
  gender?: string;
  dateOfBirth?: string;
}

export interface GetUserInfoApiParams {
  accessToken: string;
}

export interface IUserInfo {
  userName: string;
  name?: string;
  surname?: string;
  emailAddress: string;
  isActive: boolean;
  fullName: string;
  phoneNumber: string;
  lastLoginTime: string | null;
  creationTime: string;
  roleNames: string[] | null;
  homeAddress: string;
  addressOfBirth?: string | null;
  dateOfBirth?: Date | string;
  gender?: string;
  nationality?: string;
  groupImageUrl?: string | null;
  imageUrl?: string;
  phanKhuId?: number | null;
  houseId?: number | null;
  identityNumber?: string | null;
  qrCodeBase64?: string | null;
  stateFriend?: number;
  id: number;
}

export interface IRefreshTokenResult {
  accessToken: string;
  encryptedAccessToken: string;
  expireInSeconds: number;
}

export interface IIsTenantAvailableResult {
  adminPageConfig: string | null;
  mobileConfig: string | null;
  permissions: string | null;
  state: number;
  tenantId: number | null;
}

export interface IAuthState {
  tenantId?: number | null;

  currentUser?: IUserInfo;
  isAuth: boolean;
}

export type TAuthActionType = 'logout' | 'setIsAuth' | 'setCurrentUser';
