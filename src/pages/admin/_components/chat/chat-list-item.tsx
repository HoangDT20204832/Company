import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {
  Avatar,
  AvatarGroup,
  Badge,
  Box,
  IconButton,
  Typography,
  alpha,
  styled,
} from '@mui/material';
import { useId, useMemo } from 'react';

import { TChatItem, TGroupChatConversation } from '@/services/chat/chat.model';
import { dayjs, formatDate } from '@/services/utils-date';

type TItemChat = {
  variant: 'One';
  item: TChatItem;
};

type TItemGroup = {
  variant: 'Group';
  item: TGroupChatConversation;
};

type TChatListItemProps = {
  active?: boolean;
  onClick?: () => void;
  mode?: 'PAGE' | 'POPOVER';
} & (TItemChat | TItemGroup);

const ChatListItem = ({
  onClick,
  active,
  mode = 'PAGE',
  ...vItem
}: TChatListItemProps) => {
  const uid = useId();
  const previewMessage = useMemo(() => {
    const typeMessage = vItem.item.lastMessage?.typeMessage;
    if (typeMessage === 4) return `[Tệp tin]`;
    if (typeMessage === 2) return `[Hình ảnh]`;
    return vItem.item.lastMessage?.message;
  }, [vItem]);

  return (
    <ChatListItemStyled
      className={active ? 'active' : undefined}
      onClick={onClick}
    >
      {vItem.variant === 'One' && (
        <Badge
          className="avatar-wrapper"
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant="dot"
          color={vItem.item.isOnline ? 'success' : 'default'}
        >
          <Avatar
            src={
              vItem.item.friendProfilePictureId ||
              vItem.item.friendInfo?.imageUrl
            }
            alt="Avatar"
            sx={{ width: 50, height: 50 }}
          >
            {vItem.item.friendInfo?.fullName?.[0]}
          </Avatar>
        </Badge>
      )}
      {vItem.variant === 'Group' && (
        <Badge
          className="avatar-wrapper"
          overlap="rectangular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant="dot"
          color={vItem.item.isOnline ? 'success' : 'default'}
        >
          <Avatar
            src={vItem.item.groupImageUrl}
            alt="Avatar"
            sx={{ width: 50, height: 50 }}
            variant="rounded"
          >
            {vItem.item?.name?.[0] || '---'}
          </Avatar>
        </Badge>
      )}
      <div className="detail-wrapper">
        <div className="name-wrapper">
          {vItem.variant === 'One' && (
            <Typography
              className="msg-username"
              variant="caption"
              fontSize={21}
            >
              {vItem.item.friendInfo?.fullName || '---'}
            </Typography>
          )}
          {vItem.variant === 'Group' && (
            <Typography
              className="msg-username"
              variant="caption"
              fontSize={21}
            >
              {vItem.item.name || '---'}
            </Typography>
          )}
          <div className="actions-wrapper">
            <IconButton size="small" className="btn-action">
              <MoreHorizIcon fontSize="small" />
            </IconButton>
            <Badge
              badgeContent={vItem.item.unreadMessageCount}
              variant="dot"
              color="info"
              anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
              sx={{ zIndex: -1 }}
            />
          </div>
        </div>
        {vItem.item.lastMessage ? (
          <div className="content-wrapper">
            <Typography
              className="msg-message"
              variant="body2"
              fontWeight={vItem.item.unreadMessageCount ? 600 : 400}
              noWrap
            >
              {`${vItem.item.lastMessage?.side === 1 ? 'Bạn: ' : ''}`}
              {previewMessage}
            </Typography>
            <Typography className="msg-date" noWrap>
              <span style={{ margin: '0 2px' }}>•</span>
              {dayjs(vItem.item.lastMessage.creationTime).isBefore(
                dayjs().startOf('day'),
              )
                ? formatDate(vItem.item.lastMessage.creationTime, 'DD/MM/YY')
                : formatDate(vItem.item.lastMessage.creationTime, 'HH:mm')}
            </Typography>
          </div>
        ) : (
          <div className="content-wrapper">
            <Typography className="msg-date" noWrap>
              {`Đã tạo lúc: ${formatDate(
                vItem.item.creationTime,
                'DD/MM/YY HH:mm',
              )}`}
            </Typography>
          </div>
        )}

        {vItem.variant === 'Group' && (
          <div className="actions-br">
            {mode === 'PAGE' ? (
              vItem.item.members?.length ? (
                <AvatarGroup max={3}>
                  {vItem.item.members.map((item, index) => (
                    <Avatar
                      key={uid + 'members' + index}
                      src={
                        item.friendProfilePictureId || item.friendInfo?.imageUrl
                      }
                      variant="circular"
                      style={{ width: 18, height: 18 }}
                    >
                      {item.friendInfo?.fullName?.[0]}
                    </Avatar>
                  ))}
                </AvatarGroup>
              ) : (
                <Typography fontSize={12} style={{ opacity: 0.45 }}>
                  {vItem.item.members?.length || 0} thành viên
                </Typography>
              )
            ) : (
              <></>
            )}
          </div>
        )}
      </div>
    </ChatListItemStyled>
  );
};

const ChatListItemStyled = styled(Box)`
  --msg-hover-bg: rgba(229, 229, 229, 0.35);
  --theme-color: ${({ theme }) => theme.palette.primary.main};
  --theme-bg-color: ${({ theme }) => theme.palette.background.paper};
  --msg-date: #c0c7d2;
  display: flex;
  align-items: center;
  height: 80px;
  padding: 0 12px 0 10px;
  cursor: pointer;
  transition: 0.2s;
  position: relative;
  user-select: none;
  & > .avatar-wrapper {
    .MuiBadge-badge {
      box-shadow: 0 0 0 2px var(--theme-bg-color);
    }
    .MuiAvatar-root {
      box-shadow: ${({ theme }) =>
        `0 0 0 1px ${alpha(theme.palette.primary.dark, 0.25)}`};
      background-color: ${({ theme }) =>
        alpha(theme.palette.primary.main, 0.25)};
    }
  }
  & > .detail-wrapper {
    display: flex;
    flex-direction: column;
    margin-left: 12px;
    min-width: 0px;
    flex: 1 1 auto;
    position: relative;
    .name-wrapper {
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-between;
      align-items: center;
      gap: 3px;
      margin-bottom: 2px;
      position: relative;
      & > .actions-wrapper {
        position: absolute;
        right: -4px;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        justify-content: center;
        align-items: center;
        width: 24px;
        height: 24px;
      }
      & .btn-action {
        display: none;
        user-select: none;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .msg-username {
      font-size: 16px;
      margin-bottom: auto;
    }
    .msg-date {
      flex-shrink: 0;
      font-size: 12px;
      opacity: 0.45;
    }
    .content-wrapper {
      display: flex;
      flex-wrap: nowrap;
      justify-content: flex-start;
      align-items: center;
      position: relative;
    }
    .actions-br {
      position: absolute;
      bottom: 0;
      right: 0;
    }
  }
  &:hover {
    background-color: var(--msg-hover-bg);
    & > .detail-wrapper {
      .name-wrapper .btn-action {
        display: flex;
        user-select: auto;
        background: ${({ theme }) => theme.palette.grey[100]};
        z-index: 1;
      }
    }
  }
  &.active {
    position: relative;
    background-color: ${({ theme }) => alpha(theme.palette.primary.main, 0.1)};
  }
`;

export default ChatListItem;
