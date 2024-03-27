import BaseTabsPage from '@/base/base-tabs-page';
import useTranslation from '@/hooks/use-translation';

import TaiSanChiTietTab from './_components/tai-san-chi-tiet-tab';
import TaiSanTab from './_components/tai-san-tab';

const AssetStaticalPage = () => {
  const { t } = useTranslation();

  return (
    <BaseTabsPage
      name=""
      title={t('Thống kê tài sản')}
      tabs={[
        {
          label: t('Thống kê tài sản'),
          Component: <TaiSanTab />,
        },
        {
          label: t('Tài sản chi tiết'),
          Component: <TaiSanChiTietTab />,
        },
      ]}
    />
  );
};

export default AssetStaticalPage;
