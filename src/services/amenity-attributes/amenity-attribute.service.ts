import {
  BaseCrudService,
  TBaseResponse,
  TGetAllQuery,
} from '@/base/base-crud-service';
import { IPaginatedItems } from '@/base/base.model';
import { httpService } from '@/base/http-service';

import { ICreateAmenityAttribute } from './amenity-attribute.model';

class AmenityAttributeService extends BaseCrudService {
  constructor() {
    super('/business/api/services/app/AmenitiesAttribute');
  }

  public async getAll(query?: TGetAllQuery): Promise<any> {
    if (query?.page !== undefined && query?.pageSize !== undefined) {
      query.skipCount = query.page * query.pageSize;
      query.maxResultCount = query.pageSize;

      delete query.page;
      delete query.pageSize;
    }

    const res = await httpService.request<IPaginatedItems<any>>({
      method: 'GET',
      url: '/business/api/services/app/AmenitiesAttribute/GetAll',
      params: query,
    });

    return res;
  }

  public async create(data: ICreateAmenityAttribute): Promise<any> {
    try {
      if (data.iconUrl && typeof data.iconUrl === 'object') {
        const response = await httpService.uploadFile({
          file: data.iconUrl,
        });
        data.iconUrl = response.result.data;
      }

      const res = await httpService.request<TBaseResponse<any>>({
        method: 'POST',
        url: `${this.basePath}/Create`,
        data,
      });

      return res.result;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

const amenityAttributeService = new AmenityAttributeService();

export default amenityAttributeService;
