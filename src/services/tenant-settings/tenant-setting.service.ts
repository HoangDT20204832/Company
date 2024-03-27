import { TBaseResponse } from '@/base/base-crud-service';
import { httpService } from '@/base/http-service';

import { EPricesType } from '../invoices/models/service-fees.model';
import { ITenantSettingApp, ITenantSettings } from './tenant-setting.model';

class TenantSettingService {
  async getAllTenant(Keyword?: string) {
    const response = await httpService.request<
      TBaseResponse<{
        totalCount: number;
        items: ITenantSettingApp[];
      }>
    >({
      url: '/api/services/app/Tenant/GetAll',
      method: 'GET',
      params: {
        IsActive: true,
        SkipCount: 0,
        MaxResultCount: 1000,
        Keyword: Keyword,
      },
    });

    return response.result;
  }

  async getAllSettings() {
    const response = await httpService.request<TBaseResponse<ITenantSettings>>({
      url: '/api/services/app/TenantSettings/GetAllSettings',
      method: 'get',
    });

    return response.result;
  }

  async updateAllSettings(input: Partial<ITenantSettings>) {
    if (
      input.bankTransferSetting &&
      typeof input.bankTransferSetting.qrCode !== 'string'
    ) {
      const uploadedData = await httpService.uploadFile({
        file: input.bankTransferSetting.qrCode as File,
      });

      input.bankTransferSetting.qrCode = uploadedData.result.data;
    }

    const response = await httpService.request<TBaseResponse<ITenantSettings>>({
      url: '/api/services/app/TenantSettings/UpdateAllTenantSettings',
      method: 'put',
      data: input,
    });

    return response.result;
  }

  public async getParkingPriceType() {
    const response = await httpService.request<
      TBaseResponse<EPricesType.VehiclesType | EPricesType.NumberOfVehicles>
    >({
      url: '/api/services/app/TenantSettings/GetParkingPriceType',
      method: 'GET',
    });

    return response.result;
  }
}

const tenantSettingService = new TenantSettingService();

export default tenantSettingService;
