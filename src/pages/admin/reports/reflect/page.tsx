import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { StyledPageHeader } from '@/base/base-crud-content';
import BaseFormInput from '@/base/base-form-input';
import { TCrudFormField } from '@/base/crud-form-field.type';
import useTranslation from '@/hooks/use-translation';
import useGetAllBuildings from '@/services/buildings/use-get-all-buildings';
import useGetAllUrbans from '@/services/urban/use-get-all-urbans';
import { convertFieldsToValues } from '@/services/utils';

import ChartFeedbackCitizen from './_components/chart-feedback-citizen';
import ChartGeneralCitizen from './_components/chart-general-citizen';
import ChartProcessingTimeCitizen from './_components/chart-processing-time-citizen';
import ChartRankingCitizen from './_components/chart-ranking-citizen';
import reflectService from './_services/reflect.service';

const ReflectPage = () => {
  const { t } = useTranslation();
  const [urbanId, setUrbanId] = useState<number>();

  const { data: urbans } = useGetAllUrbans();

  const { data: buildingQuery } = useGetAllBuildings({
    urbanId: urbanId ? urbanId : '',
    pageSize: 1000,
  });
  const filterFields = useMemo<TCrudFormField[]>(
    () => [
      {
        name: 'urbanId',
        label: t('Khu đô thị'),
        type: 'autocomplete',
        colSpan: 3,
        options: urbans?.data?.map((item) => ({
          label: item.displayName,
          value: item.id,
        })),
        onChange: (v: number) => {
          setUrbanId(v);
        },
      },
      {
        name: 'buildingId',
        label: t('Tòa nhà'),
        type: 'autocomplete',
        colSpan: 3,
        options: buildingQuery?.data?.map((item) => ({
          label: item.displayName,
          value: item.id,
        })),
      },
      {
        name: 'Month',
        label: t('Tháng'),
        type: 'autocomplete',
        colSpan: 3,
        defaultValue: new Date().getMonth() + 1,
        options: [
          { label: 'Tháng 1', value: 1 },
          { label: 'Tháng 2', value: 2 },
          { label: 'Tháng 3', value: 3 },
          { label: 'Tháng 4', value: 4 },
          { label: 'Tháng 5', value: 5 },
          { label: 'Tháng 6', value: 6 },
          { label: 'Tháng 7', value: 7 },
          { label: 'Tháng 8', value: 8 },
          { label: 'Tháng 9', value: 9 },
          { label: 'Tháng 10', value: 10 },
          { label: 'Tháng 11', value: 11 },
          { label: 'Tháng 12', value: 12 },
        ],
      },
      {
        name: 'Year',
        label: t('Năm'),
        type: 'autocomplete',
        colSpan: 3,
        defaultValue: new Date().getFullYear(),
        options: reflectService.getYear().map((x: any) => ({
          label: x.label.toString(),
          value: x.value,
        })),
      },
    ],
    [buildingQuery?.data, t, urbans?.data],
  );
  const [params, setParams] = useState({
    ...convertFieldsToValues(filterFields || []),
  });
  let { ...filter } = params;
  filter = filter || convertFieldsToValues(filterFields || []);
  const { handleSubmit, control } = useForm({
    defaultValues: filter,
  });
  const onSubmit = (data: any) => {
    setParams({
      ...params,
      ...data,
    });
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} px={2} py={2}>
        <Grid xs={12} xl={12} lg={12} md={12} sm={12} item>
          <Stack
            direction="row"
            justifyContent="space-between"
            spacing={4}
            sx={{ mb: 0.8 }}
          >
            <Stack spacing={1}>
              <Typography variant="h5" component="h1">
                {t('Thống kê phản ánh')}
              </Typography>
            </Stack>
          </Stack>
          <StyledPageHeader>
            <div className="bottom-wrapper">
              {filterFields && (
                <>
                  <Box
                    component="form"
                    width={'100%'}
                    mt={1}
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <Grid container spacing={1} mb={2}>
                      {filterFields.map((field, index) => (
                        <Grid
                          key={`${index}`}
                          xs={field.colSpan || 12}
                          sx={{ padding: '10px' }}
                        >
                          {BaseFormInput({
                            field,
                            control,
                          })}
                        </Grid>
                      ))}
                    </Grid>

                    <Stack direction="row" justifyContent="end" spacing={1}>
                      <Button type="submit" variant="contained">
                        {t('Thống kê')}
                      </Button>
                    </Stack>
                  </Box>
                </>
              )}
            </div>
          </StyledPageHeader>
        </Grid>
      </Grid>
      <Grid container spacing={2} px={2} mb={2}>
        <Grid xs={12} xl={6} lg={6} md={12} sm={12} item>
          <ChartFeedbackCitizen
            month={filter.Month}
            year={filter.Year}
            urbanId={filter.urbanId}
            buildingId={filter.buildingId}
          />
        </Grid>
        <Grid xs={12} xl={6} lg={6} md={12} sm={12} item>
          <ChartProcessingTimeCitizen
            month={filter.Month}
            year={filter.Year}
            urbanId={filter.urbanId}
            buildingId={filter.buildingId}
          />
        </Grid>
        <Grid xs={12} xl={6} lg={6} md={6} sm={6} item>
          <ChartRankingCitizen
            month={filter.Month}
            year={filter.Year}
            urbanId={filter.urbanId}
            buildingId={filter.buildingId}
          />
        </Grid>
        <Grid xs={12} xl={6} lg={6} md={12} sm={12} item>
          <ChartGeneralCitizen
            month={filter.Month}
            year={filter.Year}
            urbanId={filter.urbanId}
            buildingId={filter.buildingId}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReflectPage;
