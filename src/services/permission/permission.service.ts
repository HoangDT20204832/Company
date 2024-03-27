import { TBaseResponse } from '@/base/base-crud-service';
import { httpService } from '@/base/http-service';

type IPermission = {
  description: string;
  displayName: string;
  isGrantedByDefault: boolean;
  level: number;
  name: string;
  parentName: string;
};

class PermissionService {
  public async getAllPermissions(params?: { tenantId?: number }) {
    const response = await httpService.request<
      TBaseResponse<{ items: IPermission[] }>
    >({
      url: '/api/services/app/Permission/GetAllPermissions',
      method: 'get',
      params: {
        tenantId: params?.tenantId,
      },
    });
    return response.result;
  }

  public async updatePermissionForTenant(data: {
    tenantId: number | null;
    permissions: string[];
  }) {
    const res = await httpService.request<TBaseResponse<any>>({
      url: '/api/services/app/Permission/UpdatePermissionsForTenant',
      method: 'put',
      data,
    });

    return res.result.data;
  }
}

const permissionService = new PermissionService();

export default permissionService;
