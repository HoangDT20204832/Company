import { useQuery } from '@tanstack/react-query';

import tenantSettingService from '@/services/tenant-settings/tenant-setting.service';

export const useParkingPriceType = () => {
  const result = useQuery({
    queryFn: () => tenantSettingService.getParkingPriceType(),
  });

  return {
    parkingPriceType: result.data,
  };
};
