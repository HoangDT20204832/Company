import { IBaseHttpResponse } from '@/base/base.model';
import { httpService } from '@/base/http-service';

import { IAbpConfiguration, IGetCurLoginInfoResult } from './abp.model';

class AbpService {
  async getConfigurations() {
    const response = await httpService.request<
      IBaseHttpResponse<IAbpConfiguration>
    >({
      url: '/AbpUserConfiguration/GetAll',
      method: 'GET',
    });

    return response.result;
  }

  async getCurLoginInfo() {
    const response = await httpService.request<
      IBaseHttpResponse<IGetCurLoginInfoResult>
    >({
      url: '/api/services/app/Session/GetCurrentLoginInformations',
      method: 'GET',
    });

    return response.result;
  }
}

export const abpService = new AbpService();
