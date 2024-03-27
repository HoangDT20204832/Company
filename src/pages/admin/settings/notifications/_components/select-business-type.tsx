import { Autocomplete, TextField } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import useTranslation from '@/hooks/use-translation';
import notificationService from '@/services/notifications/notifications.service';

const SelectBusinessType = () => {
  const { t } = useTranslation();
  const { watch, setValue } = useFormContext();
  const [providers, setProviders] = useState<any[]>([]);

  const isProvider = useWatch({
    name: 'isProvider',
  });

  useEffect(() => {
    if (!isProvider) {
      setValue('businessType', undefined);
    }
  }, [isProvider, setValue]);

  useQuery({
    queryKey: ['notifications/providers', watch('businessType')],
    queryFn: () =>
      notificationService.getAllProvider({
        type: watch('businessType'),
      }),
    onSuccess: (data) => {
      setProviders(
        data.data.map((provider) => ({
          label: provider.name,
          value: {
            id: provider.id,
            userId: provider.userId,
          },
        })),
      );
    },
  });

  return isProvider ? (
    <Grid container rowSpacing={2}>
      <Grid xs={8}>
        <Autocomplete
          fullWidth
          options={JSON.parse(t('supplierType'))}
          renderInput={(params) => (
            <TextField label={t('businessType')} required={true} {...params} />
          )}
          value={watch('businessType')}
          onChange={(_, data) => {
            setValue('businessType', data?.value);
          }}
        />
      </Grid>

      <Grid xs={12}>
        <Autocomplete
          fullWidth
          options={providers}
          renderInput={(params) => (
            <TextField label={t('Chọn cửa hàng')} required={true} {...params} />
          )}
          onChange={(_, data) => {
            setValue(
              'providerUserIds',
              data?.map((item) => item.value.userId),
            );
          }}
          multiple
        />
      </Grid>
    </Grid>
  ) : null;
};

export default SelectBusinessType;
