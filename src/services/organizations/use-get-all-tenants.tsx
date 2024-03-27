import { useQuery } from '@tanstack/react-query';

import notificationService from '../notifications/notifications.service';

export const useGetAllTenants = () => {
  return useQuery({
    queryKey: ['/GetAllTenants'],
    queryFn: () => notificationService.getAllTenant(),
  });
};
