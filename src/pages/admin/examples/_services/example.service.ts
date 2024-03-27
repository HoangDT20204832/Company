import { BaseCrudService } from '@/base/base-crud-service';

export class TenantService extends BaseCrudService {
  constructor() {
    super('/api/services/app/Tenant');
  }
}
