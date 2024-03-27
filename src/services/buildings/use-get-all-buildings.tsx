import { useQuery } from '@tanstack/react-query';

import { TGetAllQuery } from '@/base/base-crud-service';

import buildingService from './building.service';

const useGetAllBuildings = (filter?: TGetAllQuery, path?: string) => {
  const params = filter || { maxResultCount: 1000 };

  const query = useQuery({
    queryKey: ['getAllBuildings', params, path],
    queryFn: () => buildingService.getAllBuildings(params, path),
    staleTime: Infinity,
    enabled: !!params.urbanId,
  });

  return query;
};

export default useGetAllBuildings;
