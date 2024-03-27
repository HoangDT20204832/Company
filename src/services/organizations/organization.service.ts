import { TBaseResponse } from '@/base/base-crud-service';
import { httpService } from '@/base/http-service';

export type TOrganizationUnitUserItem = {
  organizationUnitId: number;
  type: number;
  tenantCode: string;
  displayName: string;
  imageUrl: string;
  isManager: boolean;
  types: number[];
  parentId: number;
};

type TGetOrganizationUnitUsers = {
  name: string;
  surname: string;
  userName: string;
  fullName: string;
  emailAddress: string;
  id: number;
};

type TGetOrganizationUnit = {
  parentId?: number;
  code?: string;
  displayName?: string;
  memberCount: number;
  roleCount: number;
  departmentCount: number;
  unitChargeCount: number;
  description?: string;
  projectCode?: string;
  imageUrl?: string;
  type: number;
  tenantId?: number;
  isManager: boolean;
  groupId?: string;
  types: number[];
  lastModificationTime?: string;
  lastModifierUserId?: string;
  creationTime: string;
  creatorUserId?: string;
  id: string;
};

export const getOrganizationUnitIdByUserReq = async () => {
  try {
    const res = await httpService.request<
      TBaseResponse<{
        items: TOrganizationUnitUserItem[];
      }>
    >({
      url: '/api/services/app/OrganizationUnit/GetOrganizationUnitIdByUser',
      method: 'GET',
    });
    return res.result;
  } catch (err) {
    return;
  }
};

export const getOrganizationUnitUsers = async (id: number | undefined) => {
  try {
    const res = await httpService.request<
      TBaseResponse<{
        items: TGetOrganizationUnitUsers[];
      }>
    >({
      url: `/api/services/app/OrganizationUnit/GetOrganizationUnitUsers?Type=4&Id=${id}`,
      method: 'GET',
    });

    return res.result;
  } catch (err) {
    return;
  }
};
export const getOrganizationUnit = async () => {
  try {
    const res = await httpService.request<
      TBaseResponse<{
        items: TGetOrganizationUnit[];
      }>
    >({
      url: `/api/services/app/OrganizationUnit/GetOrganizationUnits`,
      method: 'GET',
      params: {
        MaxResultCount: 1000,
      },
    });

    return res.result;
  } catch (err) {
    return;
  }
};
