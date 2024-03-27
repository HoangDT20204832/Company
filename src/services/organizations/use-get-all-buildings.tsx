import { useQuery } from '@tanstack/react-query';

import notificationService from '../notifications/notifications.service';

export const useGetAllBuildings = (urbanId?: number) => {
  return useQuery({
    queryKey: ['/GetAllBuildings', urbanId],
    queryFn: () =>
      notificationService.getAllBuilding({
        urbanId,
      }),
    enabled: !!urbanId,
  });
};
