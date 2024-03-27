import { BaseCrudService } from '@/base/base-crud-service';
import { httpService } from '@/base/http-service';

import {
  IImageSupervise,
  IImageSuperviseTenant,
} from './image-supervise.model';

type TBaseResponse<T> = {
  success: boolean;
  result: T;
};

export class ImageSuperviseService extends BaseCrudService {
  constructor() {
    super('/api/services/app/ImageConfig');
  }

  public async getImage(
    params?: {
      type: number;
      tenantId?: number;
      scope?: number;
    },
    path = '/GetList',
  ) {
    const res = await httpService.request<
      TBaseResponse<IImageSuperviseTenant[]>
    >({
      method: 'GET',
      url: `${this.basePath}${path}`,
      params: params,
    });

    return res.result;
  }

  public async create(data: IImageSupervise): Promise<any> {
    try {
      if (data.imageUrl && typeof data.imageUrl === 'object') {
        const imageUrl = await httpService.uploadFile({
          file: data.imageUrl,
        });
        data.imageUrl = imageUrl.result.data;
      }

      const properties = JSON.stringify({
        actions: data.actions,
        data: data?.data,
      });

      const res = await httpService.request<TBaseResponse<any>>({
        method: 'POST',
        url: `${this.basePath}/Create`,
        data: {
          tenantId: data?.tenantId,
          type: data.type,
          scope: data?.scope,
          imageUrl: data?.imageUrl,
          properties: properties,
        },
      });

      return res.result;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async update(data: IImageSupervise): Promise<any> {
    try {
      if (data.imageUrl && typeof data.imageUrl === 'object') {
        const imageUrl = await httpService.uploadFile({
          file: data.imageUrl,
        });
        data.imageUrl = imageUrl.result.data;
      }

      const properties = JSON.stringify({
        actions: data.actions,
        data: data?.data,
      });

      const res = await httpService.request<TBaseResponse<any>>({
        method: 'PUT',
        url: `${this.basePath}/Update`,
        data: {
          ...data,
          properties: properties,
        },
      });

      return res.result;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async deleteItem(
    id: number,
    path?: '/Delete',
  ): Promise<{ result: any; success: boolean }> {
    const res = await httpService.request<
      TBaseResponse<{ result: any; success: boolean }>
    >({
      method: 'DELETE',
      url: `${this.basePath}${path}`,
      params: { id },
    });

    return res;
  }
}

const imageSuperviseService = new ImageSuperviseService();
export default imageSuperviseService;
