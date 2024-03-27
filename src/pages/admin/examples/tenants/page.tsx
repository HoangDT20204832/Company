'use client';

import { GridColDef } from '@mui/x-data-grid';
import { useMemo } from 'react';
import * as yup from 'yup';

import BaseCrudPage from '@/base/base-crud-page';
import { TCrudFormField } from '@/base/crud-form-field.type';
import useTranslation from '@/hooks/use-translation';

import { TenantService } from '../_services/example.service';

const TenantPage = () => {
  const { t } = useTranslation();

  const columns: GridColDef[] = useMemo(
    () => [
      { field: 'id', headerName: 'ID', width: 100, type: 'number' },
      {
        field: 'tenancyName',
        headerName: t('Mã tenant'),
        editable: false,
        flex: 1,
      },
      {
        field: 'name',
        headerName: t('Tên'),
        editable: false,
        flex: 1,
      },
      {
        field: 'isActive',
        headerName: t('Hoạt động'),
        type: 'boolean',
        editable: false,
        flex: 1,
      },
    ],
    [t],
  );

  const createFields = useMemo<TCrudFormField[]>(
    () => [
      {
        name: 'tenancyName',
        label: t('Mã tenant'),
        type: 'text',
        required: true,
        colSpan: 4,
      },
      {
        name: 'name',
        label: t('Tên'),
        type: 'text',
        required: true,
        colSpan: 4,
      },
      {
        name: 'connectionString',
        label: t('URL kết nối'),
        type: 'text',
        required: false,
        colSpan: 4,
      },
      {
        name: 'adminEmailAddress',
        label: t('Email quản trị'),
        type: 'text',
        required: true,
        colSpan: 4,
      },
      {
        name: 'isActive',
        label: t('Hoạt động'),
        type: 'checkbox',
        required: true,
        defaultValue: false,
        colSpan: 4,
      },
    ],
    [t],
  );

  const updateFields = useMemo<TCrudFormField[]>(
    () => [
      {
        name: 'id',
        label: 'ID',
        type: 'number',
        required: true,
        readOnly: true,
        colSpan: 3,
        noRender: true,
      },
      {
        name: 'tenancyName',
        label: t('Mã tenant'),
        type: 'text',
        required: true,
        colSpan: 3,
      },
      {
        name: 'name',
        label: t('Tên'),
        type: 'text',
        required: true,
        colSpan: 3,
      },
      {
        name: 'isActive',
        label: t('Hoạt động'),
        type: 'checkbox',
        required: true,
        colSpan: 3,
      },
    ],
    [t],
  );

  const viewFields = useMemo<TCrudFormField[]>(
    () => [
      {
        name: 'tenancyName',
        label: t('Mã tenant'),
        type: 'text',
        required: true,
        colSpan: 4,
        readOnly: true,
      },
      {
        name: 'name',
        label: t('Tên'),
        type: 'text',
        required: true,
        colSpan: 4,
        readOnly: true,
      },
      {
        name: 'isActive',
        label: t('Hoạt động'),
        type: 'checkbox',
        required: true,
        colSpan: 4,
        readOnly: true,
      },
    ],
    [t],
  );

  const createSchema = useMemo(
    () =>
      yup.object().shape({
        tenancyName: yup.string().required(),
        name: yup.string().required(),
        connectionString: yup.string().optional(),
        adminEmailAddress: yup.string().email().required(),
        isActive: yup.boolean().required(),
      }),
    [],
  );

  const updateSchema = useMemo(
    () =>
      yup.object().shape({
        id: yup.number().required(),
        tenancyName: yup.string().required(),
        name: yup.string().required(),
        isActive: yup.boolean().required(),
      }),
    [],
  );

  const tenantService = useMemo(() => new TenantService(), []);

  return (
    <BaseCrudPage
      title={t('Tenant')}
      name="tenants"
      unitName={t('Tenant')}
      service={tenantService}
      columns={columns}
      viewFields={viewFields}
      createFields={createFields}
      updateFields={updateFields}
      createSchema={createSchema}
      updateSchema={updateSchema}
    />
  );
};

export default TenantPage;
