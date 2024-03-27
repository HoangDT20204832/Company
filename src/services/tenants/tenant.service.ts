import {
  BaseCrudService,
  TBaseResponse,
  TData,
} from '@/base/base-crud-service';
import { IPaginatedItems } from '@/base/base.model';
import { httpService } from '@/base/http-service';
import permissionService from '@/services/permission/permission.service';

import { ITenant } from './tenant.model';

const DEFAULT_VALUE = {
  mobileConfig: {
    socialConfig: [],
    communityConfig: [],
    typeConfig: 1,
    portalWebsite: '',
  },
  adminPageConfig: {
    layoutTenantConfig: {
      labelTenant: '',
      iconTenant: null,
      logoTenant: null,
      statisticsTbls: [],
      statisticsCounters: [],
    },
  },
  permissions: null,
};

class TenantService extends BaseCrudService {
  constructor() {
    super('/api/services/app/Tenant');
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

  public async getTenantAbout() {
    const res = await httpService.request<
      TBaseResponse<
        TData<{
          detail: string;
          id: number;
          tenantId: number | null;
        }>
      >
    >({ url: '/api/services/app/Introduce/GetIntroduce', method: 'get' });

    return res.result;
  }

  public async createOrUpdateTenantAbout(data: {
    detail: string;
    id?: number;
    tenantId: number | null;
  }) {
    const res = await httpService.request<
      TBaseResponse<
        TData<{
          detail: string;
          id: number;
          tenantId: number;
        }>
      >
    >({
      url: '/api/services/app/Introduce/CreateOrUpdateIntroduce',
      method: 'post',
      data,
    });

    return res.result.data;
  }

  public async getTenantDetail(id: string | number): Promise<ITenant> {
    const tenant = (await super.getOne<ITenant>(id)) as any;

    tenant.mobileConfig =
      JSON.parse(tenant.mobileConfig) || DEFAULT_VALUE.mobileConfig;

    tenant.adminPageConfig =
      JSON.parse(tenant.adminPageConfig) || DEFAULT_VALUE.adminPageConfig;

    tenant.permissions = (
      await permissionService.getAllPermissions({
        tenantId: tenant.id,
      })
    ).items.map((x) => x.name);

    return tenant;
  }

  public async updateTenantConfig(data: ITenant) {
    if (
      !!data.adminPageConfig.layoutTenantConfig.iconTenant &&
      typeof data.adminPageConfig.layoutTenantConfig.iconTenant === 'object'
    ) {
      data.adminPageConfig.layoutTenantConfig.iconTenant = (
        await httpService.uploadFile({
          file: data.adminPageConfig.layoutTenantConfig.iconTenant,
        })
      ).result.data;
    }

    if (
      !!data.adminPageConfig.layoutTenantConfig.logoTenant &&
      typeof data.adminPageConfig.layoutTenantConfig.logoTenant === 'object'
    ) {
      data.adminPageConfig.layoutTenantConfig.logoTenant = (
        await httpService.uploadFile({
          file: data.adminPageConfig.layoutTenantConfig.logoTenant,
        })
      ).result.data;
    }

    data.mobileConfig = JSON.stringify(data.mobileConfig);
    data.adminPageConfig = JSON.stringify(data.adminPageConfig);
    delete data.permissions;

    const res = await super.update<ITenant>(data, '/UpdateConfigTenant');

    return res;
  }

  public async updateBasicInfo(data: ITenant) {
    delete data.mobileConfig;
    delete data.adminPageConfig;
    delete data.permissions;

    const res = await super.update<ITenant>(data);

    return res;
  }

  public updateTenantConfigWithPermissions(data: ITenant): Promise<any> {
    const permissions = data.permissions;

    return Promise.all([
      this.updateTenantConfig(data),
      permissionService.updatePermissionForTenant({
        tenantId: data.id,
        permissions: permissions.map((item: any) => item.name),
      }),
    ]);
  }
}

const tenantService = new TenantService();

export default tenantService;
