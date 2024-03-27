import BaseTabsPage from '@/base/base-tabs-page';
import useTranslation from '@/hooks/use-translation';

import MomoTab from './_components/momo-tab';
import OnepayTab from './_components/onepay-tab';

const PaymentSettingsPage = () => {
  const { t } = useTranslation();

  return (
    <BaseTabsPage
      title={t('Cấu hình thanh toán')}
      name={''}
      tabs={[
        {
          label: t('Onepay Merchant'),
          Component: <OnepayTab />,
        },
        {
          label: t('Tài khoản Momo'),
          Component: <MomoTab />,
        },
      ]}
    />
  );
};

export default PaymentSettingsPage;
