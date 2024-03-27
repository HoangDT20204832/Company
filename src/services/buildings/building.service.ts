import {
  BaseCrudService,
  TBaseResponse,
  TGetAllQuery,
} from '@/base/base-crud-service';
import { IPaginatedItems } from '@/base/base.model';
import { httpService } from '@/base/http-service';

import { IBuilding } from './building.model';

class BuildingService extends BaseCrudService {
  constructor() {
    super('/api/services/app/Building');
  }

  public async getAllBuildings(
    query?: TGetAllQuery | undefined,
    path?: string,
  ): Promise<IPaginatedItems<IBuilding>> {
    const result = await super.getAll<IBuilding>(
      query,
      path || '/GetAllBuildings',
    );

    return result;
  }

  public async update(data: IBuilding): Promise<any> {
    try {
      if (data.imageUrl && typeof data.imageUrl === 'object') {
        const imageUrl = await httpService.uploadFile({
          file: data.imageUrl,
        });
        data.imageUrl = imageUrl.result.data;
      }

      const res = await httpService.request<TBaseResponse<any>>({
        method: 'PUT',
        url: `${this.basePath}/UpdateBuilding`,
        data,
      });

      return res.result;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async create(data: IBuilding): Promise<any> {
    try {
      if (data.imageUrl && typeof data.imageUrl === 'object') {
        const imageUrl = await httpService.uploadFile({
          file: data.imageUrl,
        });
        data.imageUrl = imageUrl.result.data;
      }

      const res = await httpService.request<TBaseResponse<any>>({
        method: 'POST',
        url: `${this.basePath}/CreateBuilding`,
        data,
      });

      return res.result;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

const buildingService = new BuildingService();

export default buildingService;
