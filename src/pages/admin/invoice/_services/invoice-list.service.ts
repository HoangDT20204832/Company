import { BaseCrudService } from '@/base/base-crud-service';
import { httpService } from '@/base/http-service';
import { API_ENDPOINT } from '@/configs/constant.config';
import axios from 'axios';

export class InvoiceListService extends BaseCrudService {
  constructor() {
    super('/erp/api/services/app/Invoice');
  }

  public async getAllInvoice<T>() {
  //   const res = await httpService.request<{ data: any; success: boolean }>({
  //     method: 'GET',
  //     url: '/erp/api/services/app/CalculationUnit/GetAll',
  //   });
  //   return res;
  // }
  const res = await axios.get(`${API_ENDPOINT}${this.basePath}/GetAll`)

  return res
}
}

const invoiceListService = new InvoiceListService();

export default invoiceListService;
