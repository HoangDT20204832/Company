import { TabContext, TabList, TabPanel } from '@mui/lab';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tab,
  alpha,
  styled,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import DialogExtend from '@/components/dialog-extend';
import useTranslation from '@/hooks/use-translation';
import taiSanService from '@/services/assets/services/taisan.service';

import NhapXuatList from './list-nhap-xuat';

export type TViewNhapXuatModalProps = {
  open: boolean;
  onClose: () => void;
  idTaiSan: number;
};

const ViewNhapXuatModal = (props: TViewNhapXuatModalProps) => {
  const { open, onClose, idTaiSan } = props;
  const { t } = useTranslation();
  const { data: dataNhapXuats } = useQuery({
    queryKey: ['dataNhapXuats' + idTaiSan],
    queryFn: () => taiSanService.getDataNhapXuat<any>(idTaiSan),
  });
  useEffect(() => {}, [idTaiSan]);
  console.log('dataNhapXuats', idTaiSan);
  const [tab, setTab] = useState('0');
  const tabs = [
    {
      label: t('Tất cả'),
      Component: <NhapXuatList data={dataNhapXuats?.data} />,
    },
    {
      label: t('Nhập kho'),
      Component: (
        <NhapXuatList
          data={dataNhapXuats?.data?.filter(
            (x: { type: number }) => x.type == 1,
          )}
        />
      ),
    },
    {
      label: 'Xuất kho',
      Component: (
        <NhapXuatList
          data={dataNhapXuats?.data?.filter((x: any) => x.type == 2)}
        />
      ),
    },
  ];
  return (
    <DialogExtend maxWidth="lg" open={open} onClose={onClose}>
      <DialogTitle>{t('Thống kê nhập xuất')}</DialogTitle>

      <DialogContent>
        <TabContext value={tab}>
          <StyledContentWrapper>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                px: 1,
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    height: '1px',
                    width: '100%',
                    backgroundColor: (theme) =>
                      alpha(theme.palette.primary.main, 0.15),
                  },
                }}
              >
                <TabList
                  onChange={(_, value: string) => {
                    setTab(value);
                  }}
                >
                  {tabs.map((tab, index) => (
                    <Tab
                      key={`view-${index}`}
                      label={tab.label}
                      value={index.toString()}
                    />
                  ))}
                </TabList>
              </Box>
            </Box>

            {tabs.map((tab, index) => (
              <TabPanel
                style={{ padding: 0 }}
                key={index}
                value={index.toString()}
              >
                {tab.Component}
              </TabPanel>
            ))}
          </StyledContentWrapper>
        </TabContext>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>{t('Đóng')}</Button>
      </DialogActions>
    </DialogExtend>
  );
};
const StyledContentWrapper = styled('main')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: 0,
  flex: '1 1 auto',
  paddingBottom: theme.spacing(2),
}));
export default ViewNhapXuatModal;
