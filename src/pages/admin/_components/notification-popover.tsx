import { FiberManualRecord as DotIcon } from '@mui/icons-material';
import {
  Box,
  Button,
  Divider,
  Popover,
  PopoverProps,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import useTranslation from '@/hooks/use-translation';
import { ENotificationState } from '@/services/notifications/notification.model';
import notificationService from '@/services/notifications/notifications.service';
import { formatFromNow } from '@/services/utils-date';

type TNotifPopoverProps = Pick<PopoverProps, 'open' | 'onClose' | 'anchorEl'>;

const NotificationPopover = ({
  open,
  anchorEl,
  onClose,
}: TNotifPopoverProps) => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const { data: notifications } = useQuery({
    queryKey: ['notifications/getAll', 0, 10],
    queryFn: () =>
      notificationService.getAllUserNotification({
        skipCount: 0,
        maxResultCount: 10,
      }),
  });

  return (
    <Popover
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{
        horizontal: 'right',
        vertical: 'bottom',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      disableAutoFocus
      disablePortal
    >
      <Box
        sx={{
          backgroundColor: 'white',
          padding: 1,
          maxHeight: '50vh',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'sticky',
            top: 0,
            backgroundColor: 'white',
          }}
        >
          <Typography variant="h6" fontSize={22}>
            {t('Thông báo')}
          </Typography>

          <Button
            onClick={() => {
              navigate('/notifications');
            }}
          >
            {t('Xem tất cả')}
          </Button>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box>
          {notifications?.items?.map((item) =>
            !item ? (
              <></>
            ) : (
              <Box
                key={item.id}
                sx={{
                  ':hover': {
                    backgroundColor: 'grey.200',
                    cursor: 'pointer',
                  },
                  padding: 1,
                  borderRadius: 1,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Box>
                  <Typography variant="subtitle1" fontSize={18}>
                    {item.notification.notificationName}
                  </Typography>
                  <Typography variant="body2" fontSize={14}>
                    {item.notification.data?.message}
                  </Typography>
                  <Typography variant="caption" fontSize={14}>
                    {formatFromNow(item.notification.creationTime)}
                  </Typography>
                </Box>

                {item.state === ENotificationState.UNREAD && (
                  <DotIcon fontSize="small" color="warning" />
                )}
              </Box>
            ),
          )}
        </Box>

        {notifications?.items?.length && <Divider sx={{ my: 1 }} />}

        <Box sx={{ py: 1 }} />
      </Box>
    </Popover>
  );
};

export default NotificationPopover;
