import { useQuery } from '@tanstack/react-query';

import tenantService from '@/services/tenants/tenant.service';

export const useGetTenants = () => {
  const { data: getAllTenantsQuery } = useQuery({
    queryKey: ['tenant/getAll'],
    queryFn: () =>
      tenantService.getAll<any>({
        maxResultCount: 1000,
      }),
  });

  return {
    getAllTenantsQuery,
  };
};
