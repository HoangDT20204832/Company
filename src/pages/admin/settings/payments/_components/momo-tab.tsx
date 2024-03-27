import { Stack } from '@mui/material';
import { useMemo } from 'react';
import * as yup from 'yup';

import BaseCrudTabPanel from '@/base/base-crud-tab-panel';
import { TBaseInputProps } from '@/base/base-form-input';
import { TBaseCrudCol } from '@/base/base.model';
import ChipWithCopy from '@/base/chip-with-copy';
import { TCrudFormField, TCrudFormSchema } from '@/base/crud-form-field.type';
import useAbp from '@/hooks/use-abp';
import useTranslation from '@/hooks/use-translation';
import { useGetAllTenants } from '@/services/organizations/use-get-all-tenants';

import paymentSettingsService from '../_services/payment-settings.service';
import ChipSecret from './chip-secret';

type TMomoTabProps = {
  isGlobal?: boolean;
};

const MomoTab = ({ isGlobal }: TMomoTabProps) => {
  const { t } = useTranslation();

  const { getCurLoginInfoQuery } = useAbp();
  const isTenantDefined = getCurLoginInfoQuery.data?.tenant ? true : false;

  const allTenantsQuery = useGetAllTenants();

  const columns = useMemo<TBaseCrudCol[]>(
    () => [
      {
        field: 'id',
        headerName: t('STT'),
        type: 'number',
        width: 50,
        renderCell: (params) => {
          return params.api.getRowIndexRelativeToVisibleRows(params.row.id) + 1;
        },
        editable: false,
      },
      {
        field: 'name',
        headerName: t('Tên'),
        flex: 1,
        editable: false,
        renderCell: (params) => <strong>{params.row.name}</strong>,
      },
      {
        field: 'tenantId',
        headerName: t('Tenant'),
        width: 150,
        editable: false,
        sortable: false,
        renderCell: (params) => <strong>{params.row.tenantName}</strong>,
      },
      {
        field: 'partnerCode',
        headerName: t('Partner Code'),
        editable: false,
        sortable: false,
        width: 250,
        renderCell: (params) => (
          <Stack sx={{ width: '100%' }} alignItems="center">
            <ChipWithCopy
              color="primary"
              variant="outlined"
              label={params.row.partnerCode}
            />
          </Stack>
        ),
      },
      {
        field: 'accessKey',
        headerName: t('Access Key'),
        editable: false,
        sortable: false,
        width: 250,
        renderCell: (params) => (
          <Stack sx={{ width: '100%' }} alignItems="center">
            <ChipSecret label={params.row.accessKey} />
          </Stack>
        ),
      },
      {
        field: 'secretKey',
        headerName: t('Secret Key'),
        editable: false,
        sortable: false,
        width: 400,
        renderCell: (params) => (
          <Stack sx={{ width: '100%' }} alignItems="center">
            <ChipSecret label={params.row.secretKey} />
          </Stack>
        ),
      },
    ],
    [t],
  );

  const viewFields = useMemo<TCrudFormField[]>(
    () => [
      {
        name: 'name',
        label: t('Tên'),
        type: 'text',
        colSpan: 6,
      },
      {
        name: 'tenantId',
        label: t('Tenant'),
        type: 'autocomplete',
        colSpan: 6,
        options: allTenantsQuery.data?.data.map((x) => ({
          label: x.name,
          value: x.id,
        })),
      },
      {
        name: 'partnerCode',
        label: t('Partner Code'),
        type: 'custom',
        Component: ({ value }: TBaseInputProps<string>) => (
          <ChipWithCopy label={value} />
        ),
        colSpan: 6,
      },
      {
        name: 'accessKey',
        label: t('Access Key'),
        type: 'custom',
        Component: ({ value }: TBaseInputProps<string>) => (
          <ChipSecret label={value} />
        ),
      },
      {
        name: 'secretKey',
        label: t('Secret Key'),
        type: 'custom',
        Component: ({ value }: TBaseInputProps<string>) => (
          <ChipSecret label={value as string} />
        ),
      },
    ],
    [allTenantsQuery.data?.data, t],
  );

  const createOrUpdateFields = useMemo<TCrudFormField[]>(
    () => [
      {
        name: 'name',
        label: t('Tên'),
        type: 'text',
        required: true,
      },
      {
        name: 'tenantId',
        label: t('Tenant'),
        type: 'autocomplete',
        required: true,
        options: allTenantsQuery.data?.data.map((x) => ({
          label: x.name,
          value: x.id,
        })),
      },
      {
        name: 'partnerCode',
        label: t('Partner Code'),
        type: 'text',
        required: true,
      },
      {
        name: 'accessKey',
        label: t('Access Key'),
        type: 'text',
        required: true,
      },
      {
        name: 'secretKey',
        label: t('Secret Key'),
        type: 'text',
        required: true,
      },
    ],
    [allTenantsQuery.data?.data, t],
  );

  const createOrUpdateSchema = useMemo<TCrudFormSchema>(
    () =>
      yup.object().shape({
        name: yup.string().required(t('field-required')),
        tenantId: yup.number().required(t('field-required')),
        partnerCode: yup.string().required(t('field-required')),
        accessKey: yup.string().required(t('field-required')),
        secretKey: yup.string().required(t('field-required')),
      }),
    [t],
  );

  const filterFields = useMemo<TCrudFormField[]>(
    () => [
      {
        name: 'tenantId',
        label: t('Tenant'),
        type: 'autocomplete',
        options: allTenantsQuery.data?.data.map((x) => ({
          label: x.name,
          value: x.id,
        })),
      },
    ],
    [allTenantsQuery.data?.data, t],
  );
  return (
    <BaseCrudTabPanel
      title={'Momo'}
      name={'/settings/payments/momo-tenants'}
      unitName={'cấu hình'}
      service={paymentSettingsService}
      columns={columns}
      hideSelectRowCheckbox
      viewFields={viewFields}
      beautyView
      formWidth="sm"
      createFields={createOrUpdateFields}
      createSchema={createOrUpdateSchema}
      updateFields={createOrUpdateFields}
      updateSchema={createOrUpdateSchema}
      filterFields={filterFields}
      getAllPath="/AdminGetAllMomoTenants"
      createPath="/CreateMomoTenant"
      updatePath="/UpdateMomoTenant"
      deletePath="/DeleteMomoTenant"
      hideImportExcelBtn
      hideExportExcelBtn
      hideAddBtn={isGlobal && isTenantDefined}
    />
  );
};

export default MomoTab;
