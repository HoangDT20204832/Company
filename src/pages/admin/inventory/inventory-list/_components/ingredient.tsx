import { Box, Typography } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import * as yup from 'yup';

import BaseCrudContent from '@/base/base-crud-content';
import { TCrudFormField } from '@/base/crud-form-field.type';
import useTranslation from '@/hooks/use-translation';

import { EStockType } from '../../_services/inventory-list.model';
import inventoryListService from '../../_services/inventory-list.service';

const IngredientPage = () => {
  const { t } = useTranslation();

  const { data: getCalculationUnit } = useQuery({
    queryKey: ['getCalculationUnit'],
    queryFn: () => inventoryListService.getCalculationUnit(),
  });

  console.log(getCalculationUnit?.data, 'hehehe');

  const columns = useMemo<GridColDef<any>[]>(
    () => [
      {
        field: 'id',
        headerName: t('STT'),
        type: 'number',
        width: 32,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params: any) =>
          params.api.getRowIndexRelativeToVisibleRows(params.row.id) + 1,
      },
      {
        field: 'restaurantId',
        headerName: t('Tên nhà hàng'),
        type: 'text',
        minWidth: 100,
      },
      {
        field: 'referObjectId',
        headerName: t('Mặt hàng'),
        type: 'text',
        minWidth: 100,
      },
      {
        field: 'name',
        headerName: t('Tên nguyên liệu'),
        type: 'text',
        minWidth: 200,
      },
      {
        field: 'calculationUnitId',
        headerName: t('Đơn vị'),
        type: 'autocomplete',
        options: getCalculationUnit?.data?.map((item: any) => ({
          label: item.title,
          value: item.id,
        })),
        renderCell: (params) => {
          const typeItem = getCalculationUnit?.data?.find(
            (item: any) => item.id === params.value,
          );

          return (
            <Box>
              <Typography
                variant="caption"
                lineHeight={1.2}
                fontSize={14}
                sx={{
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  overflow: 'hidden',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 2,
                }}
              >
                {typeItem ? typeItem.title : ''}
              </Typography>
            </Box>
          );
        },
        minWidth: 20,
      },
      {
        field: 'stock',
        headerName: t('Số lượng ban đầu'),
        type: 'number',
        flex: 1,
      },
      {
        field: 'minReq',
        headerName: t('Số lượng tối thiểu'),
        type: 'number',
        flex: 1,
      },
      {
        field: 'exportPrice',
        headerName: t('Giá xuất khẩu'),
        type: 'number',
        renderCell: (params: GridRenderCellParams) => {
          const price = params.row.exportPrice;
          return (
            <Box
              sx={{
                width: '100%',
              }}
            >
              <Box>
                {(price ? price : 0).toLocaleString('vi-VI', {
                  style: 'currency',
                  currency: 'VND',
                })}
              </Box>
            </Box>
          );
        },
        flex: 1,
      },
    ],
    [getCalculationUnit?.data, t],
  );

  const createFields = useMemo<TCrudFormField[]>(
    () => [
      {
        name: 'restaurantId',
        label: t('Tên nhà hàng'),
        type: 'text',
        colSpan: 6,
      },
      {
        name: 'referObjectId',
        label: t('Mặt hàng'),
        type: 'text',
        colSpan: 6,
      },
      {
        name: 'name',
        label: t('Tên nguyên liệu'),
        type: 'text',
        colSpan: 6,
      },
      {
        name: 'calculationUnitId',
        label: t('Đơn vị'),
        type: 'autocomplete',
        options: getCalculationUnit?.data?.map((item: any) => ({
          label: item.title,
          value: item.id,
        })),
        colSpan: 6,
      },
      {
        name: 'stock',
        label: t('Số lượng ban đầu'),
        type: 'number',
        colSpan: 6,
      },
      {
        name: 'minReq',
        label: t('Số lượng tối thiểu'),
        type: 'number',
        colSpan: 6,
      },
      {
        name: 'exportPrice',
        label: t('Giá xuất khẩu'),
        type: 'number',
        colSpan: 6,
      },
      {
        name: 'type',
        label: '',
        type: 'number',
        colSpan: 6,
        defaultValue: EStockType.Ingredient,
        noRender: true,
      },
    ],
    [getCalculationUnit?.data, t],
  );

  const updateFields = useMemo<TCrudFormField[]>(
    () => [
      {
        name: 'restaurantId',
        label: t('Tên nhà hàng'),
        type: 'text',
        colSpan: 6,
      },
      {
        name: 'referObjectId',
        label: t('Mặt hàng'),
        type: 'text',
        colSpan: 6,
      },
      {
        name: 'name',
        label: t('Tên nguyên liệu'),
        type: 'text',
        colSpan: 6,
      },
      {
        name: 'calculationUnitId',
        label: t('Đơn vị'),
        type: 'autocomplete',
        options: getCalculationUnit?.data?.map((item: any) => ({
          label: item.title,
          value: item.id,
        })),
        colSpan: 6,
      },
      {
        name: 'stock',
        label: t('Số lượng ban đầu'),
        type: 'number',
        colSpan: 6,
      },
      {
        name: 'minReq',
        label: t('Số lượng tối thiểu'),
        type: 'number',
        colSpan: 6,
      },
      {
        name: 'exportPrice',
        label: t('Giá xuất khẩu'),
        type: 'number',
        colSpan: 6,
      },
      {
        name: 'type',
        label: '',
        type: 'number',
        colSpan: 6,
        defaultValue: EStockType.Ingredient,
        noRender: true,
      },
    ],
    [getCalculationUnit?.data, t],
  );

  const viewFields = useMemo<TCrudFormField[]>(
    () => [
      {
        name: 'restaurantId',
        label: t('Tên nhà hàng'),
        type: 'text',
        colSpan: 6,
      },
      {
        name: 'referObjectId',
        label: t('Mặt hàng'),
        type: 'text',
        colSpan: 6,
      },
      {
        name: 'name',
        label: t('Tên nguyên liệu'),
        type: 'text',
        colSpan: 6,
      },
      {
        name: 'calculationUnitId',
        label: t('Đơn vị'),
        type: 'autocomplete',
        options: getCalculationUnit?.data?.map((item: any) => ({
          label: item.title,
          value: item.id,
        })),
        colSpan: 6,
      },
      {
        name: 'stock',
        label: t('Số lượng ban đầu'),
        type: 'number',
        colSpan: 6,
      },
      {
        name: 'minReq',
        label: t('Số lượng tối thiểu'),
        type: 'number',
        colSpan: 6,
      },
      {
        name: 'exportPrice',
        label: t('Giá xuất khẩu'),
        type: 'number',
        colSpan: 6,
      },
    ],
    [getCalculationUnit?.data, t],
  );

  const createSchema = useMemo(
    () =>
      yup.object().shape({
        name: yup.string().required(t('Trường này là bắt buộc')),
        restaurantId: yup
          .string()
          .optional()
          .required(t('Trường này là bắt buộc')),
        referObjectId: yup
          .string()
          .optional()
          .required(t('Trường này là bắt buộc')),
        calculationUnitId: yup
          .string()
          .optional()
          .required(t('Trường này là bắt buộc')),
        stock: yup.number().required(t('Trường này là bắt buộc')),
      }),
    [t],
  );

  return (
    <BaseCrudContent
      title={t('Nguyên liệu tồn kho')}
      name={'inventory'}
      unitName={t('Nguyên liệu')}
      service={inventoryListService}
      columns={columns}
      viewFields={viewFields}
      createFields={createFields}
      updateFields={updateFields}
      createSchema={createSchema}
      updateSchema={createSchema}
      formWidth="md"
      beautyViewFormWidth="sm"
      beautyView
      getAllPath="/GetAll"
      createPath="/Create"
      deletePath="Delete"
      updatePath="/Update"
      hideAddBtn={false}
      hideDeleteManyBtn={false}
      hideExportExcelBtn={true}
      hideImportExcelBtn={true}
      hasCustomActions={false}
      hideSearchInput={false}
      stickyLastCol
    />
  );
};

export default IngredientPage;
