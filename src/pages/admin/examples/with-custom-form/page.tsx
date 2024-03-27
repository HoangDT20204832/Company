'use client';

import { GridColDef } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import * as yup from 'yup';

import BaseCrudPage from '@/base/base-crud-page';
import { TCrudFormField } from '@/base/crud-form-field.type';
import useTranslation from '@/hooks/use-translation';
import { vauService } from '@/services/common/vau.service';

import { TenantService } from '../_services/example.service';

const ExampleWidthCustomForm = () => {
  const { t } = useTranslation();

  const [selectedProvince, setSelectedProvince] = useState<string>();
  const [selectedDistrict, setSelectedDistrict] = useState<string>();
  const [selectedRadio, setSelectedRadio] = useState<number>(1);

  const createSchema = useMemo(
    () =>
      yup.object().shape({
        testProvince: yup.string().required(),
        testDistrict: yup.string().required(),
        testWard: yup.string().required(),
      }),
    [],
  );

  const updateSchema = useMemo(
    () =>
      yup.object().shape({
        tenancyName: yup.string().required(),
        name: yup.string().required(),
        isActive: yup.boolean().required(),
      }),
    [],
  );

  const provincesQuery = useQuery({
    queryKey: ['example/getProvinces'],
    queryFn: () => vauService.getProvinces(),
  });
  const districtsQuery = useQuery({
    enabled: !!selectedProvince,
    queryKey: ['example/getDistricts', selectedProvince],
    queryFn: () => vauService.getDistricts(selectedProvince as string),
  });
  const wardsQuery = useQuery({
    enabled: !!selectedDistrict,
    queryKey: ['example/getWards', selectedDistrict],
    queryFn: () => vauService.getWards(selectedDistrict as string),
  });

  const columns: GridColDef[] = useMemo(
    () => [
      { field: 'id', headerName: 'ID', type: 'number', width: 100 },
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
        name: 'testProvince',
        label: 'Test Province',
        type: 'autocomplete',
        options: provincesQuery.data?.map((x) => ({
          label: x.name,
          value: x.code,
        })),
        required: true,
        colSpan: 4,
        onChange: (value) => {
          setSelectedProvince(value);
          setSelectedDistrict(undefined);
        },
      },
      {
        name: 'testDistrict',
        label: 'Test District',
        type: 'autocomplete',
        hidden: !selectedProvince,
        options: districtsQuery.data?.map((x) => ({
          label: x.name,
          value: x.code,
        })),
        required: true,
        colSpan: 4,
        onChange: (value) => {
          setSelectedDistrict(value);
        },
      },
      {
        name: 'testWard',
        label: 'Test Ward',
        type: 'autocomplete',
        hidden: !selectedDistrict,
        options: wardsQuery.data?.map((x) => ({
          label: x.name,
          value: x.code,
        })),
        required: true,
        colSpan: 4,
      },
      {
        name: 'testRadio',
        label: 'Test Radio',
        type: 'radio',
        options: [
          { label: 'With Text', value: 1 },
          { label: 'With Date', value: 2 },
        ],
        defaultValue: 1,
        required: true,
        colSpan: 4,
        onChange: (value) => {
          setSelectedRadio(+value);
        },
      },
      {
        name: 'testText',
        label: 'Test Text',
        type: 'text',
        colSpan: 4,
        hidden: !(selectedRadio === 1),
      },
      {
        name: 'testDate',
        label: 'Test Date',
        type: 'date',
        colSpan: 4,
        hidden: !(selectedRadio === 2),
      },
    ],
    [
      districtsQuery.data,
      provincesQuery.data,
      selectedDistrict,
      selectedProvince,
      selectedRadio,
      wardsQuery.data,
    ],
  );

  const updateFields = useMemo<TCrudFormField[]>(
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
        name: 'isActive',
        label: t('Hoạt động'),
        type: 'checkbox',
        required: true,
        colSpan: 4,
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

  const filterFields = useMemo<TCrudFormField[]>(
    () => [
      {
        name: 'tenancyName',
        label: t('Mã tenant'),
        type: 'text',
        colSpan: 6,
      },
      {
        name: 'name',
        label: t('Tên'),
        type: 'text',
        colSpan: 6,
      },
      {
        name: 'isActive',
        label: t('Hoạt động'),
        type: 'select',
        options: [
          { label: 'All', value: 0 },
          { label: 'Active', value: 1 },
          { label: 'Inactive', value: 2 },
        ],
        colSpan: 6,
      },
    ],
    [t],
  );

  const sortFields = useMemo(
    () => [
      { label: 'ID', value: 1 },
      { label: 'Name', value: 2 },
      { label: 'Tenancy code', value: 3 },
    ],
    [],
  );

  const tenantService = useMemo(() => new TenantService(), []);

  return (
    <BaseCrudPage
      title={'Custom form'}
      name="tenants"
      unitName={t('Tenant')}
      service={tenantService}
      columns={columns}
      sortFields={sortFields}
      filterFields={filterFields}
      viewFields={viewFields}
      createFields={createFields}
      updateFields={updateFields}
      createSchema={createSchema}
      updateSchema={updateSchema}
      formWidth="lg"
      hideSelectRowCheckbox
      hideDeleteManyBtn
    />
  );
};

export default ExampleWidthCustomForm;
