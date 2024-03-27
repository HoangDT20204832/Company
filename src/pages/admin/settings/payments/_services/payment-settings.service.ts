import { BaseCrudService } from '@/base/base-crud-service';

class PaymentSettingsService extends BaseCrudService {
  constructor() {
    super('/api/services/app/Payment');
  }
}

const paymentSettingsService = new PaymentSettingsService();

export default paymentSettingsService;
