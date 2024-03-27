/* eslint-disable react/jsx-key */
import { Box, Button, Unstable_Grid2 as Grid, Stack } from '@mui/material';
import { Popover } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';

import BaseFormInput from '@/base/base-form-input';
import { TCrudFormField } from '@/base/crud-form-field.type';
import { RhfDevTool } from '@/components/custom-rhf-devtool';
import useAbp from '@/hooks/use-abp';
import useTranslation from '@/hooks/use-translation';
import tenantSettingService from '@/services/tenant-settings/tenant-setting.service';
import { resetFields } from '@/services/utils';

import { CONFIG_TYPE } from '../_services/image-supervise.model';

type TFilterPopoverProps = {
  anchorEl: any;
  open: boolean;
  onClose: () => void;
  setData: any;
};

const FilterPopover = (props: TFilterPopoverProps) => {
  const { anchorEl, onClose, open, setData } = props;

  const { t } = useTranslation();
  const { getCurLoginInfoQuery } = useAbp();

  const { data: listTenant } = useQuery({
    queryKey: ['tenant/image-management'],
    queryFn: () => tenantSettingService.getAllTenant(),
  });

  const { handleSubmit, control, reset } = useForm();

  const onSubmit = (data: any) => {
    setData(data);
    onClose();
  };

  const filterFields = useMemo<TCrudFormField[]>(
    () => [
      {
        name: 'type',
        label: t('Loại ứng dụng'),
        type: 'autocomplete',
        options: CONFIG_TYPE,
        colSpan: 6,
      },
      {
        name: 'tenantId',
        label: t('Loại tenant'),
        type: 'autocomplete',
        options: listTenant?.items
          ? listTenant?.items?.map((item) => ({
              label: item.name,
              value: item.id,
            }))
          : [],
        colSpan: 6,
        noRender: !!getCurLoginInfoQuery?.data?.tenant?.id,
      },
      {
        name: 'scope',
        label: t('Phạm vi'),
        type: 'select',
        options: [
          {
            value: 0,
            label: t('Global'),
          },
          {
            value: 1,
            label: t('Tenant'),
          },
        ],
        defaultValue: 1,
        noRender: !!getCurLoginInfoQuery?.data?.tenant?.id,
        colSpan: 6,
      },
    ],
    [getCurLoginInfoQuery?.data?.tenant?.id, listTenant?.items, t],
  );

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      onClose={onClose}
      open={open}
      slotProps={{ paper: { elevation: 1 } }}
    >
      <Box sx={{ p: 2, minWidth: 600 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={1} mb={2}>
            {filterFields.map((field) => (
              <Grid xs={6}>
                {BaseFormInput({
                  field,
                  control,
                })}
              </Grid>
            ))}
          </Grid>

          <Stack direction="row" justifyContent="end" spacing={1}>
            <Button
              color="inherit"
              onClick={() => {
                reset(resetFields(filterFields), {
                  keepValues: false,
                  keepDirty: false,
                  keepDefaultValues: false,
                });
                setData({});
                onClose();
              }}
            >
              {t('Bỏ lọc')}
            </Button>

            <Button type="submit" variant="contained">
              {t('Lưu')}
            </Button>
          </Stack>
        </form>

        <RhfDevTool control={control} />
      </Box>
    </Popover>
  );
};

export default FilterPopover;
