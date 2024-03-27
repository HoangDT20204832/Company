import { BaseCrudService } from '@/base/base-crud-service';
import { TBaseResponse } from '@/base/base-crud-service';
import { httpService } from '@/base/http-service';

import { IGetStatistics } from './citizen.model';

export class ReportCitizenService extends BaseCrudService {
  constructor() {
    super('');
  }

  public async getStatisticsCitizenTemp(sex: number, queryCase: number) {
    const res = await httpService.request<TBaseResponse<IGetStatistics>>({
      method: 'GET',
      url: `/api/services/app/CitizenTemp/GetStaticCitizen?sex=${sex}&queryCase=${queryCase}`,
    });

    return res.result;
  }
  public async getStatisticsCareerCitizenTemp(queryCase: number) {
    const res = await httpService.request<TBaseResponse<IGetStatistics>>({
      method: 'GET',
      url: `/api/services/app/CitizenTemp/GetStaticCitizen?queryCase=${queryCase}`,
    });

    return res.result;
  }
}

const reportCitizenService = new ReportCitizenService();

export default reportCitizenService;
