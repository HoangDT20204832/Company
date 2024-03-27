import { Stack } from '@mui/material';
import { useMemo, useState } from 'react';
import * as yup from 'yup';

import BaseCrudTabPanel from '@/base/base-crud-tab-panel';
import { TBaseInputProps } from '@/base/base-form-input';
import { TBaseCrudCol } from '@/base/base.model';
import ChipWithCopy from '@/base/chip-with-copy';
import { TCrudFormField, TCrudFormSchema } from '@/base/crud-form-field.type';
import useAbp from '@/hooks/use-abp';
import useTranslation from '@/hooks/use-translation';
import { useGetAllBuildings } from '@/services/organizations/use-get-all-buildings';
import { useGetAllTenants } from '@/services/organizations/use-get-all-tenants';
import { useGetAllUrbans } from '@/services/organizations/use-get-all-urbans';

import paymentSettingsService from '../_services/payment-settings.service';
import ChipSecret from './chip-secret';

type TOnepayTabProps = {
  isGlobal?: boolean;
};

const OnepayTab = ({ isGlobal }: TOnepayTabProps) => {
  const { t } = useTranslation();

  const { getCurLoginInfoQuery } = useAbp();
  const isTenantDefined = getCurLoginInfoQuery.data?.tenant ? true : false;

  const [selectedTenantId, setSelectedTenantId] = useState<number>();
  const [selectedUrbanId, setSelectedUrbanId] = useState<number>();

  const allTenantsQuery = useGetAllTenants();
  const allUrbansQuery = useGetAllUrbans(selectedTenantId);
  const allBuildingsQuery = useGetAllBuildings(selectedUrbanId);

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
        renderCell: (params) => {
          const tenant = allTenantsQuery.data?.data.find(
            (x) => x.id === params.row.tenantId,
          );
          console.log(allTenantsQuery.data?.data, tenant);
          return <strong>{tenant?.name}</strong>;
        },
      },
      {
        field: 'urbanId',
        headerName: t('Khu đô thị'),
        width: 150,
        editable: false,
        sortable: false,
      },
      {
        field: 'buildingId',
        headerName: t('Tòa nhà'),
        width: 150,
        editable: false,
        sortable: false,
      },
      {
        field: 'merchant',
        headerName: t('Merchant'),
        editable: false,
        sortable: false,
        width: 250,
        renderCell: (params) => (
          <Stack sx={{ width: '100%' }} alignItems="center">
            <ChipSecret label={params.row.merchant} />
          </Stack>
        ),
      },
      {
        field: 'accessCode',
        headerName: t('Access code'),
        editable: false,
        sortable: false,
        width: 250,
        renderCell: (params) => (
          <Stack sx={{ width: '100%' }} alignItems="center">
            <ChipSecret label={params.row.accessCode} />
          </Stack>
        ),
      },
    ],
    [allTenantsQuery.data?.data, t],
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
        onChange: (value) => {
          setSelectedTenantId(value);
        },
      },
      {
        name: 'urbanId',
        label: t('Khu đô thị'),
        type: 'autocomplete',
        colSpan: 6,
        options: allUrbansQuery.data?.data.map((x) => ({
          label: x.displayName,
          value: x.id,
        })),
      },
      {
        name: 'buildingId',
        label: t('Tòa nhà'),
        type: 'autocomplete',
        colSpan: 6,
        options: allBuildingsQuery.data?.data.map((x) => ({
          label: x.displayName,
          value: x.id,
        })),
      },
      {
        name: 'merchant',
        label: t('Merchant'),
        type: 'custom',
        Component: ({ value }: TBaseInputProps<string>) => (
          <ChipWithCopy label={value} />
        ),
        colSpan: 6,
      },
      {
        name: 'accessCode',
        label: t('Access code'),
        type: 'custom',
        colSpan: 6,
        Component: ({ value }: TBaseInputProps<string>) => (
          <ChipSecret label={value} />
        ),
      },
      {
        name: 'description',
        label: t('Mô tả'),
        type: 'textarea',
        colSpan: 12,
      },
    ],
    [
      allBuildingsQuery.data?.data,
      allTenantsQuery.data?.data,
      allUrbansQuery.data?.data,
      t,
    ],
  );

  const createOrUpdateFields = useMemo<TCrudFormField[]>(
    () => [
      {
        name: 'name',
        label: t('Tên'),
        type: 'text',
        required: true,
        colSpan: 6,
      },
      {
        name: 'tenantId',
        label: t('Tenant'),
        type: 'autocomplete',
        required: true,
        colSpan: 6,
        options: allTenantsQuery.data?.data.map((x) => ({
          label: x.name,
          value: x.id,
        })),
        onChange: (value) => {
          setSelectedTenantId(value);
        },
      },
      {
        name: 'urbanId',
        label: t('Khu đô thị'),
        type: 'autocomplete',
        readOnly: !selectedTenantId,
        colSpan: 6,
        options: allUrbansQuery.data?.data.map((x) => ({
          label: x.displayName,
          value: x.id,
        })),
        onChange: (value) => {
          setSelectedUrbanId(value);
        },
      },
      {
        name: 'buildingId',
        label: t('Tòa nhà'),
        type: 'autocomplete',
        readOnly: !selectedUrbanId,
        colSpan: 6,
        options: allBuildingsQuery.data?.data.map((x) => ({
          label: x.displayName,
          value: x.id,
        })),
      },
      {
        name: 'merchant',
        label: t('Merchant'),
        type: 'text',
        required: true,
        colSpan: 6,
      },
      {
        name: 'accessCode',
        label: t('Access code'),
        type: 'text',
        required: true,
        colSpan: 6,
      },
      {
        name: 'description',
        label: t('Mô tả'),
        type: 'textarea',
      },
    ],
    [
      allBuildingsQuery.data?.data,
      allTenantsQuery.data?.data,
      allUrbansQuery.data?.data,
      selectedTenantId,
      selectedUrbanId,
      t,
    ],
  );

  const createOrUpdateSchema = useMemo<TCrudFormSchema>(
    () =>
      yup.object().shape({
        name: yup.string().required(t('field-required')),
        tenantId: yup.number().required(t('field-required')),
        merchant: yup.string().required(t('field-required')),
        accessCode: yup.string().required(t('field-required')),
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
      title={'Onepay'}
      name={'/settings/payments/onepay-merchants'}
      unitName={'cấu hình'}
      service={paymentSettingsService}
      columns={columns}
      hideSelectRowCheckbox
      viewFields={viewFields}
      beautyView
      formWidth="md"
      createFields={createOrUpdateFields}
      createSchema={createOrUpdateSchema}
      updateFields={createOrUpdateFields}
      updateSchema={createOrUpdateSchema}
      filterFields={filterFields}
      getAllPath="/AdminGetListOnepayMerchant"
      createPath="/CreateOnepayMerchant"
      updatePath="/UpdateOnepayMerchant"
      deletePath="/DeleteOnepayMerchant"
      hideImportExcelBtn
      hideExportExcelBtn
      hideAddBtn={isGlobal && isTenantDefined}
      onCloseForm={() => {
        setSelectedTenantId(undefined);
        setSelectedUrbanId(undefined);
      }}
    />
  );
};

export default OnepayTab;
