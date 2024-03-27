import {
  AddCircleRounded,
  ArrowDropDownRounded,
  FilterAltTwoTone,
} from '@mui/icons-material';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';
import * as yup from 'yup';

import { StyledPageHeader } from '@/base/base-crud-content';
import BaseCrudFormModal, {
  TBaseCrudFormModalProps,
} from '@/base/base-crud-form-modal';
import { TCrudFormField } from '@/base/crud-form-field.type';
import { NOTIF_TYPES_ARRAY } from '@/configs/notification-type.config';
import useAbp from '@/hooks/use-abp';
import usePopover from '@/hooks/use-popover';
import useTranslation from '@/hooks/use-translation';
import tenantSettingService from '@/services/tenant-settings/tenant-setting.service';

import { CONFIG_TYPE } from '../_services/image-supervise.model';
import imageSuperviseService from '../_services/image-supervise.services';
import FilterPopover from './filter-image';

type THeaderCommon = {
  setData: any;
};
const HeaderCommon = (props: THeaderCommon) => {
  const { setData } = props;
  const { t } = useTranslation();
  const { getCurLoginInfoQuery } = useAbp();
  const filterPopover = usePopover();
  const queryClient = useQueryClient();

  const { data: listTenant } = useQuery({
    queryKey: ['tenant/image-management'],
    queryFn: () => tenantSettingService.getAllTenant(),
  });

  const [formProps, setFormProps] = useState<Partial<TBaseCrudFormModalProps>>({
    open: false,
    onClose: () => setFormProps((data: any) => ({ ...data, open: false })),
  });

  const onCloseFormModal = useCallback(() => {
    setFormProps((data: any) => ({ ...data, open: false }));
  }, []);

  const createFields = useMemo<TCrudFormField[]>(
    () => [
      {
        name: 'imageUrl',
        label: t('Ảnh'),
        type: 'uploadimage',
        required: true,
      },
      {
        name: 'type',
        label: t('Loại ứng dụng'),
        type: 'autocomplete',
        required: true,
        options: CONFIG_TYPE,
        colSpan: 6,
      },
      {
        name: 'actions',
        label: t('Hành động'),
        type: 'autocomplete',
        options: NOTIF_TYPES_ARRAY,
        colSpan: 6,
      },
      {
        name: 'data',
        label: t('Dữ liệu điều hướng'),
        type: 'text',
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

  const createSchema = useMemo(
    () =>
      yup.object().shape({
        type: yup.string().required(t('Trường này là bắt buộc')),
      }),
    [t],
  );

  return (
    <StyledPageHeader sx={{ mx: 2 }}>
      <Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          marginBottom={2}
        >
          <Typography variant="h5" component="h1">
            {'Quản lý hình ảnh'}
          </Typography>
        </Stack>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={1}
        >
          <Button
            variant="contained"
            startIcon={<AddCircleRounded />}
            sx={{
              pl: 2.2,
            }}
            onClick={() => {
              setFormProps({
                open: true,
                onClose: onCloseFormModal,
                name: 'addImage',
                mode: 'create',
                title: `${t('Tạo hình ảnh mới')}`,
                fields: createFields,
                service: imageSuperviseService,
                schema: createSchema,
                createPath: '/Create',
                refetchData: () =>
                  queryClient.refetchQueries({
                    queryKey: ['image-supervise-get-list'],
                  }),
              });
            }}
          >
            {t('Thêm')}
          </Button>

          <Box sx={{}}>
            <Button
              ref={filterPopover.anchorRef}
              variant="outlined"
              startIcon={<FilterAltTwoTone />}
              endIcon={<ArrowDropDownRounded sx={{ width: 26, height: 26 }} />}
              onClick={filterPopover.handleOpen}
              sx={{
                fontSize: 15,
                height: 42.5,
                justifyContent: 'stretch',
                width: 122,
                '.MuiButton-endIcon': {
                  ml: 'auto',
                  mr: -1.6,
                },
              }}
            >
              {t('Lọc')}
            </Button>
            <FilterPopover
              anchorEl={filterPopover.anchorRef.current}
              open={filterPopover.open}
              onClose={() => {
                filterPopover.handleClose();
              }}
              setData={setData}
            />
          </Box>
        </Stack>
      </Stack>
      <BaseCrudFormModal {...(formProps as any)} rowKey="key-task" />
    </StyledPageHeader>
  );
};

export default HeaderCommon;
