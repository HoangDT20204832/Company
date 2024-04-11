import { Box, Typography } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import * as yup from 'yup';

import BaseCrudContent from '@/base/base-crud-content';
import { TCrudFormField } from '@/base/crud-form-field.type';
import useTranslation from '@/hooks/use-translation';

import { EStockType } from '../../_services/inventory-list.model';
import inventoryListService from '../../_services/invoice-list.service';
import invoiceListService from '../../_services/invoice-list.service';

const InvoiceAllPage = () => {
  const { t } = useTranslation();

  const { data: getInvoicesAll } = useQuery({
    queryKey: ['getInvoicesAll'],
    queryFn: () => invoiceListService.getAllInvoice(),
  });

  console.log(getInvoicesAll?.data, 'hehehe');

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
        field: 'referenceCode',
        headerName: t('Mã tham chiếu'),
        type: 'text',
        flex:1
      },
      {
        field: 'paymentTime',
        headerName: t('Thời gian thanh toán'),
        type: 'date',
        flex:1
      },
      {
        field: 'cashier',
        headerName: t('Thu ngân'),
        type: 'text',
        flex:1
      },
      {
        field: 'invoiceType',
        headerName: t('Loại hình'),
        type: 'number',
        flex:1
      },
      {
        field: 'tableArea',
        headerName: t('Tên đơn/ Khu vực'),
        type: 'text',
        flex:1
      },
      {
        field: 'sourcePartner',
        headerName: t('Nguồn/ Đối tác'),
        type: 'text',
        flex:1
      },
      {
        field: 'paymentMethod',
        headerName: t('Phương thức thanh toán'),
        type: 'number',
        flex:1
      },
      {
        field: 'numberOfCustomer',
        headerName: t('Số khách hàng'),
        type: 'number',
        flex:1
      },
      {
        field: 'totalAmount',
        headerName: t('Tổng tiền'),
        type: 'number',
        flex:1
      },
      {
        field: 'status',
        headerName: t('Trạng thái thanh toán'),
        type: 'number',
        flex:1
      },
      // {
      //   field: 'calculationUnitId',
      //   headerName: t('Đơn vị'),
      //   type: 'autocomplete',
      //   options: getInvoicesAll?.data?.map((item: any) => ({
      //     label: item.title,
      //     value: item.id,
      //   })),
      //   renderCell: (params) => {
      //     const typeItem = getInvoicesAll?.data?.find(
      //       (item: any) => item.id === params.value,
      //     );

      //     return (
      //       <Box>
      //         <Typography
      //           variant="caption"
      //           lineHeight={1.2}
      //           fontSize={14}
      //           sx={{
      //             textOverflow: 'ellipsis',
      //             display: '-webkit-box',
      //             overflow: 'hidden',
      //             WebkitBoxOrient: 'vertical',
      //             WebkitLineClamp: 2,
      //           }}
      //         >
      //           {typeItem ? typeItem.title : ''}
      //         </Typography>
      //       </Box>
      //     );
      //   },
      //   minWidth: 20,
      // },
    ],
    [getInvoicesAll?.data, t],
  );

  const createFields = useMemo<TCrudFormField[]>(
    () => [
      {
        name: 'referenceCode',
        label: t('Mã tham chiếu'),
        type: 'text',
        colSpan: 6,
      },
      {
        name: 'paymentTimeFrom',
        label: t('Thời gian bắt đầu'),
        type: 'date',
        colSpan: 6,
      },
      {
        name: 'paymentTimeTo',
        label: t('Thời gian kết thúc'),
        type: 'date',
        colSpan: 6,
      },
      {
        name: 'cashier',
        label: t('Thu ngân'),
        type: 'text',
        colSpan: 6,
      },
      // {
      //   name: 'calculationUnitId',
      //   label: t('Đơn vị'),
      //   type: 'autocomplete',
      //   options: getInvoicesAll?.data?.map((item: any) => ({
      //     label: item.title,
      //     value: item.id,
      //   })),
      //   colSpan: 6,
      // },
      {
        name: 'invoiceType',
        label: t('Loại hình'),
        type: 'number',
        colSpan: 6,
      },
      {
        name: 'tableArea',
        label: t('Tên đơn/ Khu vực'),
        type: 'text',
        colSpan: 6,
      },
      {
        name: 'sourcePartner',
        label: t('Nguồn/ Đối tác'),
        type: 'text',
        colSpan: 6,
      },
      {
        name: 'paymentMethod',
        label: t('Phương thức thanh toán'),
        type: 'number',
        colSpan: 6,
      },
      {
        name: 'numberOfCustomer',
        label: t('Số khách hàng'),
        type: 'number',
        colSpan: 6,
      },
      // {
      //   name: 'totalAmount',
      //   label: t('Tổng tiền'),
      //   type: 'number',
      //   colSpan: 6,
      // },
      {
        name: 'status',
        label: t('Trạng thái thanh toán'),
        type: 'number',
        colSpan: 6,
      },
    ],
    [getInvoicesAll?.data, t],
  );

  const updateFields = useMemo<TCrudFormField[]>(
    () => [
      {
        name: 'referenceCode',
        label: t('Mã tham chiếu'),
        type: 'text',
        colSpan: 6,
      },
      {
        name: 'paymentTimeFrom',
        label: t('Thời gian bắt đầu'),
        type: 'date',
        colSpan: 6,
      },
      {
        name: 'paymentTimeTo',
        label: t('Thời gian kết thúc'),
        type: 'date',
        colSpan: 6,
      },
      {
        name: 'cashier',
        label: t('Thu ngân'),
        type: 'text',
        colSpan: 6,
      },
      // {
      //   name: 'calculationUnitId',
      //   label: t('Đơn vị'),
      //   type: 'autocomplete',
      //   options: getInvoicesAll?.data?.map((item: any) => ({
      //     label: item.title,
      //     value: item.id,
      //   })),
      //   colSpan: 6,
      // },
      {
        name: 'invoiceType',
        label: t('Loại hình'),
        type: 'number',
        colSpan: 6,
      },
      {
        name: 'tableArea',
        label: t('Tên đơn/ Khu vực'),
        type: 'text',
        colSpan: 6,
      },
      {
        name: 'sourcePartner',
        label: t('Nguồn/ Đối tác'),
        type: 'text',
        colSpan: 6,
      },
      {
        name: 'paymentMethod',
        label: t('Phương thức thanh toán'),
        type: 'number',
        colSpan: 6,
      },
      {
        name: 'numberOfCustomer',
        label: t('Số khách hàng'),
        type: 'number',
        colSpan: 6,
      },
      // {
      //   name: 'totalAmount',
      //   label: t('Tổng tiền'),
      //   type: 'number',
      //   colSpan: 6,
      // },
      {
        name: 'status',
        label: t('Trạng thái thanh toán'),
        type: 'number',
        colSpan: 6,
      },
    ],
    [getInvoicesAll?.data, t],
  );

  const viewFields = useMemo<TCrudFormField[]>(
    () => [
      {
        name: 'referenceCode',
        label: t('Mã tham chiếu'),
        type: 'text',
        colSpan: 6,
      },
      {
        name: 'paymentTimeFrom',
        label: t('Thời gian bắt đầu'),
        type: 'date',
        colSpan: 6,
      },
      {
        name: 'paymentTimeTo',
        label: t('Thời gian kết thúc'),
        type: 'date',
        colSpan: 6,
      },
      {
        name: 'cashier',
        label: t('Thu ngân'),
        type: 'text',
        colSpan: 6,
      },
      // {
      //   name: 'calculationUnitId',
      //   label: t('Đơn vị'),
      //   type: 'autocomplete',
      //   options: getInvoicesAll?.data?.map((item: any) => ({
      //     label: item.title,
      //     value: item.id,
      //   })),
      //   colSpan: 6,
      // },
      {
        name: 'invoiceType',
        label: t('Loại hình'),
        type: 'number',
        colSpan: 6,
      },
      {
        name: 'tableArea',
        label: t('Tên đơn/ Khu vực'),
        type: 'text',
        colSpan: 6,
      },
      {
        name: 'sourcePartner',
        label: t('Nguồn/ Đối tác'),
        type: 'text',
        colSpan: 6,
      },
      {
        name: 'paymentMethod',
        label: t('Phương thức thanh toán'),
        type: 'number',
        colSpan: 6,
      },
      {
        name: 'numberOfCustomer',
        label: t('Số khách hàng'),
        type: 'number',
        colSpan: 6,
      },
      // {
      //   name: 'totalAmount',
      //   label: t('Tổng tiền'),
      //   type: 'number',
      //   colSpan: 6,
      // },
      {
        name: 'status',
        label: t('Trạng thái thanh toán'),
        type: 'number',
        colSpan: 6,
      },
    ],
    [getInvoicesAll?.data, t],
  );

  const createSchema = useMemo(
    () =>
      yup.object().shape({
        referenceCode: yup.string().required(t('Trường này là bắt buộc')),
        // restaurantId: yup
        //   .string()
        //   .optional()
        //   .required(t('Trường này là bắt buộc')),
        // referObjectId: yup
        //   .string()
        //   .optional()
        //   .required(t('Trường này là bắt buộc')),
        // calculationUnitId: yup
        //   .string()
        //   .optional()
        //   .required(t('Trường này là bắt buộc')),
        // stock: yup.number().required(t('Trường này là bắt buộc')),
      }),
    [t],
  );

  return (
    <BaseCrudContent
      title={t('Tất cả hoá đơn')}
      name={'invoice'}
      unitName={t('Tất cả hoá đơn')}
      service={invoiceListService}
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

export default InvoiceAllPage;
