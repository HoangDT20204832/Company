import { useQuery } from '@tanstack/react-query';

import tenantService from './tenant.service';

const useGetAllTenants = () => {
  const query = useQuery({
    queryKey: ['getAllTenants'],
    queryFn: () => tenantService.getAllTenant(),
    staleTime: Infinity,
  });

  return query;
};

export default useGetAllTenants;
