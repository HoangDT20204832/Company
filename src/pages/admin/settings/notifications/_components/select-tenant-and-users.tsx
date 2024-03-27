import { Autocomplete, Checkbox, TextField } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import useTranslation from '@/hooks/use-translation';
import notificationService from '@/services/notifications/notifications.service';

const SelectTenantAndUsers = () => {
  const { watch, setValue } = useFormContext();

  const { t } = useTranslation();
  const [citizens, setCitizens] = useState<any[]>([]);
  const [urbanList, setUrbanList] = useState<any[]>([]);
  const [buildingList, setBuildingList] = useState<any[]>([]);

  const notificationTenantsQuery = useQuery({
    queryKey: ['notifications/tenants'],
    queryFn: () => notificationService.getAllTenant(),
  });

  useQuery({
    queryKey: ['notifications/urbans', watch('tenantId')],
    queryFn: () =>
      notificationService.getAllUrban({
        tenantId: watch('tenantId'),
      }),

    onSuccess: (data) => {
      setUrbanList(
        data.data.map((urban) => ({
          label: urban.displayName,
          value: urban.id,
        })),
      );
    },
    enabled: !!watch('tenantId'),
  });

  useQuery({
    queryKey: ['notifications/buildings', watch('tenantId'), watch('urbanId')],
    queryFn: () =>
      notificationService.getAllBuilding({
        tenantId: watch('tenantId'),
        urbanId: watch('urbanId'),
      }),
    onSuccess: (data) => {
      setBuildingList(
        data.data.map((building) => ({
          label: building.displayName,
          value: building.id,
        })),
      );
    },
    enabled: !!watch('tenantId'),
  });

  const tenantId = useWatch({
    name: 'tenantId',
  });

  const isTenant = useWatch({
    name: 'isTenant',
  });

  useQuery({
    queryKey: ['notifications/citizens', tenantId],
    queryFn: () =>
      notificationService.getAllCitizen({
        tenantId: tenantId,
        urbanId: watch('urbanId'),
        buildingId: watch('buildingId'),
      }),
    onSuccess: (data) => {
      setCitizens(
        data.data.map((citizen) => ({
          label: citizen.fullName,
          value: citizen.id,
        })),
      );
    },
    enabled: !!tenantId,
  });

  useEffect(() => {
    if (!isTenant) {
      setValue('tenantId', undefined);
      setValue('userIds', undefined);
    }
  }, [isTenant, setValue]);

  return isTenant ? (
    <>
      <Grid container direction="row" xs={12} spacing={2}>
        <Grid xs={6}>
          <Autocomplete
            fullWidth
            options={
              notificationTenantsQuery.data?.data?.map((tenant) => ({
                label: tenant.name,
                value: tenant.id,
              })) || []
            }
            renderInput={(params) => (
              <TextField label={t('Tenant')} required={true} {...params} />
            )}
            value={watch('tenantId')}
            onChange={(_, data) => {
              if (data?.value === watch('tenantId')) {
                return;
              }
              setValue('tenantId', data?.value);
              setValue('urbanId', undefined);
              setValue('buildingId', undefined);
              if (!data?.value) {
                setValue('urbanId', undefined);
                setValue('userIds', undefined);
              }
            }}
          />
        </Grid>

        <Grid xs={6}>
          <Autocomplete
            fullWidth
            options={urbanList}
            renderInput={(params) => (
              <TextField label={t('Khu đô thị')} required={true} {...params} />
            )}
            value={
              urbanList?.find((item) => item.value === watch('urbanId')) || ''
            }
            onChange={(_, data) => {
              setValue('urbanId', data?.value);
              if (!data?.value) {
                setValue('userIds', undefined);
              }
            }}
            disabled={!tenantId}
          />
        </Grid>

        <Grid xs={6}>
          <Autocomplete
            fullWidth
            options={buildingList}
            renderInput={(params) => (
              <TextField label={t('Tòa nhà')} required={true} {...params} />
            )}
            onChange={(_, data) => {
              setValue('buildingId', data?.value);
              if (!data?.value) {
                setValue('userIds', undefined);
              }
            }}
            value={
              buildingList?.find(
                (item) => item.value === watch('buildingId'),
              ) || ''
            }
            disabled={!tenantId}
          />
        </Grid>

        <Grid xs={6}>
          <Autocomplete
            fullWidth
            options={citizens}
            renderInput={(params) => (
              <TextField label={t('Người nhận')} required={true} {...params} />
            )}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox checked={selected} />
                {option.label}
              </li>
            )}
            multiple
            value={citizens.filter((item) =>
              watch('userIds')?.includes(item.value),
            )}
            onChange={(_, data) => {
              setValue(
                'userIds',
                data?.map((item) => item.value),
              );
            }}
            readOnly={!tenantId}
            disableCloseOnSelect
          />
        </Grid>
      </Grid>
    </>
  ) : null;
};

export default SelectTenantAndUsers;
