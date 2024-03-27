import { BaseCrudService } from '@/base/base-crud-service';
import { TBaseResponse } from '@/base/base-crud-service';
import { httpService } from '@/base/http-service';

import { IGetStatistics } from './reflect.model';

export class ReflectService extends BaseCrudService {
  constructor() {
    super('');
  }

  public getYear() {
    const d = new Date();
    const year = d.getFullYear();
    const data = [];
    for (let i = 0; i < 50; i++) {
      data.push({ label: year - i, value: year - i });
    }
    return data;
  }
  public async getStatisticsCitizenReflect(
    numberRange: number,
    queryCase: number,
    formId: number,
    month: number,
    year: number,
    urbanId: number,
    buildingId: number,
  ) {
    const res = await httpService.request<TBaseResponse<IGetStatistics>>({
      method: 'GET',
      url: `/api/services/app/AdminCitizenReflect/GetStatisticsCitizenReflect?numberRange=${numberRange}&queryCase=${queryCase}&formId=${formId}&month=${month}&year=${year}
      ${urbanId ? '&urbanId=' + urbanId : ''}${
        buildingId ? '&buildingId=' + buildingId : ''
      }`,
    });

    return res.result;
  }
}

const reflectService = new ReflectService();

export default reflectService;
