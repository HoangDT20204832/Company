import {
  AdminPanelSettingsTwoTone,
  HomeTwoTone as HomeIcon,
  Inventory as InventoryIcon,
  MenuOpenTwoTone as OpenMenuIcon,
  SettingsTwoTone,
} from '@mui/icons-material';
import {
  Box,
  Drawer,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import * as R from 'rambda';
import { useContext, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Logo from '@/components/logo';
import Scrollbar from '@/components/scrollbar';
import { ADMIN_LAYOUT, APP_NAME } from '@/configs/constant.config';
import { ALL_PERMISSIONS } from '@/configs/permissions.constant';
import useTranslation from '@/hooks/use-translation';
import { AbpContext } from '@/services/abp/abp.context';

import SideNavItem from './side-nav-item';

type TSideNavItem = {
  title: string;
  path?: string;
  basePath?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: React.ReactNode;
  children?: TSideNavItem[];
  permissions?: string[];
};

type TSideNavProps = {
  tenantName?: string;
  open: boolean;
  onClose: () => void;
  openNavLg: boolean;
  setOpenNavLg: (_open: boolean) => void;
};

const checkPermission = (
  grantedPermissions: string[],
  permissions?: string[],
) => {
  if (permissions?.length === 0) return true;

  return R.intersection(grantedPermissions, permissions || []).length > 0;
};

const SideNav = (props: TSideNavProps) => {
  const { open, onClose, openNavLg, setOpenNavLg } = props;

  const { t } = useTranslation();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [abpState] = useContext(AbpContext);

  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up('lg'));

  const items = useMemo<TSideNavItem[]>(
    () => [
      {
        title: 'Examples',
        basePath: '/examples',
        icon: <HomeIcon />,
        children: [
          {
            title: 'Examples tenants',
            path: '/examples/tenants',
            permissions: [],
          },
          {
            title: 'Examples single',
            path: '/examples/single',
            permissions: [],
          },
          {
            title: 'Examples With Tabs',
            path: '/examples/with-tabs',
            permissions: [],
          },
          {
            title: 'Example basic',
            path: '/examples/basic',
            permissions: [],
          },
          {
            title: 'Example With Custom Actions',
            path: '/examples/with-custom-actions',
            permissions: [],
          },
          {
            title: 'Example With Custom Form',
            path: '/examples/with-custom-form',
            permissions: [],
          },
        ],
      },
      {
        title: t('Tồn kho'),
        basePath: '/inventory',
        icon: <InventoryIcon />,
        children: [
          {
            title: t('Danh sách tồn kho'),
            path: '/inventory/inventory-list',
            permissions: [],
          },
        ],
      },
////////Hoá đơn
      {
        title: t('Hoá đơn'),
        basePath: '/invoice',
        icon: <InventoryIcon />,
        children: [
          {
            title: t('Danh sách hoá đơn'),
            path: '/invoice/invoice-list',
            permissions: [],
          },
        ],
      },

      {
        title: t('Quản trị hệ thống'),
        basePath: '/system',
        icon: <AdminPanelSettingsTwoTone />,
        children: [
          {
            title: t('Quản lý tài khoản'),
            path: '/system/accounts',
            permissions: [
              ALL_PERMISSIONS.Pages_Users,
              ALL_PERMISSIONS.Pages_SystemAdministration_AccountManagement_GetAll,
            ],
          },
          {
            title: t('Phân quyền'),
            path: '/system/roles',
            permissions: [
              ALL_PERMISSIONS.Pages_Roles,
              ALL_PERMISSIONS.Pages_SystemAdministration_Roles_GetAll,
            ],
          },
          {
            title: t('Quản lý tenant'),
            path: '/system/tenants',
            permissions: [ALL_PERMISSIONS.Pages_Tenants],
          },
        ],
      },
      {
        title: t('Cài đặt hệ thống'),
        basePath: '/settings',
        icon: <SettingsTwoTone />,
        children: [
          {
            title: t('Thông báo'),
            path: '/settings/notifications',
            permissions: [ALL_PERMISSIONS.Pages_SmartSocial_Notification],
          },
          {
            title: t('Cấu hình thanh toán'),
            path: '/settings/payments',
            permissions: [ALL_PERMISSIONS.Data_Admin],
          },
          {
            title: 'Feedback',
            path: '/settings/feedbacks',
            permissions: [ALL_PERMISSIONS.Pages_SmartSocial_AppFeedback],
          },
          {
            title: t('Quản lý hình ảnh'),
            path: '/settings/image-supervise',
            permissions: [ALL_PERMISSIONS.Pages_Settings_Images_GetAll],
          },
          {
            title: t('Tài khoản của tôi'),
            path: '/settings/my-account',
            permissions: [],
          },
        ],
      },
    ],
    [t],
  );

  const content = (
    <Scrollbar
      sx={{
        height: '100%',
        '& .simplebar-content': {
          height: '100%',
        },
        '& .simplebar-scrollbar:before': {
          background: 'grey.400',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          sx={{
            px: 1,
            cursor: 'pointer',
            boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
          }}
          onClick={() => navigate('/')}
        >
          <Box
            sx={{
              display: 'inline-flex',
            }}
          >
            <Logo />
          </Box>

          <Typography
            variant="h5"
            sx={(theme) => ({
              transition: theme.transitions.create('color'),
              ':hover': {
                color: theme.palette.primary.light,
              },
            })}
          >
            {APP_NAME}
          </Typography>
        </Box>

        <Box
          component="nav"
          sx={{
            flexGrow: 1,
            px: 1,
            py: 1,
          }}
        >
          <Stack
            component="ul"
            spacing={0.5}
            sx={{
              listStyle: 'none',
              p: 0,
              m: 0,
            }}
          >
            {items
              .filter(
                (item) =>
                  checkPermission(abpState.permissions, item.permissions) ||
                  item.children?.some((child) =>
                    checkPermission(abpState.permissions, child.permissions),
                  ),
              )
              .map((item, index) => {
                const active = item.path
                  ? pathname === item.path
                  : item.basePath
                    ? item?.children?.some((child) => pathname === child.path)
                    : false;

                return (
                  <SideNavItem
                    active={active}
                    disabled={item.disabled || false}
                    external={item.external || false}
                    icon={item.icon}
                    key={index}
                    path={item.path}
                    title={item.title}
                    itemChildren={item?.children
                      ?.filter((child) =>
                        checkPermission(
                          abpState.permissions,
                          child.permissions,
                        ),
                      )
                      ?.map((child) => ({
                        active: false,
                        disabled: child.disabled || false,
                        external: child.external || false,
                        icon: child.icon,
                        path: child.path,
                        title: child.title,
                        itemChildren: child?.children,
                      }))}
                  />
                );
              })}
          </Stack>
        </Box>
      </Box>
    </Scrollbar>
  );

  if (lgUp) {
    return (
      <Box>
        <IconButton
          sx={{
            position: 'fixed',
            left: openNavLg ? 244 : 24,
            top: 12,
            zIndex: (theme) => theme.zIndex.appBar + 101,
          }}
          onClick={() => setOpenNavLg(!openNavLg)}
        >
          {openNavLg ? (
            <OpenMenuIcon />
          ) : (
            <OpenMenuIcon sx={{ transform: 'scaleX(-1)' }} />
          )}
        </IconButton>
        <Drawer
          anchor="left"
          open={openNavLg}
          onClose={() => setOpenNavLg(false)}
          PaperProps={{
            sx: {
              backgroundColor: '#051e34',
              color: theme.palette.common.white,
              width: ADMIN_LAYOUT.SIDE_NAV_WIDTH,
              backgroundImage: `url('/assets/images/nav_nachos_2x.png')`,
              backgroundPosition: 'left 0 bottom 0',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '300px 556px',
            },
          }}
          variant="persistent"
        >
          {content}
        </Drawer>
      </Box>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: theme.palette.grey[900],
          color: theme.palette.common.white,
          width: ADMIN_LAYOUT.SIDE_NAV_WIDTH,
        },
        elevation: 2,
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

export default SideNav;
