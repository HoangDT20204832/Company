import BaseTabsPage from '@/base/base-tabs-page';

import EWTPanel1 from './_components/tab1';
import EWTPanel2 from './_components/tab2';
import EWTPanel3 from './_components/tab3';
import TabTree from './_components/tab-tree';

const ExampleWithTab = () => {
  return (
    <BaseTabsPage
      title="Example BasicPage"
      name="exampleBasicPage"
      tabs={[
        {
          label: 'Tab 1',
          Component: <EWTPanel1 />,
        },
        {
          label: 'Tab 2',
          Component: <EWTPanel2 />,
        },
        {
          label: 'Tab 3',
          Component: <EWTPanel3 />,
        },
        {
          label: 'Phân quyền',
          Component: <TabTree />,
        },
      ]}
    />
  );
};

export default ExampleWithTab;
