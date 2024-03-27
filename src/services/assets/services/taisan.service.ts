import { BaseCrudService, TBaseResponse } from '@/base/base-crud-service';
import { httpService } from '@/base/http-service';

class TaiSanService extends BaseCrudService {
  constructor() {
    super('/api/services/app/TaiSan');
  }

  public async getAllNhomTaiSan<T>() {
    const res = await httpService.request<TBaseResponse<T>>({
      method: 'GET',
      url: '/api/services/app/NhomTaiSan/GetAll?skipCount=0&maxResultCount=1000',
    });
    return res.result;
  }

  public async getAllLoaiTaiSan<T>() {
    const res = await httpService.request<TBaseResponse<T>>({
      method: 'GET',
      url: '/api/services/app/LoaiTaiSan/GetAll?skipCount=0&maxResultCount=1000',
    });
    return res.result;
  }

  public async getAllNhaSanXuat<T>() {
    const res = await httpService.request<TBaseResponse<T>>({
      method: 'GET',
      url: '/api/services/app/NhaSanXuat/GetAll?skipCount=0&maxResultCount=1000',
    });
    return res.result;
  }

  public async getAllDonViTaiSan<T>() {
    const res = await httpService.request<TBaseResponse<T>>({
      method: 'GET',
      url: '/api/services/app/DonViTaiSan/GetAll?skipCount=0&maxResultCount=1000',
    });
    return res.result;
  }

  public async getAllKhoTaiSan<T>() {
    const res = await httpService.request<TBaseResponse<T>>({
      method: 'GET',
      url: '/api/services/app/KhoTaiSan/GetAll?skipCount=0&maxResultCount=1000',
    });
    return res.result;
  }

  public async create<T>(data: any, path?: '/Create'): Promise<T> {
    if (data.anhDaiDien) {
      const urlAnhDaiDien = await httpService.uploadListImage({
        files: [data.anhDaiDien],
      });
      data.anhDaiDien = urlAnhDaiDien.result[0];
    }
    //Thêm nhiều ảnh
    if (data.hinhAnh) {
      const listHinhAnh = await httpService.uploadListImage({
        files: data.hinhAnh,
      });
      data.hinhAnh = listHinhAnh.result;
    }
    const res = await httpService.request<TBaseResponse<T>>({
      method: 'POST',
      url: `/api/services/app/TaiSan${path}`,
      data,
    });

    return res.result;
  }

  public async update<T>(data: any, path: '/Update'): Promise<T> {
    if (data.anhDaiDien && typeof data.anhDaiDien !== 'string') {
      const urlAnhDaiDien = await httpService.uploadListImage({
        files: [data.anhDaiDien],
      });
      data.anhDaiDien = urlAnhDaiDien.result[0];
    }

    if (data.hinhAnh && typeof data.hinhAnh !== 'string') {
      if (
        data.hinhAnh.filter((el: File | string) => typeof el !== 'string')
          .length > 0
      ) {
        const listHinhAnh = await httpService.uploadListImage({
          files: data.hinhAnh
            ? data.hinhAnh.filter((el: File | string) => typeof el !== 'string')
            : [],
        });
        data.hinhAnh = [
          ...data.hinhAnh.filter((el: File | string) => typeof el === 'string'),
          ...listHinhAnh.result,
        ];
      }
    }

    const res = await httpService.request<TBaseResponse<T>>({
      method: 'PUT',
      url: `/api/services/app/TaiSan${path}`,
      data,
    });

    return res.result;
  }

  public async getDataNhapXuat<T>(id: number) {
    const res = await httpService.request<TBaseResponse<T>>({
      method: 'GET',
      url: '/api/services/app/TaiSan/GetDSTaiSanNhapXuatById?id=' + id,
    });
    return res.result;
  }
}

const taiSanService = new TaiSanService();

export default taiSanService;
