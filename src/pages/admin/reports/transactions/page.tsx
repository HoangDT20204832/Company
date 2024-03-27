import BaseTabsPage from '@/base/base-tabs-page';
import useTranslation from '@/hooks/use-translation';

import ShoppingTab from './_components/shopping-tab';

const TransactionReportPage = () => {
  const { t } = useTranslation();

  return (
    <BaseTabsPage
      tabs={[{ label: t('Sàn TMĐT'), Component: <ShoppingTab /> }]}
      title={t('Thống kê giao dịch')}
      name={''}
    ></BaseTabsPage>
  );
};

export default TransactionReportPage;
