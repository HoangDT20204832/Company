import { Autocomplete, Button, Chip, Stack, TextField } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import useTranslation from '@/hooks/use-translation';
import { formatDate } from '@/services/utils-date';

const TYPE_SCHEDULERS = [
  {
    label: 'Chọn thời điểm',
    value: 1,
  },
  {
    label: 'Lặp theo giờ',
    value: 2,
  },
  {
    label: 'Lặp theo ngày',
    value: 3,
  },
  {
    label: 'Lặp theo tháng',
    value: 4,
  },
];

const SelectSchedulerNotification = () => {
  const { t } = useTranslation();
  const { watch, setValue } = useFormContext();

  const isScheduler = useWatch({
    name: 'isScheduler',
  });

  const typeScheduler = useWatch({
    name: 'typeScheduler',
  });

  const listTimes: any[] = useWatch({
    name: 'listTimes',
    defaultValue: [],
  });

  useEffect(() => {
    if (!isScheduler) {
      setValue('typeScheduler', undefined);
      setValue('chooseTime', undefined);
      setValue('time', undefined);
      setValue('listTimes', undefined);
    }
  }, [isScheduler, setValue]);

  return isScheduler ? (
    <Grid container direction="row" xs={12} spacing={2}>
      <Grid xs={6}>
        <Autocomplete
          fullWidth
          options={TYPE_SCHEDULERS}
          renderInput={(params) => (
            <TextField label={t('typeScheduler')} required={true} {...params} />
          )}
          value={watch('typeScheduler')}
          onChange={(_, data) => {
            setValue('typeScheduler', data?.value);
          }}
        />
      </Grid>
      <Grid xs={6}></Grid>
      {typeScheduler !== 1 && typeScheduler > 0 && (
        <Grid container direction="row" xs={12} spacing={2}>
          <Grid xs={6}>
            <TextField
              label={t('Thời gian')}
              fullWidth
              type="datetime-local"
              value={watch('time')}
              onChange={(e) => {
                setValue('time', e.target.value);
              }}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid xs={6}>
            <TextField
              label={t('dueDate')}
              fullWidth
              type="datetime-local"
              value={watch('dueDate')}
              onChange={(e) => {
                setValue('dueDate', e.target.value);
              }}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>
      )}
      {typeScheduler === 1 && (
        <Grid container direction="row" xs={12} spacing={2}>
          <Grid container direction="row" xs={12}>
            <Stack direction="row" m={1}>
              {listTimes.map((time, index) => (
                <Chip
                  key={`${time}-${index}`}
                  label={formatDate(time)}
                  variant="outlined"
                  onDelete={() => {
                    listTimes.splice(index, 1);
                    setValue('listTimes', listTimes);
                  }}
                />
              ))}
            </Stack>
          </Grid>

          <Grid container direction="row" xs={6} mt={1}>
            <TextField
              label={t('Chọn thời gian')}
              fullWidth
              type="datetime-local"
              value={watch('chooseTime')}
              onChange={(e) => {
                setValue('chooseTime', e.target.value);
              }}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid container direction="row" xs={6} mt={1}>
            <Button
              onClick={() => {
                if (watch('chooseTime')) {
                  const times = [...listTimes];
                  times.push(watch('chooseTime'));
                  setValue('listTimes', times);
                }
              }}
            >
              {t('Thêm')}
            </Button>
          </Grid>
        </Grid>
      )}
    </Grid>
  ) : null;
};

export default SelectSchedulerNotification;
