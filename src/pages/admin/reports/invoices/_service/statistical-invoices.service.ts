import qs from 'querystring';

import { BaseCrudService } from '@/base/base-crud-service';
import { TBaseResponse } from '@/base/base-crud-service';
import { IDownloadTempFileInput } from '@/base/base.model';
import { httpService } from '@/base/http-service';
import { API_ENDPOINT } from '@/configs/constant.config';

import { IGetStatistics } from '../../overview/_services/report.model';

export class StatisticalBillService extends BaseCrudService {
  constructor() {
    super('');
  }

  public async getApartmentBillStatistics(data: {
    NumberRange?: number;
    QueryCase?: number;
    type?: number;
    UrbanId?: number;
    BuildingId?: number;
  }) {
    const res = await httpService.request<TBaseResponse<IGetStatistics>>({
      method: 'GET',
      url: `/api/services/app/StatisticBill/GetApartmentBillStatistics`,
      params: { numberRange: 12, queryCase: 2, ...(data || {}) },
    });

    return res.result;
  }

  public async getTotalStatisticUserBill(data: {
    UrbanId?: number;
    buildingId?: number;
    Period?: number;
  }) {
    const res = await httpService.request<TBaseResponse<IGetStatistics>>({
      method: 'GET',
      url: `/api/services/app/StatisticBill/GetTotalStatisticUserBill`,
      params: data,
    });

    return res.result;
  }

  public async exportStatisticBillExcel(data: {
    numberRange?: number;
    type?: number;
    urbanId?: number;
    buildingId?: number;
  }) {
    const res = await httpService.request<
      TBaseResponse<{ data: IDownloadTempFileInput }>
    >({
      method: 'POST',
      url: '/api/services/app/ExcelBill/ExportStatisticBillExcel',
      data: { numberRange: 12, queryCase: 1, type: 1, ...(data || {}) },
    });

    location.href = `${API_ENDPOINT}/DownloadTempFile?${qs.stringify(
      res.result.data as any,
    )}`;
  }

  public async exportAllDetailUserBillToExcel(data: {
    numberRange?: number;
    type?: number;
    urbanId?: number;
    buildingId?: number;
  }) {
    const res = await httpService.request<
      TBaseResponse<{ data: IDownloadTempFileInput }>
    >({
      method: 'POST',
      url: '/api/services/app/StatisticBill/ExportAllDetailUserBillToExcel',
      data: { queryCase: 1, type: 1, ...(data || {}) },
    });

    location.href = `${API_ENDPOINT}/DownloadTempFile?${qs.stringify(
      res.result.data as any,
    )}`;
  }
}

const statisticalBillService = new StatisticalBillService();

export default statisticalBillService;
