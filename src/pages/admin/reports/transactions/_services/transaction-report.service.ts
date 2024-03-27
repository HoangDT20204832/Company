import { BaseCrudService, TGetAllQuery } from '@/base/base-crud-service';
import { IPaginatedItems } from '@/base/base.model';
import { httpService } from '@/base/http-service';

export const DeliveryProvider = [
  { label: 'Giao hàng nhanh', value: 1, color: 'success' },
];
export const PaymentMethod = [
  { label: 'COD', value: 1, color: 'default' },
  { label: 'Momo', value: 2, color: 'error' },
  { label: 'Onepay', value: 3, color: 'info' },
];

class TransactionReportService extends BaseCrudService {
  constructor() {
    super('');
  }

  public async getAll<T>(
    query?: TGetAllQuery | undefined,
  ): Promise<IPaginatedItems<T>> {
    return await httpService.request({
      url: '/business/api/services/app/OrderStatistics/GetList',
      method: 'GET',
      params: query,
    });
  }
}

const transactionReportService = new TransactionReportService();

export default transactionReportService;
