import { TBaseResponse } from '@/base/base-crud-service';
import { IPaginatedItems } from '@/base/base.model';
import { httpService } from '@/base/http-service';

import { ICitizen, IOwnerApartment } from './citizen-temp.model';

class CitizenTempService {
  public async getAllCitizen({
    params,
  }: {
    params?: any;
  }): Promise<IPaginatedItems<ICitizen>> {
    const response = await httpService.request<
      TBaseResponse<IPaginatedItems<ICitizen>>
    >({
      url: '/api/services/app/CitizenTemp/GetAllCitizen',
      method: 'get',
      params,
    });

    return response.result;
  }

  public async getAllOwnerApartment(
    params?: any,
  ): Promise<IPaginatedItems<IOwnerApartment>> {
    const response = await httpService.request<
      TBaseResponse<IPaginatedItems<IOwnerApartment>>
    >({
      url: '/api/services/app/CitizenTemp/GetAllOwnerApartment',
      method: 'get',
      params,
    });

    return response.result;
  }
  public async getCitizenInfoByAccountId(data: {
    apartmentCode: string;
    urbanId: number;
    buildingId: number;
    dateOfBirth: string;
    fullName: string;
  }) {
    const res = await httpService.request<TBaseResponse<any>>({
      method: 'GET',
      url: `/api/services/app/CitizenTemp/GetCitizenInfoByAccountId`,
      params: data,
    });

    return res.result;
  }
}

const citizenTempService = new CitizenTempService();

export default citizenTempService;
