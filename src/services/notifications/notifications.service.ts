import {
  BaseCrudService,
  TBaseResponse,
  TGetAllQuery,
} from '@/base/base-crud-service';
import { IPaginatedItems } from '@/base/base.model';
import { httpService } from '@/base/http-service';

import {
  ENotificationState,
  ICreateNotification,
  INotifyGetAllBuilding,
  INotifyGetAllCitizen,
  INotifyGetAllProvider,
  IUserNotification,
} from './notification.model';

class NotificationService extends BaseCrudService {
  constructor() {
    super('/api/services/app/AdminNotification');
  }

  public async getAll<IUserNotification>(
    query?: TGetAllQuery,
    path = '/getAll',
  ): Promise<IPaginatedItems<IUserNotification>> {
    if (query?.page !== undefined && query?.pageSize !== undefined) {
      query.skipCount = query.page * query.pageSize;
      query.maxResultCount = query.pageSize;

      delete query.page;
      delete query.pageSize;
    }

    const res = await httpService.request<
      TBaseResponse<IPaginatedItems<IUserNotification>>
    >({
      method: 'GET',
      url: `/api/services/app/AdminNotification${path}`,
      params: query,
    });

    return res.result;
  }

  public async getAllUserNotification(params: {
    state?: ENotificationState;
    startDate?: Date;
    endDate?: Date;
    skipCount?: number;
    maxResultCount?: number;
    keyword?: string;
    sortBy?: number;
  }): Promise<IPaginatedItems<IUserNotification>> {
    const response = await httpService.request<
      TBaseResponse<IPaginatedItems<IUserNotification>>
    >({
      url: '/api/services/app/Notification/GetUserNotifications',
      method: 'GET',
      params,
    });

    return response.result;
  }

  public async markAllAsRead(): Promise<void> {
    await httpService.request({
      url: '/api/services/app/Notification/SetAllNotificationsAsRead',
      method: 'POST',
    });
  }

  public async markAsRead(id: string): Promise<void> {
    await httpService.request({
      url: `/api/services/app/Notification/SetNotificationAsRead`,
      method: 'POST',
      data: {
        id,
      },
    });
  }

  public async create(
    data: ICreateNotification & { providerUserIds?: number[] },
  ) {
    if (data.providerUserIds?.length) {
      data.userIds = [...(data.userIds || []), ...(data.providerUserIds || [])];
      delete data.providerUserIds;
    }
    const res = await httpService.request<TBaseResponse<any>>({
      url: '/api/services/app/AdminNotification/CreateNotification',
      method: 'POST',
      data,
    });

    return res.result;
  }

  public async delete(id: string) {
    const res = await httpService.request<TBaseResponse<any>>({
      url: '/api/services/app/AdminNotification/DeleteScheduler',
      method: 'DELETE',
      params: {
        id,
      },
    });

    return res.result;
  }

  public async deleteMany(ids: string[]) {
    const res = await httpService.request<TBaseResponse<any>>({
      url: '/api/services/app/AdminNotification/DeleteManyScheduler',
      method: 'DELETE',
      data: ids,
    });

    return res.result;
  }

  public async deleteAll(params: {
    state: ENotificationState;
    startDate?: Date;
    endDate?: Date;
  }): Promise<void> {
    await httpService.request({
      url: `/api/services/app/Notification/DeleteAllUserNotifications`,
      method: 'DELETE',
      params,
    });
  }

  public async getAllTenant() {
    const res = await httpService.request<
      TBaseResponse<
        IPaginatedItems<{
          id: number;
          name: string;
        }>
      >
    >({
      url: '/api/services/app/AdminNotification/GetAllTenant',
      method: 'GET',
    });

    return res.result;
  }

  public async getAllCitizen(params: {
    tenantId: number;
    urbanId?: number;
    buildingId?: number;
  }) {
    const res = await httpService.request<
      TBaseResponse<IPaginatedItems<INotifyGetAllCitizen>>
    >({
      url: '/api/services/app/AdminNotification/GetAllCitizen',
      method: 'GET',
      params,
    });

    return res.result;
  }

  public async getAllProvider(params: { type?: number; groupType?: number }) {
    const res = await httpService.request<
      TBaseResponse<IPaginatedItems<INotifyGetAllProvider>>
    >({
      url: '/api/services/app/AdminNotification/GetAllProvider',
      method: 'GET',
      params,
    });

    return res.result;
  }

  public async getAllUrban(params: { tenantId?: number }) {
    const res = await httpService.request<
      TBaseResponse<
        IPaginatedItems<{
          id: number;
          tenantId: number;
          projectCode: string;
          displayName: string;
        }>
      >
    >({
      url: '/api/services/app/AdminNotification/GetUrban',
      method: 'GET',
      params,
    });

    return res.result;
  }

  public async getAllBuilding(params: { tenantId?: number; urbanId?: number }) {
    const res = await httpService.request<
      TBaseResponse<IPaginatedItems<INotifyGetAllBuilding>>
    >({
      url: '/api/services/app/AdminNotification/GetBuilding',
      method: 'GET',
      params,
    });

    return res.result;
  }
}

const notificationService = new NotificationService();

export default notificationService;
