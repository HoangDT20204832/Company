import BaseTabsPage from '@/base/base-tabs-page';
import useTranslation from '@/hooks/use-translation';

import IngredientPage from './_components/ingredient';

const InventoryListTab = () => {
  const { t } = useTranslation();

  return (
    <BaseTabsPage
      title={t('Danh sách tồn kho')}
      name="inventory"
      tabs={[
        {
          label: t('Nguyên liệu'),
          Component: <IngredientPage />,
        },
        {
          label: t('Mặt hàng'),
          Component: <IngredientPage />,
        },
      ]}
    />
  );
};

export default InventoryListTab;
