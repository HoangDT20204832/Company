import { PhotoRounded } from '@mui/icons-material';
import { Avatar, Box, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useMemo } from 'react';

import BaseCrudPage from '@/base/base-crud-page';
import { TCrudFormField } from '@/base/crud-form-field.type';
import useTranslation from '@/hooks/use-translation';
import { formatDate } from '@/services/utils-date';

import { SmartlifeFeedbackService } from './_services/smartlife-feedback.service';

const SettingFeedbackPage = () => {
  const { t } = useTranslation();

  const smartlifeFeedbackService = useMemo(
    () => new SmartlifeFeedbackService(),
    [],
  );

  const columns = useMemo<GridColDef<any>[]>(
    () => [
      {
        field: 'id',
        headerName: t('STT'),
        type: 'number',
        width: 32,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) =>
          params.api.getRowIndexRelativeToVisibleRows(params.row.id) + 1,
      },
      {
        field: 'imageUrl',
        headerName: 'Avatar',
        headerAlign: 'center',
        align: 'center',
        minWidth: 150,
        renderCell: (params) => (
          <Box
            m={2}
            sx={{
              borderRadius: '5px',
              boxShadow:
                '0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12)',
              width: 80,
              height: 80,
            }}
          >
            <Avatar
              sx={{
                width: 80,
                height: 80,
              }}
              variant="rounded"
              src={params?.value}
            >
              <PhotoRounded fontSize="large" />
            </Avatar>
          </Box>
        ),
      },
      {
        field: 'name',
        headerName: t('Họ tên'),
        flex: 1,
        minWidth: 200,
      },
      {
        field: 'feedback',
        headerName: 'Feedback',
        flex: 1,
        minWidth: 200,
      },
      {
        field: 'creationTime',
        headerName: t('Ngày tạo'),
        flex: 1,
        minWidth: 100,
        renderCell: (params: any) => <Box>{formatDate(params?.value)}</Box>,
      },
      {
        field: 'description',
        headerName: t('Mô tả'),
        flex: 1,
        minWidth: 200,
      },
    ],
    [t],
  );

  const viewFields = useMemo<TCrudFormField[]>(
    () => [
      {
        name: 'imageUrl',
        label: '',
        colSpan: 2,
        type: 'uploadimage',
        readOnly: true,
      },
      {
        name: 'name',
        label: t('Họ tên'),
        colSpan: 6,
        type: 'text',
        readOnly: true,
      },
      {
        name: 'creationTime',
        label: t('Ngày tạo'),
        colSpan: 4,
        type: 'text',
        readOnly: true,
        formatValue: (value) => (
          <Typography sx={{ fontStyle: 'italic' }} color="gray">
            {formatDate(value)}
          </Typography>
        ),
      },
      {
        name: 'feedback',
        label: 'Feedback',
        colSpan: 12,
        type: 'text',
        readOnly: true,
      },

      {
        name: 'descripiton',
        label: t('Mô tả'),
        colSpan: 12,
        type: 'text',
        readOnly: true,
      },
    ],
    [t],
  );

  return (
    <BaseCrudPage
      title="Smartlife Feedback"
      name="Smartlife Feedback"
      unitName="Smartlife Feedback"
      columns={columns}
      viewFields={viewFields}
      formWidth="xs"
      beautyView
      service={smartlifeFeedbackService}
      getAllPath="/GetAllFeedbackApp"
      hideAddBtn
      hideEditAction
      hideDeleteAction
      hideDeleteManyBtn
      hideImportExcelBtn
      hideExportExcelBtn
      // exportExcelPath='/ExportFeedbackAppToExcel'
    />
  );
};

export default SettingFeedbackPage;
