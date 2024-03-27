import { TBaseResponse } from '@/base/base-crud-service';
import { httpService } from '@/base/http-service';
import { IUserInfo } from '@/services/auth/auth.model';

class MyAccountService {
  public async uploadAvatar(file: File, authData?: IUserInfo) {
    const response = await httpService.uploadFile({
      file,
    });

    if (!response.result) {
      throw new Error('Upload file error');
    }

    await this.updateInfo({
      ...authData,
      imageUrl: response.result.data,
    });
  }

  public async updateInfo(data: Partial<IUserInfo>): Promise<void> {
    await httpService.request<TBaseResponse<void>>({
      method: 'PUT',
      url: '/api/services/app/UserDefault/Update',
      data,
    });
  }

  public async changePassword(data: {
    currentPassword: string;
    newPassword: string;
  }): Promise<void> {
    await httpService.request<TBaseResponse<void>>({
      method: 'post',
      url: '/api/services/app/UserDefault/ChangePassword',
      data,
    });
  }
}

const myAccountService = new MyAccountService();

export default myAccountService;
