import { BaseCrudService } from '@/base/base-crud-service';
import { TBaseResponse } from '@/base/base-crud-service';
import { httpService } from '@/base/http-service';

import {
  TCitizenReflectComment,
  TCitizenReflectCommentReqData,
  TGetAllCommnetByCitizenReflectReq,
  TGetCitizenReflectById,
} from './feedbacks.model';

export class FeedbackService extends BaseCrudService {
  constructor() {
    super('/api/services/app/AdminCitizenReflect');
  }

  public async create<T>(data: any, path?: '/CreateReflect'): Promise<T> {
    try {
      let resFileImg = [];
      if (data.fileUrl) {
        resFileImg = await httpService.uploadListImage({
          files: [data.fileUrl],
        });
      }
      const res = await httpService.request<TBaseResponse<T>>({
        method: 'POST',
        url: `/api/services/app/AdminCitizenReflect${path}`,
        data: {
          ...data,
          fileUrl: resFileImg.result[0],
        },
      });

      return res.result;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async updateStateReflect<T>(
    data: any,
    path = '/UpdateStateCitizenReflect',
    state?: number,
    finishTime?: any,
  ) {
    const res = await httpService.request<TBaseResponse<T>>({
      method: 'PUT',
      url: `${this.basePath}${path}`,
      data: {
        ...data,
        state: state,
        finishTime: finishTime,
      },
    });

    return res.result;
  }

  public async updateTimeProcessCitizenReflect<T>(finishTime: any, id: number) {
    const res = await httpService.request<TBaseResponse<T>>({
      method: 'POST',
      url: `${this.basePath}/SetTimeProcessCitizenReflect`,
      data: {
        finishTime: finishTime,
        id: id,
      },
    });

    return res.result;
  }

  public async createOrUpdateCitizenReflectComment(
    data: Partial<TCitizenReflectCommentReqData>,
  ) {
    const res = await httpService.request<TBaseResponse<any>>({
      method: 'POST',
      url: `${this.basePath}/CreateOrUpdateCitizenReflectComment`,
      data,
    });
    return res.result;
  }

  public async getAllCommnetByCitizenReflect(
    params: Partial<TGetAllCommnetByCitizenReflectReq>,
  ) {
    const res = await httpService.request<
      TBaseResponse<{
        data: TCitizenReflectComment[];
        totalRecords: number;
      }>
    >({
      method: 'GET',
      url: `${this.basePath}/GetChatMessageByCitizenReflect`,
      params: { SkipCount: 0, MaxResultCount: 10, ...params },
    });
    return res.result;
  }

  public async getCitizenReflectById(id: number) {
    const res = await httpService.request<
      TBaseResponse<{ data: TGetCitizenReflectById }>
    >({
      method: 'GET',
      url: `${this.basePath}/GetCitizenReflectById`,
      params: {
        id: id,
      },
    });

    return res.result;
  }
}

const feedbackService = new FeedbackService();

export default feedbackService;
