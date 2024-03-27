export enum ENotificationState {
  UNREAD = 0,
  READ = 1,
}

export interface IUserNotification {
  tenantId: number;
  userId: number;
  state: ENotificationState;
  notification: {
    tenantId: number;
    notificationName: string;
    data: {
      action: any;
      icon: any;
      typeAction: number;
      message: string;
      description?: string;
      imageUrl?: string;
      detailId: number;
      type: any;
      properties: any;
    };
    entityType: any;
    entityTypeName: any;
    entityId: any;
    severity: any;
    creationTime: string;
    id: string;
  };
  id: string;
}

export interface ICreateNotification {
  isTenant: boolean;
  isProvider: boolean;
  businessType: number;
  header: string;
  content: string;
  icon?: string;
  userIds?: number[];
  tenantId?: number;
  urbanId?: number;
  buildingId?: number;
  isOnlyFirebase?: boolean;
  typeNotification: number;
  urlApp?: string;
  urlWA?: string;
}

export interface INotifyGetAllCitizen {
  id: number;
  fullName: string;
  userId: number;
  state: number;
  urbanId: number;
  buildingId: number;
  tenantId: number;
}

export interface INotifyGetAllProvider {
  id: number;
  name: string;
  userId: number;
  type: number;
  phoneNumber: string;
  isDataStatic: boolean;
  groupType: number;
}

export interface INotifyGetAllBuilding {
  urbanId: number;
  projectCode: string;
  tenantId: number;
  displayName: string;
  isDeleted: boolean;
  id: number;
}
