import axios from 'axios';
import Cookies from 'js-cookie';

import { IBaseHttpResponse } from '@/base/base.model';
import { httpService } from '@/base/http-service';
import { API_ENDPOINT } from '@/configs/constant.config';

import {
  IIsTenantAvailableResult,
  ILoginInput,
  ILoginResult,
  IRefreshTokenResult,
  IUserInfo,
} from './auth.model';

class AuthService {
  async login(input: ILoginInput) {
    const response = await axios.post<IBaseHttpResponse<ILoginResult>>(
      `${API_ENDPOINT}/api/TokenAuth/Authenticate`,
      input,
    );

    const data = response.data.result;

    if (data.tenantId) {
      Cookies.set('tenantId', data.tenantId.toString());
    }
    Cookies.set('accessToken', data.accessToken);
    Cookies.set('encryptedAccessToken', data.encryptedAccessToken);
    Cookies.set('refreshToken', data.refreshToken);

    if (data.tenantId) {
      Cookies.set('tenantId', data.tenantId.toString());
    }

    return this.getUserInfo();
  }

  async getUserInfo() {
    const accessToken = Cookies.get('accessToken');
    if (!accessToken) {
      throw new Error('Access token is required');
    }

    const response = await httpService.request<IBaseHttpResponse<IUserInfo>>({
      url: '/api/services/app/UserDefault/GetDetail',
      method: 'GET',
    });

    return response.result;
  }

  async refreshToken() {
    try {
      const refreshToken = Cookies.get('refreshToken');

      if (!refreshToken) {
        return false;
      }

      const response = await axios.post<IBaseHttpResponse<IRefreshTokenResult>>(
        `${API_ENDPOINT}/api/TokenAuth/RefreshToken`,
        null,
        { params: { refreshToken } },
      );

      const data = response.data.result;

      Cookies.set('accessToken', data.accessToken);
      Cookies.set('encryptedAccessToken', data.encryptedAccessToken);

      return true;
    } catch (error) {
      Cookies.remove('accessToken');
      Cookies.remove('encryptedAccessToken');
      Cookies.remove('refreshToken');
      Cookies.remove('tenantId');
      window.location.href = '/auth/login';
      return false;
    }
  }

  async logout() {
    try {
      const response = await httpService.request<IBaseHttpResponse<null>>({
        url: '/api/TokenAuth/Logout',
        method: 'GET',
      });
      return response.success;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      Cookies.remove('accessToken');
      Cookies.remove('encryptedAccessToken');
      Cookies.remove('refreshToken');
      Cookies.remove('tenantId');
      window.location.href = '/auth/login';
    }
  }

  /**
   * /api/services/app/Account/IsTenantAvailable
   */
  async isTenantAvailable({ name }: { name?: string }) {
    const response = await httpService.request<
      IBaseHttpResponse<IIsTenantAvailableResult>
    >({
      url: '/api/services/app/TenantErp/IsTenantAvailable',
      method: 'POST',
      data: { tenancyName: name },
    });
    return response.result;
  }
}

const authService = new AuthService();

export default authService;
