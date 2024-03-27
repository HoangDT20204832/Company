import { useQuery } from '@tanstack/react-query';

import notificationService from '../notifications/notifications.service';

export const useGetAllUrbans = (tenantId?: number) => {
  return useQuery({
    queryKey: ['/GetAllUrbans', tenantId],
    queryFn: () =>
      notificationService.getAllUrban({
        tenantId,
      }),
    enabled: !!tenantId,
  });
};
