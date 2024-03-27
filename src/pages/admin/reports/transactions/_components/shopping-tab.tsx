import { Chip, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';

import BaseCrudContent from '@/base/base-crud-content';
import useTranslation from '@/hooks/use-translation';

import transactionReportService, {
  DeliveryProvider,
  PaymentMethod,
} from '../_services/transaction-report.service';

const ShoppingTab = () => {
  const { t } = useTranslation();

  return (
    <BaseCrudContent
      title=""
      name="transaction-report"
      service={transactionReportService}
      hideAddBtn
      hideImportExcelBtn
      hideExportExcelBtn
      hideDeleteManyBtn
      hideEditAction
      hideDeleteAction
      unitName={t('Giao dịch').toLowerCase()}
      filterFields={[
        {
          name: 'dateStart',
          label: t('Từ ngày'),
          type: 'date',
          colSpan: 6,
        },
        {
          name: 'dateEnd',
          label: t('Đến ngày'),
          type: 'date',
          colSpan: 6,
        },
        {
          name: 'deliveryProvider',
          label: t('Đơn vị vận chuyển'),
          type: 'select',
          options: DeliveryProvider,
          colSpan: 6,
        },
        {
          name: 'paymentMethod',
          label: t('Phương thức thanh toán'),
          type: 'select',
          options: PaymentMethod,
          colSpan: 6,
        },
      ]}
      sortFields={[
        { label: t('Ngày tạo'), value: 'dateCreated' },
        { label: t('Giá sau cùng'), value: 'totalFinal' },
      ]}
      columns={[
        {
          headerName: t('Mã'),
          field: 'id',
          width: 75,
        },
        {
          headerName: t('Mã đơn hàng'),
          field: 'orderCode',
          flex: 1,
          renderCell: (params) => {
            return (
              <Stack sx={{ width: '100%' }}>
                <Typography variant="subtitle2" fontWeight={600}>
                  {params.row.orderCode}
                </Typography>
                <Typography fontSize={13} color="GrayText">
                  {params.row.providerName}
                </Typography>
              </Stack>
            );
          },
        },
        {
          headerName: t('Thời gian đặt'),
          field: 'dateCreated',
          flex: 1,
          maxWidth: 175,
          valueGetter: (params) => {
            return dayjs(params.row.dateCreated).format('DD/MM/YYYY HH:mm:ss');
          },
        },
        {
          headerName: t('Thời gian hoàn thành'),
          field: 'dateCompleted',
          flex: 1,
          maxWidth: 175,
          valueGetter: (params) => {
            return dayjs(params.row.dateCompleted).format(
              'DD/MM/YYYY HH:mm:ss',
            );
          },
        },
        {
          headerName: t('Chi phí'),
          field: 'totalFinal',
          flex: 1,
          maxWidth: 220,
          renderCell: (params) => {
            return (
              <Stack sx={{ width: '100%' }} spacing={0.25} py={0.5}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="subtitle2">
                    {t('Giá đơn hàng')}
                  </Typography>
                  <Typography variant="subtitle2">
                    {params.row.totalRaw.toLocaleString()}
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="subtitle2">
                    {t('Phí vận chuyển')}
                  </Typography>
                  <Typography variant="subtitle2" color="warning.main">
                    {params.row.totalShip.toLocaleString()}
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="subtitle2">
                    {t('Voucher (seller)')}
                  </Typography>
                  <Typography variant="subtitle2" color="GrayText">
                    {params.row.totalVoucherShop.toLocaleString()}
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="subtitle2">
                    {t('Voucher (sàn)')}
                  </Typography>
                  <Typography variant="subtitle2" color="error.main">
                    {params.row.totalVoucherAdmin.toLocaleString()}
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="subtitle2">
                    {t('Giá sau cùng')}
                  </Typography>
                  <Typography
                    fontWeight="bold"
                    variant="subtitle2"
                    color="success.main"
                  >
                    {params.row.totalFinal.toLocaleString()}
                  </Typography>
                </Stack>
              </Stack>
            );
          },
        },
        {
          headerName: t('Mã vận đơn'),
          field: 'deliveryProvider',
          flex: 1,
          maxWidth: 150,
          renderCell: (params) => {
            const provider = DeliveryProvider.find(
              (item) => item.value === params.row.deliveryProvider,
            );

            return (
              <Stack sx={{ width: '100%' }} spacing={0.25} py={0.5}>
                <Typography variant="subtitle2" textAlign="center">
                  {params.row.deliveryProviderCode}
                </Typography>
                <Chip
                  variant="soft"
                  label={provider?.label || t('Chưa có')}
                  color={provider?.color || ('default' as any)}
                  size="small"
                />
              </Stack>
            );
          },
        },
        {
          headerName: t('Mã thanh toán'),
          field: 'paymentCode',
          flex: 1,
          maxWidth: 150,
          renderCell: (params) => {
            const method = PaymentMethod.find(
              (item) => item.value === params.row.paymentMethod,
            );

            return (
              <Stack sx={{ width: '100%' }} spacing={0.25} py={0.5}>
                <Typography variant="subtitle2" textAlign="center">
                  {params.row.paymentCode || t('Chưa có')}
                </Typography>
                <Chip
                  variant="soft"
                  label={method?.label || t('Chưa có')}
                  color={method?.color || ('default' as any)}
                  size="small"
                />
              </Stack>
            );
          },
        },
      ]}
      beautyView
      viewFields={[
        {
          label: t('Thông tin cơ bản'),
          type: 'label',
        },
        {
          name: 'id',
          label: t('Mã'),
          type: 'text',
          colSpan: 12,
        },
        {
          name: 'orderCode',
          label: t('Mã đơn hàng'),
          type: 'text',
          colSpan: 6,
        },
        {
          name: 'providerName',
          label: t('Nhà cung cấp'),
          type: 'text',
          colSpan: 6,
        },
        {
          name: 'dateCreated',
          label: t('Thời gian đặt'),
          type: 'text',
          colSpan: 6,
          formatValue: (value) => dayjs(value).format('DD/MM/YYYY HH:mm:ss'),
        },
        {
          name: 'dateCompleted',
          label: t('Thời gian hoàn thành'),
          type: 'text',
          colSpan: 6,
          formatValue: (value) => dayjs(value).format('DD/MM/YYYY HH:mm:ss'),
        },
        {
          label: t('Chi phí'),
          type: 'label',
        },
        {
          name: 'totalRaw',
          label: t('Giá đơn hàng'),
          type: 'text',
          colSpan: 6,
          formatValue: (value) => value.toLocaleString(),
        },
        {
          name: 'totalShip',
          label: t('Phí vận chuyển'),
          type: 'text',
          colSpan: 6,
          formatValue: (value) => value.toLocaleString(),
        },
        {
          name: 'totalVoucherShop',
          label: t('Voucher (seller)'),
          type: 'text',
          colSpan: 6,
          formatValue: (value) => value.toLocaleString(),
        },
        {
          name: 'totalVoucherAdmin',
          label: t('Voucher (sàn)'),
          type: 'text',
          colSpan: 6,
          formatValue: (value) => value.toLocaleString(),
        },
        {
          name: 'totalFinal',
          label: t('Giá sau cùng'),
          type: 'text',
          colSpan: 12,
          formatValue: (value) => value.toLocaleString(),
        },
        {
          label: t('Thông tin giao hàng và thanh toán'),
          type: 'label',
        },
        {
          name: 'deliveryProvider',
          label: t('Đơn vị vận chuyển'),
          type: 'text',
          colSpan: 6,
          formatValue: (value) => {
            const provider = DeliveryProvider.find(
              (item) => item.value === value,
            );

            return provider?.label || t('Chưa có');
          },
        },
        {
          name: 'deliveryProviderCode',
          label: t('Mã vận đơn'),
          type: 'text',
          colSpan: 6,
          formatValue: (value) => value.toLocaleString(),
        },
        {
          name: 'paymentMethod',
          label: t('Phương thức thanh toán'),
          type: 'text',
          colSpan: 6,
          formatValue: (value) => {
            const method = PaymentMethod.find((item) => item.value === value);

            return method?.label || t('Chưa có');
          },
        },
        {
          name: 'paymentCode',
          label: t('Mã thanh toán'),
          type: 'text',
          colSpan: 6,
        },
      ]}
    ></BaseCrudContent>
  );
};

export default ShoppingTab;
