import { BaseCrudService, TBaseResponse } from '@/base/base-crud-service';
import { httpService } from '@/base/http-service';

class TaiSanChiTietService extends BaseCrudService {
  constructor() {
    super('/api/services/app/TaiSanChiTiet');
  }
  public async getAllMaHeThong<T>() {
    const res = await httpService.request<TBaseResponse<T>>({
      method: 'GET',
      url: '/api/services/app/MaHeThong/GetAll?skipCount=0&maxResultCount=1000',
    });
    return res.result;
  }

  public async getAllNhomTaiSan<T>(maHeThongId: any, isAll: boolean = false) {
    if (maHeThongId) {
      const res = await httpService.request<TBaseResponse<T>>({
        method: 'GET',
        url: '/api/services/app/NhomTaiSan/GetAll?skipCount=0&maxResultCount=1000',
        params: { maHeThongId: maHeThongId },
      });
      return res.result;
    } else {
      if (isAll) {
        const res = await httpService.request<TBaseResponse<T>>({
          method: 'GET',
          url: '/api/services/app/NhomTaiSan/GetAll?skipCount=0&maxResultCount=1000',
        });
        return res.result;
      } else return null;
    }
  }

  public async getAllBlockTowers<T>() {
    const res = await httpService.request<TBaseResponse<T>>({
      method: 'GET',
      url: '/api/services/app/AdminBlockTower/GetAllBlockTower?skipCount=0&maxResultCount=1000',
    });
    return res.result;
  }

  public async getAllApartments<T>(buildingId: any, floorId: any) {
    if (buildingId || floorId) {
      const res = await httpService.request<TBaseResponse<T>>({
        method: 'GET',
        url: '/api/services/app/AdminApartment/GetAllApartment?skipCount=0&maxResultCount=1000',
        params: { buildingId: buildingId, floorId: floorId },
      });
      return res.result;
    } else {
      return null;
    }
  }

  public async getAllAbpOrganizationUnits<T>() {
    const res = await httpService.request<TBaseResponse<T>>({
      method: 'GET',
      url: '/api/services/app/Building/GetAllBuildings?skipCount=0&maxResultCount=1000',
    });
    return res.result;
  }

  public async getAllFloors<T>(buildingId: any) {
    if (buildingId) {
      const res = await httpService.request<TBaseResponse<T>>({
        method: 'GET',
        url: '/api/services/app/AdminFloor/GetAllFloor?skipCount=0&maxResultCount=1000',
        params: { buildingId: buildingId },
      });
      return res.result;
    } else {
      return null;
    }
  }
  public async getEnum<T>(type: string) {
    const res = await httpService.request<TBaseResponse<T>>({
      method: 'GET',
      url: '/api/services/app/TaiSanChiTiet/GetEnums',
      params: { type: type },
    });
    return res.result;
  }
}
const taiSanChiTietService = new TaiSanChiTietService();
export default taiSanChiTietService;
