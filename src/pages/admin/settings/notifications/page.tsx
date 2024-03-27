import { Box, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useMemo } from 'react';
import * as yup from 'yup';

import BaseCrudPage from '@/base/base-crud-page';
import { TCrudFormField } from '@/base/crud-form-field.type';
import { NOTIF_TYPES_ARRAY } from '@/configs/notification-type.config';
import useTranslation from '@/hooks/use-translation';
import notificationService from '@/services/notifications/notifications.service';

import SelectBusinessType from './_components/select-business-type';
import SelectSchedulerNotification from './_components/select-scheduler-notification';
import SelectTenantAndUsers from './_components/select-tenant-and-users';

const NotificationsPage = () => {
  const { t } = useTranslation();

  const columns = useMemo<GridColDef[]>(
    () => [
      {
        field: 'id',
        headerName: t('STT'),
        type: 'number',
        editable: false,
        width: 80,
        renderCell: (params) => {
          return params.api.getRowIndexRelativeToVisibleRows(params.row.id) + 1;
        },
      },
      {
        field: 'header',
        headerName: t('header'),
        type: 'string',
        editable: false,
        flex: 1,
        minWidth: 300,
        renderCell: (params) => {
          return params.row.header;
        },
      },
      {
        field: 'content',
        headerName: t('content'),
        type: 'string',
        editable: false,
        width: 800,
        renderCell: (params) => {
          return params.row.content;
        },
      },
      {
        field: 'isCompleted',
        headerName: t('Trạng thái'),
        type: 'boolean',
        width: 150,
        renderCell: (params) => {
          console.log('complete', params);
          return (
            <Box
              sx={{
                width: '100%',
              }}
              py={1}
            >
              <Box>
                <Typography
                  variant="subtitle2"
                  color={params.value === true ? 'forestgreen' : 'orangered'}
                >
                  {params.value === true ? t('Hoàn thành') : t('Đang lên lịch')}
                </Typography>
              </Box>
            </Box>
          );
        },
      },
    ],
    [t],
  );

  const viewFields = useMemo<TCrudFormField[]>(
    () => [
      {
        name: 'notification.notificationName',
        label: t('Tiêu đề thông báo'),
        type: 'text',
        readOnly: true,
        valueProps: { color: 'primary.main', fontWeight: '800' },
        colSpan: 12,
      },
      {
        name: 'notification.data.message',
        label: t('Nội dung thông báo'),
        type: 'textarea',
        readOnly: true,
        colSpan: 12,
      },
      {
        name: 'notification.data.description',
        label: t('Mô tả'),
        type: 'textarea',
        readOnly: true,
        colSpan: 12,
      },
    ],
    [t],
  );

  const createFields = useMemo<TCrudFormField[]>(
    () => [
      {
        name: 'isScheduler',
        label: t('isScheduler'),
        type: 'checkbox',
        colSpan: 12,
      },
      {
        name: 'typeScheduler',
        label: t('typeScheduler'),
        type: 'custom',
        Component: SelectSchedulerNotification,
      },
      {
        name: 'time',
        label: t('time'),
        type: 'custom',
        noRender: true,
      },
      {
        name: 'dueDate',
        label: t('dueDate'),
        type: 'custom',
        noRender: true,
      },
      {
        name: 'listTimes',
        label: t('listTimes'),
        type: 'custom',
        noRender: true,
      },
      {
        name: 'isTenant',
        label: t('isTenant'),
        type: 'checkbox',
        colSpan: 6,
      },
      {
        name: 'tenantId',
        label: t('Tenant'),
        type: 'custom',
        Component: SelectTenantAndUsers,
      },
      {
        name: 'urbanId',
        label: t('Khu đô thị'),
        type: 'custom',
        noRender: true,
      },
      {
        name: 'buildingId',
        label: t('Tòa nhà'),
        type: 'custom',
        noRender: true,
      },
      {
        name: 'userIds',
        label: t('Cư dân'),
        type: 'custom',
        noRender: true,
      },
      {
        name: 'providerUserIds',
        label: '',
        type: 'custom',
        noRender: true,
      },
      {
        name: 'isProvider',
        label: t('isProvider'),
        type: 'checkbox',
        colSpan: 6,
      },
      {
        name: 'businessType',
        label: t('businessType'),
        type: 'custom',
        Component: SelectBusinessType,
        colSpan: 12,
      },
      {
        name: 'isOnlyFirebase',
        label: t('isOnlyFirebase'),
        type: 'checkbox',
        colSpan: 12,
      },
      {
        name: 'header',
        label: t('header'),
        type: 'text',
        colSpan: 12,
        required: true,
      },
      {
        name: 'content',
        label: t('content'),
        type: 'textarea',
        colSpan: 12,
        required: true,
      },
      {
        name: 'typeNotification',
        label: t('typeNotification'),
        type: 'autocomplete',
        options: NOTIF_TYPES_ARRAY,
        required: true,
      },
    ],
    [t],
  );

  const createSchema = useMemo(
    () =>
      yup.object().shape({
        isTenant: yup.boolean().default(false),
        isProvider: yup.boolean().default(false),
        isOnlyFirebase: yup.boolean().default(false),
        isScheduler: yup.boolean().default(false),
        header: yup.string().required(t('requiredField')),
        tenantId: yup.number().when('isTenant', {
          is: true,
          then: (schema) => schema.required(t('requiredField')),
          otherwise: (schema) => schema.nullable(),
        }),
        userIds: yup.array().of(yup.number()),
        businessType: yup.string().when('isProvider', {
          is: true,
          then: (schema) => schema.required(t('requiredField')),
          otherwise: (schema) => schema.nullable(),
        }),
        typeScheduler: yup.string().when('isScheduler', {
          is: true,
          then: (schema) => schema.required(t('requiredField')),
          otherwise: (schema) => schema.nullable(),
        }),
        content: yup.string().required(t('requiredField')),
        typeNotification: yup.number().required(t('requiredField')),
      }),
    [t],
  );

  return (
    <>
      <BaseCrudPage
        title={t('Thông báo')}
        name="notifications"
        unitName={t('Thông báo')}
        columns={columns}
        service={notificationService}
        formWidth="md"
        hideExportExcelBtn
        hideImportExcelBtn
        hideViewAction
        hideEditAction
        hideSearchInput
        rowKey="id"
        getAllPath="/GetAllSchedulerNotification"
        deletePath="/DeleteScheduler"
        deleteManyPath="/DeleteManyScheduler"
        viewFields={viewFields}
        createFields={createFields}
        createSchema={createSchema}
        beautyView
      />
    </>
  );
};

export default NotificationsPage;
