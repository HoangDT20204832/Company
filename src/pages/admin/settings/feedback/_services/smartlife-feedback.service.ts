import qs from 'querystring';

import { BaseCrudService } from '@/base/base-crud-service';
import { TBaseResponse } from '@/base/base-crud-service';
import { IDownloadTempFileInput } from '@/base/base.model';
import { httpService } from '@/base/http-service';
import { API_ENDPOINT } from '@/configs/constant.config';

export class SmartlifeFeedbackService extends BaseCrudService {
  constructor() {
    super('/api/services/app/FeedbackApp');
  }

  public async getAllFeedbacks<T>(path = '/GetAllFeedbackApp') {
    const res = await httpService.request<TBaseResponse<T>>({
      method: 'GET',
      url: `${this.basePath}${path}`,
    });

    return res.result;
  }

  public async exportToExcel(
    ids: string[] | number[] = [],
    path = '/ExportFeedbackAppToExcel',
  ) {
    const res = await httpService.request<
      TBaseResponse<{ data: IDownloadTempFileInput }>
    >({
      method: 'POST',
      url: `${this.basePath}${path}`,
      data: { ids },
    });

    location.href = `${API_ENDPOINT}/DownloadTempFile?${qs.stringify(
      res.result?.data as any,
    )}`;
  }
}
