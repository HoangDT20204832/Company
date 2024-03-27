import { useQuery } from '@tanstack/react-query';

import { TGetAllQuery } from '@/base/base-crud-service';

import urbanService from './urban.service';

const useGetAllUrbans = (filter?: TGetAllQuery, path?: string) => {
  const params = filter || { maxResultCount: 1000 };

  const query = useQuery({
    queryKey: ['getAllUrbans', params, path],
    queryFn: () => urbanService.getAllUrbans(params, path),
    staleTime: Infinity,
  });

  return query;
};

export default useGetAllUrbans;
