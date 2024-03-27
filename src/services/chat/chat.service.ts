import { IBaseHttpResponse } from '@/base/base.model';
import { httpService } from '@/base/http-service';

import {
  TChatItem,
  TGetChatQuery,
  TGetMsgQuery,
  TGroupChatConversation,
  TGroupChatDetail,
  TMsgItem,
} from './chat.model';

type TRes1 = {
  friends: TChatItem[];
  senderId: number;
  serverTime: string;
};

export const getOrganizationUnitChatAdminReq = async (
  params: Partial<TGetChatQuery>,
) => {
  try {
    const res = await httpService.request<IBaseHttpResponse<TRes1>>({
      url: '/api/services/app/OrganizationUnitChat/GetOrganizationUnitChatAdmin',
      method: 'GET',
      params,
    });
    return res.result;
  } catch (err) {
    return null;
  }
};

export const getUserChatMessagesReq = async (params: TGetMsgQuery) => {
  try {
    const res = await httpService.request<
      IBaseHttpResponse<{ items: TMsgItem[] }>
    >({
      url: '/api/services/app/OrganizationUnitChat/GetUserChatMessages',
      method: 'GET',
      params,
    });
    return res.result;
  } catch (err) {
    return null;
  }
};

export const createGroupChatReq = async (data?: any) => {
  try {
    const res = await httpService.request<any>({
      url: '/api/services/app/GroupChat/CreateGroupChat',
      method: 'POST',
      data,
    });
    return res;
  } catch (err) {
    /* empty */
  }
};

export const getAllGroupChatsReq = async (params?: any) => {
  try {
    const res = await httpService.request<
      IBaseHttpResponse<{
        data: TGroupChatConversation[];
        totalRecords: number;
      }>
    >({
      url: '/api/services/app/GroupChat/GetAllGroupChats',
      method: 'GET',
      params: { SkipCount: 0, MaxResultCount: 100, SortBy: 1, ...params },
    });
    return res.result;
  } catch (err) {
    return null;
  }
};

type TGetMessageGroupChatReq = {
  GroupChatId: number;
  SkipCount?: number;
  MaxResultCount?: number;
  Keyword?: string;
  SortBy?: number;
};
export const getMessageGroupChatReq = async (
  params: TGetMessageGroupChatReq,
) => {
  try {
    const res = await httpService.request<IBaseHttpResponse<{ data: any[] }>>({
      url: '/api/services/app/GroupChat/GetMessageGroupChat',
      method: 'GET',
      params: { SkipCount: 0, MaxResultCount: 100, SortBy: 1, ...params },
    });
    return res?.result;
  } catch (err) {
    return null;
  }
};

export const getGroupChatDetailReq = async (params: { id: number }) => {
  try {
    const res = await httpService.request<
      IBaseHttpResponse<{ data: TGroupChatDetail | null }>
    >({
      url: '/api/services/app/GroupChat/GetGroupChatDetail',
      method: 'GET',
      params,
    });
    return res?.result;
  } catch (err) {
    return null;
  }
};
