import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import useTranslation from '@/hooks/use-translation';
import { formatCurrency } from '@/services/utils';
import { formatDate } from '@/services/utils-date';

const NhapXuatList = ({ data }: { data: any }) => {
  const { t } = useTranslation();

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t('STT')}</TableCell>
            <TableCell>{t('Hình thức')}</TableCell>
            <TableCell>{t('Ngày thực hiện')}</TableCell>
            <TableCell>{t('Số lượng')}</TableCell>
            <TableCell>{t('Đơn vị tính')}</TableCell>
            <TableCell>{t('Giá')}</TableCell>
            <TableCell>{t('Thành tiền')}</TableCell>
            <TableCell>{t('Tổng số lượng')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data?.map((item: any, index: any) => (
              <TableRow
                key={index}
                sx={{ backgroundColor: index % 2 ? 'grey.100' : 'white' }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Chip
                    label={item.type == 1 ? t('Nhập kho') : t('Xuất kho')}
                    variant="soft"
                    color={item.type == 1 ? 'success' : 'error'}
                  />
                </TableCell>

                <TableCell>{formatDate(item.created)}</TableCell>
                <TableCell>{item.soLuong}</TableCell>
                <TableCell>{item.donViTinh}</TableCell>
                <TableCell>{formatCurrency(item.donGia ?? 0)}</TableCell>
                <TableCell>{formatCurrency(item.thanhTien ?? 0)}</TableCell>
                <TableCell>{item.tongSoLuong}</TableCell>
                {/* <TableCell>{formatDate(item.dateStart)}</TableCell> */}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default NhapXuatList;
