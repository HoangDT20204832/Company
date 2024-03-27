import { useQuery } from '@tanstack/react-query';

import { TGetAllQuery } from '@/base/base-crud-service';

import { IApartmentStatus } from './apartment-status.model';
import apartmentStatusService from './apartment-status.service';

const useGetAllApartmentStatuses = (filter?: TGetAllQuery) => {
  const params = filter || { maxResultCount: 1000 };

  const query = useQuery({
    queryKey: ['getAllApartmentStatuses', params],
    queryFn: () =>
      apartmentStatusService.getAll<IApartmentStatus>(
        params,
        '/GetAllApartmentStatus',
      ),
    staleTime: Infinity,
  });

  return query;
};

export default useGetAllApartmentStatuses;
