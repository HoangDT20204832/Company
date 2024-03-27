import { Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import BaseFormInput, { TBaseInputProps } from '@/base/base-form-input';
import useTranslation from '@/hooks/use-translation';
import { vauService } from '@/services/common/vau.service';

import { TBaseFormMode } from './base.model';

const AdministrativeUnitInput = (
  props: TBaseInputProps<string> & {
    mode?: TBaseFormMode;
    beautyView?: boolean;
  },
) => {
  const { readOnly } = props;

  const { t } = useTranslation();

  const { watch, control } = useFormContext();

  const [selectedProvince, setSelectedProvince] = useState<string>(
    watch('provinceCode') || '',
  );
  const [selectedDistrict, setSelectedDistrict] = useState<string>(
    watch('districtCode') || '',
  );

  const provincesQuery = useQuery({
    queryFn: () => vauService.getProvinces(),
    queryKey: ['getProvinces'],
    cacheTime: Infinity,
    staleTime: Infinity,
  });
  const districtsQuery = useQuery({
    enabled: !!watch('provinceCode'),
    queryKey: ['getDistricts', selectedProvince],
    queryFn: () => vauService.getDistricts(watch('provinceCode')),
  });
  const wardsQuery = useQuery({
    enabled: !!watch('districtCode'),
    queryKey: ['getWards', selectedDistrict],
    queryFn: () => vauService.getWards(watch('districtCode')),
  });

  if (props.mode === 'view' && props.beautyView) {
    return (
      <Grid container spacing={2}>
        <Grid xs={12} md={4}>
          <Stack>
            <Typography variant="body2" color="GrayText">
              {t('Tỉnh/Thành phố')}
            </Typography>
            <Typography variant="subtitle1">
              {
                provincesQuery.data?.find(
                  (item) => item.code === watch('provinceCode'),
                )?.name
              }
            </Typography>
          </Stack>
        </Grid>

        <Grid xs={12} md={4}>
          <Stack>
            <Typography variant="body2" color="GrayText">
              {t('Quận/Huyện')}
            </Typography>
            <Typography variant="subtitle1">
              {
                districtsQuery.data?.find(
                  (item) => item.code === watch('districtCode'),
                )?.name
              }
            </Typography>
          </Stack>
        </Grid>

        <Grid xs={12} md={4}>
          <Stack>
            <Typography variant="body2" color="GrayText">
              {t('Phường/Xã')}
            </Typography>
            <Typography variant="subtitle1">
              {
                wardsQuery.data?.find((item) => item.code === watch('wardCode'))
                  ?.name
              }
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container spacing={2}>
      <Grid xs={12} md={4}>
        <BaseFormInput
          control={control}
          field={{
            readOnly,
            name: 'provinceCode',
            label: t('Tỉnh/Thành phố'),
            type: 'autocomplete',
            onChange: (e) => {
              setSelectedProvince(e);
            },
            options: provincesQuery.data?.map((item) => ({
              label: item.name,
              value: item.code,
            })),
          }}
        />
      </Grid>

      <Grid xs={12} md={4}>
        <BaseFormInput
          control={control}
          field={{
            readOnly,
            name: 'districtCode',
            label: t('Quận/Huyện'),
            type: 'autocomplete',
            onChange: (e) => {
              setSelectedDistrict(e);
            },
            options: districtsQuery.data?.map((item) => ({
              label: item.name,
              value: item.code,
            })),
          }}
        />
      </Grid>

      <Grid xs={12} md={4}>
        <BaseFormInput
          control={control}
          field={{
            readOnly,
            name: 'wardCode',
            label: t('Phường/Xã'),
            type: 'autocomplete',
            options: wardsQuery.data?.map((item) => ({
              label: item.name,
              value: item.code,
            })),
          }}
        />
      </Grid>
    </Grid>
  );
};

export default AdministrativeUnitInput;
