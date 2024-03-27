'use client';

import { GridColDef } from '@mui/x-data-grid';
import { useMemo, useState } from 'react';
import * as yup from 'yup';

import BaseCrudPage from '@/base/base-crud-page';
import { TCrudFormField } from '@/base/crud-form-field.type';
import useTranslation from '@/hooks/use-translation';

import { TenantService } from '../_services/example.service';
import CustomInput from './_components/custom-input';
import CustomListInput from './_components/custom-list-input';

const ExamplePage = () => {
  const { t } = useTranslation();

  const [_refetchData, setRefetchData] = useState<() => void>();

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
        name: 'testImage',
        label: 'Test Image',
        type: 'uploadimage',
        required: true,
      },
      {
        name: 'testMultiImage',
        label: 'Test Multi Image',
        type: 'uploadlistimage',
        required: true,
      },
      {
        name: 'testText',
        label: 'Test Text',
        type: 'text',
        required: true,
        colSpan: 3,
      },
      {
        name: 'testNumber',
        label: 'Test Number',
        type: 'number',
        required: true,
        colSpan: 3,
      },
      {
        name: 'testAutoComplete',
        label: 'Test Autocomplete',
        type: 'autocomplete',
        options: [
          { label: 'Mot', value: 'mot' },
          { label: 'High', value: 'hai' },
          { label: 'Bar', value: 'ba' },
        ],
        required: true,
        colSpan: 3,
      },
      {
        name: 'testRadio',
        label: 'Test Radio',
        type: 'radio',
        colSpan: 3,
        required: true,
        options: [
          { label: 'Mot', value: 'mot' },
          { label: 'High', value: 'hai' },
          { label: 'Bar', value: 'ba' },
        ],
      },
      {
        name: 'testDate',
        label: 'Test Date',
        type: 'date',
        required: true,
        colSpan: 3,
      },
      {
        name: 'testDateTime',
        label: 'Test Date time',
        type: 'datetime',
        required: true,
        colSpan: 3,
      },
      {
        name: 'testCheckbox',
        label: 'Test Checkbox',
        type: 'checkbox',
        required: true,
        colSpan: 3,
      },
      {
        name: 'testMultiAutoComplete',
        label: 'Test Multi Autocomplete',
        type: 'multiautocomplete',
        required: true,
        options: [
          { label: 'Mot', value: 'mot' },
          { label: 'High', value: 'hai' },
          { label: 'Bar', value: 'ba' },
          { label: 'Bon', value: 'bon' },
          { label: 'Nam', value: 'nam' },
          { label: 'Sau', value: 'sau' },
        ],
        colSpan: 4,
      },
      {
        name: 'testMultiSelect',
        label: 'Test Multi Select',
        type: 'multiselect',
        required: true,
        options: [
          { label: 'Mot', value: 'mot' },
          { label: 'High', value: 'hai' },
          { label: 'Bar', value: 'ba' },
          { label: 'Bon', value: 'bon' },
          { label: 'Nam', value: 'nam' },
          { label: 'Sau', value: 'sau' },
        ],
        colSpan: 4,
      },
      {
        name: 'testSelect',
        label: 'Test Select',
        type: 'select',
        required: true,
        colSpan: 3,
        options: [
          { label: 'Mot', value: 'mot' },
          { label: 'High', value: 'hai' },
          { label: 'Bar', value: 'ba' },
        ],
      },
      {
        name: 'testTextArea',
        label: 'Test Text Area',
        type: 'textarea',
        required: true,
        colSpan: 6,
      },
      {
        name: 'testRTE',
        label: 'Test RTE',
        type: 'rte',
        required: true,
        colSpan: 12,
      },
      {
        name: 'testCustomInput',
        label: 'Test Custom Input',
        type: 'custom',
        required: true,
        colSpan: 12,
        Component: CustomInput,
      },
      {
        name: 'testCustomListInput',
        label: 'Test Custom List Input',
        type: 'custom',
        required: true,
        colSpan: 12,
        Component: CustomListInput,
      },
    ],
    [],
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

  const createSchema = useMemo(
    () =>
      yup.object().shape({
        testText: yup.string().required(),
        testNumber: yup.number().required(),
        testAutoComplete: yup.string().required(),
        testRadio: yup.string().required(),
        testDate: yup.date().required(),
        testDateTime: yup.date().required(),
        testCheckbox: yup.boolean().required(),
        testMultiAutoComplete: yup.array().required(),
        testMultiSelect: yup.array().of(yup.string()).min(2).required(),
        testSelect: yup.string().required(),
        testTextArea: yup.string().required(),
        testRTE: yup.string().required(),
        testCustomInput: yup.string().required(),
        testCustomListInput: yup.array().required(),
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
      title={t('Tenant')}
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
      formWidth="xl"
      hideSelectRowCheckbox
      hideAddBtn={false}
      hideDeleteManyBtn={false}
      hideExportExcelBtn={false}
      hideImportExcelBtn={false}
      hasCustomActions={false}
      hideSearchInput={false}
      setRefetchData={setRefetchData}
    />
  );
};

export default ExamplePage;
