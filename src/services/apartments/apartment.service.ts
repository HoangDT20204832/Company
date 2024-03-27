import { BaseCrudService, TBaseResponse } from '@/base/base-crud-service';
import { httpService } from '@/base/http-service';

class ApartmentService extends BaseCrudService {
  constructor() {
    super('/api/services/app/AdminApartment');
  }

  public async deleteMany(
    ids: string[] | number[],
    path = '/DeleteManyApartments',
  ) {
    const res = await httpService.request<TBaseResponse<any>>({
      method: 'DELETE',
      url: `${this.basePath}${path}`,
      data: ids,
    });

    return res.result;
  }
}

const apartmentService = new ApartmentService();

export default apartmentService;
