import { IBaseHttpResponse } from '@/base/base.model';
import { httpService } from '@/base/http-service';

import { IDistrict, IProvince, IWard } from './vau.model';

class VAUService {
  constructor() {}

  async getProvinces() {
    const res = await httpService.request<IBaseHttpResponse<IProvince[]>>({
      method: 'GET',
      url: '/api/services/app/VietnameseAdministrative/GetAllProvinces',
    });
    return res.result;
  }

  async getDistricts(provinceCode: string) {
    const res = await httpService.request<IBaseHttpResponse<IDistrict[]>>({
      method: 'GET',
      url: `/api/services/app/VietnameseAdministrative/GetAllDistricts`,
      params: {
        provinceCode,
      },
    });
    return res.result;
  }

  async getWards(districtCode: string) {
    const res = await httpService.request<IBaseHttpResponse<IWard[]>>({
      method: 'GET',
      url: `/api/services/app/VietnameseAdministrative/GetAllWards`,
      params: {
        districtCode,
      },
    });
    return res.result;
  }
}

export const vauService = new VAUService();
