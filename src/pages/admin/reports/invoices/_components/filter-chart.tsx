/* eslint-disable react/jsx-key */
import { Box, Button, Unstable_Grid2 as Grid, Stack } from '@mui/material';
import { Popover } from '@mui/material';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import BaseFormInput from '@/base/base-form-input';
import { TCrudFormField } from '@/base/crud-form-field.type';
import { RhfDevTool } from '@/components/custom-rhf-devtool';
import useTranslation from '@/hooks/use-translation';
import useGetAllBuildings from '@/services/buildings/use-get-all-buildings';
import useGetAllUrbans from '@/services/urban/use-get-all-urbans';
import { resetFields } from '@/services/utils';

import { LIST_INVOICE } from '../_service/statistical-invoices.model';

type TFilterPopoverProps = {
  anchorEl: any;
  open: boolean;
  onClose: () => void;
  setData: any;
};

const FilterPopover = (props: TFilterPopoverProps) => {
  const { anchorEl, onClose, open, setData } = props;

  const { t } = useTranslation();
  const [selectedUrbanId, setSelectedUrbanId] = useState<number>();

  const { data: urbans } = useGetAllUrbans();
  const { data: buildings } = useGetAllBuildings({
    pageSize: 1000,
    urbanId: selectedUrbanId ? selectedUrbanId : '',
  });

  const { handleSubmit, control, reset } = useForm();

  const onSubmit = (data: any) => {
    setData(data);
    onClose();
  };

  const filterFields = useMemo<TCrudFormField[]>(
    () => [
      {
        name: 'urbanId',
        label: t('Thuộc khu đô thị'),
        type: 'autocomplete',
        options: urbans?.data?.map((item) => ({
          label: item.displayName,
          value: item.id,
        })),
        colSpan: 6,
        onChange: (v: number) => setSelectedUrbanId(v),
      },
      {
        name: 'buildingId',
        label: t('Thuộc tòa nhà'),
        type: 'autocomplete',
        options: buildings?.data?.map((item) => ({
          label: item.displayName,
          value: item.id,
        })),
        colSpan: 6,
      },
      {
        name: 'type',
        label: t('Loại hóa đơn'),
        type: 'select',
        options: LIST_INVOICE,
      },
      {
        type: 'empty',
        colSpan: 6,
      },
      {
        name: 'fromDay',
        label: t('Từ ngày'),
        type: 'date',
        colSpan: 6,
      },
      {
        name: 'toDay',
        label: t('Đến ngày'),
        type: 'date',
        colSpan: 6,
      },
    ],
    [buildings?.data, t, urbans?.data],
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
