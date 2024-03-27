import { BaseCrudService } from '@/base/base-crud-service';

class ApartmentStatusService extends BaseCrudService {
  constructor() {
    super('/api/services/app/ApartmentStatus');
  }
}

const apartmentStatusService = new ApartmentStatusService();

export default apartmentStatusService;
