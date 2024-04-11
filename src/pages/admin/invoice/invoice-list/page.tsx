import BaseTabsPage from '@/base/base-tabs-page';
import useTranslation from '@/hooks/use-translation';

import IngredientPage from './_components/invoice-all';
import InvoiceAllPage from './_components/invoice-all';

const InvoiceListTab = () => {
  const { t } = useTranslation();

  return (
    <BaseTabsPage
      title={t('Danh sách hoá đơn')}
      name="inventory"
      tabs={[
        {
          label: t('Tất cả hoá đơn'),
          Component: <InvoiceAllPage/>,
        },
        {
          label: t('Mặt hàng'),
          Component: <IngredientPage />,
        },
      ]}
    />
  );
};

export default InvoiceListTab;
