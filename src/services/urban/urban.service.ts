import {
  BaseCrudService,
  TBaseResponse,
  TGetAllQuery,
} from '@/base/base-crud-service';
import { IPaginatedItems } from '@/base/base.model';
import { httpService } from '@/base/http-service';

import { ICreateUrbanDto, IUpdateUrbanDto, IUrban } from './urban.model';

class UrbanService extends BaseCrudService {
  constructor() {
    super('/api/services/app/Urban');
  }

  public async getAllUrbans(
    query?: TGetAllQuery,
    path?: string,
  ): Promise<IPaginatedItems<IUrban>> {
    const result = await super.getAll<IUrban>(
      query,
      path || '/GetAllUrbanByUser',
    );

    return result;
  }

  public async create(data: ICreateUrbanDto): Promise<any> {
    data.imageUrl = data.imageUrl
      ? (await httpService.uploadFile({ file: data.imageUrl })).result.data
      : '';

    const response = await httpService.request<TBaseResponse<any>>({
      url: '/api/services/app/Urban/CreateUrban',
      method: 'post',
      data,
    });

    return response.result;
  }

  public async update(data: IUpdateUrbanDto): Promise<any> {
    if (data.imageUrl && typeof data.imageUrl !== 'string') {
      data.imageUrl = (
        await httpService.uploadFile({ file: data.imageUrl })
      ).result.data;
    }

    return super.update(data, '/UpdateUrban');
  }
}

const urbanService = new UrbanService();

export default urbanService;
