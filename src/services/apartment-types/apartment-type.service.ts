import { BaseCrudService } from '@/base/base-crud-service';

class ApartmentTypeService extends BaseCrudService {
  constructor() {
    super('/api/services/app/ApartmentType');
  }
}

const apartmentTypeService = new ApartmentTypeService();

export default apartmentTypeService;
