import { BaseCrudService } from '@/base/base-crud-service';
import { httpService } from '@/base/http-service';

export class InventoryListService extends BaseCrudService {
  constructor() {
    super('/erp/api/services/app/Storage');
  }

  public async getCalculationUnit<T>() {
    const res = await httpService.request<{ data: any; success: boolean }>({
      method: 'GET',
      url: '/erp/api/services/app/CalculationUnit/GetAll',
    });
    return res;
  }
}

const inventoryListService = new InventoryListService();

export default inventoryListService;
