import { useQuery } from '@tanstack/react-query';

import { TGetAllQuery } from '@/base/base-crud-service';

import { IApartment } from './apartment.model';
import apartmentService from './apartment.service';

const useGetAllApartments = (filter?: TGetAllQuery) => {
  const params = filter || { maxResultCount: 1000 };

  const query = useQuery({
    queryKey: ['getAllApartments', params],
    queryFn: () =>
      apartmentService.getAll<IApartment>(params, '/GetAllApartment'),
    staleTime: Infinity,
  });

  return query;
};

export default useGetAllApartments;
