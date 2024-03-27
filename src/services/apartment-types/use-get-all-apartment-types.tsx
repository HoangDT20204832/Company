import { useQuery } from '@tanstack/react-query';

import { TGetAllQuery } from '@/base/base-crud-service';

import { IApartmentType } from './apartment-type.model';
import apartmentTypeService from './apartment-type.service';

const useGetAllApartmentTypes = (filter?: TGetAllQuery) => {
  const params = filter || { maxResultCount: 1000 };

  const query = useQuery({
    queryKey: ['getAllApartmentTypes', params],
    queryFn: () =>
      apartmentTypeService.getAll<IApartmentType>(
        params,
        '/GetAllApartmentType',
      ),
    staleTime: Infinity,
  });

  return query;
};

export default useGetAllApartmentTypes;
