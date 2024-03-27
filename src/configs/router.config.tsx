
import { createBrowserRouter } from 'react-router-dom';

import ExamplePage from '@/pages/admin/examples/single/page';
import TenantPage from '@/pages/admin/examples/tenants/page';
import ExampleWithCustomActionsPage from '@/pages/admin/examples/with-custom-actions/page';
import ExampleWidthCustomForm from '@/pages/admin/examples/with-custom-form/page';
import ExampleBasicPage from '@/pages/admin/examples/with-tabs/page';
import ExampleWithTab from '@/pages/admin/examples/with-tabs/page';
import AdminPage from '@/pages/admin/index.page';
import InventoryListTab from '@/pages/admin/inventory/inventory-list/page';
import AdminLayout from '@/pages/admin/layout';
import AssetStaticalPage from '@/pages/admin/reports/asset/page';
import ReportCitizenPage from '@/pages/admin/reports/citizen/page';
import ReportInvoicePage from '@/pages/admin/reports/invoices/page';
import ReportOverViewPage from '@/pages/admin/reports/overview/page';
import ReflectPage from '@/pages/admin/reports/reflect/page';
import TransactionReportPage from '@/pages/admin/reports/transactions/page';
import SettingFeedbackPage from '@/pages/admin/settings/feedback/page';
import ImageSupervisePage from '@/pages/admin/settings/image-supervise/index.page';
import MyAccountPage from '@/pages/admin/settings/my-account/index.page';
import SettingNotifPage from '@/pages/admin/settings/notifications/page';
import PaymentSettingsPage from '@/pages/admin/settings/payments/index.page';
import SystemAccountsPage from '@/pages/admin/system/accounts/page';
import SystemRolesPage from '@/pages/admin/system/roles/page';
import AuthLayout from '@/pages/auth/layout';
import LoginPage from '@/pages/auth/login.page';
import NotFoundPage from '@/pages/not-found.page';

export const router = createBrowserRouter([
  {
    path: '',
    element: <AdminLayout />,
    children: [
      { path: '/', element: <AdminPage /> },
      {
        path: '/system',
        children: [
          { path: 'accounts', element: <SystemAccountsPage /> },
          { path: 'roles', element: <SystemRolesPage /> },
        ],
      },
      {
        path: '/examples',
        children: [
          { path: 'tenants', element: <TenantPage /> },
          { path: 'single', element: <ExamplePage /> },
          { path: 'with-tabs', element: <ExampleWithTab /> },
          { path: 'basic', element: <ExampleBasicPage /> },
          {
            path: 'with-custom-actions',
            element: <ExampleWithCustomActionsPage />,
          },
          { path: 'with-custom-form', element: <ExampleWidthCustomForm /> },
        ],
      },
      {
        path: 'inventory',
        children: [{ path: 'inventory-list', element: <InventoryListTab /> }],
      },
      {
        path: '/settings',
        children: [
          { path: 'my-account', element: <MyAccountPage /> },
          { path: 'payments', element: <PaymentSettingsPage /> },
          { path: 'image-supervise', element: <ImageSupervisePage /> },
          { path: 'notifications', element: <SettingNotifPage /> },
          { path: 'feedbacks', element: <SettingFeedbackPage /> },
        ],
      },
      {
        path: '/reports',
        children: [
          { path: 'overview', element: <ReportOverViewPage /> },
          { path: 'transactions', element: <TransactionReportPage /> },
          { path: 'invoices', element: <ReportInvoicePage /> },
          { path: 'asset', element: <AssetStaticalPage /> },
          { path: 'reflect', element: <ReflectPage /> },
          { path: 'citizen', element: <ReportCitizenPage /> },
        ],
      },
    ],
  },
  {
    path: 'auth',
    element: <AuthLayout />,
    children: [{ path: 'login', element: <LoginPage /> }],
  },
  { path: '/404', element: <NotFoundPage /> },
  { path: '*', element: <NotFoundPage /> },
]);
