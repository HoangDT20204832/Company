import { BaseCrudService, TBaseResponse } from '@/base/base-crud-service';
import { httpService } from '@/base/http-service';

class NhatKyVanHanhService extends BaseCrudService {
  constructor() {
    super('/api/services/app/NhatKyVanHanh');
  }
  public async getAllTaiSanChiTiet<T>(nhomTaiSanId?: number) {
    const res = await httpService.request<TBaseResponse<T>>({
      method: 'GET',
      url:
        '/api/services/app/TaiSanChiTiet/GetAll?skipCount=0&maxResultCount=1000' +
        (nhomTaiSanId ? '&nhomTaiSanId=' + nhomTaiSanId : ''),
    });
    return res.result;
  }

  public async getAllAbpUsers<T>() {
    const res = await httpService.request<TBaseResponse<T>>({
      method: 'GET',
      url: '/api/services/app/User/GetAll?skipCount=0&maxResultCount=1000',
    });
    return res.result;
  }
}
const nhatKyVanHanhService = new NhatKyVanHanhService();
export default nhatKyVanHanhService;
