import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardMedia,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  alpha,
  styled,
} from '@mui/material';
import {
  ForwardRefRenderFunction,
  forwardRef,
  useId,
  useMemo,
  useState,
} from 'react';

import useTranslation from '@/hooks/use-translation';
import { TMsgItem } from '@/services/chat/chat.model';
import { formatDate } from '@/services/utils-date';

type TMessageItemProps = {
  sentProfile?: { url?: string } | null;
  showTime?: boolean;
  hideProfile?: boolean;
  options?: {
    label?: React.ReactNode;
    onClick?: () => void;
    icon?: React.ReactNode;
  }[];
} & Pick<
  TMsgItem,
  'id' | 'message' | 'typeMessage' | 'side' | 'creationTime' | 'fileUrl'
>;

const MessageItem: ForwardRefRenderFunction<
  HTMLDivElement,
  TMessageItemProps
> = (
  { sentProfile, showTime, hideProfile, options, ...item },
  forwardedRef,
) => {
  const { t } = useTranslation();
  const uid = useId();

  const [showCreatedTime, setShowCreatedTime] = useState(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const renderMsg = useMemo(() => {
    if (item)
      switch (item.typeMessage) {
        case 2:
          return (
            <Card style={{ maxWidth: 440, borderRadius: 8 }}>
              <CardActionArea sx={{ p: 1 }}>
                <a
                  href={item.message}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <CardMedia
                    component="img"
                    height="auto"
                    width="auto"
                    src={item.message}
                  />
                </a>
              </CardActionArea>
            </Card>
          );
        case 4:
          return !!item?.message && !!item?.fileUrl ? (
            <a
              className="file-msg-wrapper"
              href={item.fileUrl}
              target="_blank"
              referrerPolicy="no-referrer"
              rel="noreferrer"
            >
              <Avatar
                className="left-wrapper"
                sx={{ width: '36px', height: '36px' }}
              >
                {`${item.message.substring(item.message.lastIndexOf('.'))}`}
              </Avatar>
              <div className="right-wrapper">{item.message}</div>
            </a>
          ) : (
            <div className="file-msg-wrapper empty">
              <Avatar className="left-wrapper">
                <DescriptionTwoToneIcon />
              </Avatar>
              <div className="right-wrapper">{t('Đã có lỗi xảy ra')}</div>
            </div>
          );

        default:
          return item.message;
      }
    return undefined;
  }, [item, t]);

  return (
    <StyledChatMsg
      ref={forwardedRef}
      className={item.side === 1 ? 'owner' : ''}
      style={{ paddingBottom: showTime || showCreatedTime ? 24 : 4 }}
    >
      {!hideProfile && (
        <div className="chat-msg-profile">
          {sentProfile ? (
            <Avatar
              className="chat-msg-img"
              src={sentProfile?.url}
              sx={{ width: 36, height: 36 }}
            ></Avatar>
          ) : (
            <div
              className="chat-msg-img"
              style={{ width: 36, height: 36 }}
            ></div>
          )}
        </div>
      )}
      <div className="chat-msg-wrapper">
        <div
          className="msg-wrapper"
          style={{ width: 'fit-content' }}
          onClick={() => {
            setShowCreatedTime((prev) => !prev);
          }}
        >
          {renderMsg}
        </div>
        {!!options && (
          <div className="actions-wrapper">
            <IconButton
              className="btn-actions"
              onClick={(e) => {
                e.stopPropagation();
                setAnchorEl(e.currentTarget);
              }}
              size="small"
              {...(anchorEl
                ? { style: { visibility: 'visible', opacity: 1 } }
                : {})}
            >
              <MoreHorizRoundedIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => {
                setAnchorEl(null);
              }}
              slotProps={{ paper: { elevation: 1 } }}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: item.side === 1 ? 'right' : 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: item.side === 1 ? 'right' : 'left',
              }}
            >
              <MenuList sx={{ p: 0 }}>
                {options?.map((o, index) => (
                  <MenuItem
                    key={uid + 'Menu' + index}
                    onClick={() => {
                      o?.onClick?.();
                      setAnchorEl(null);
                    }}
                    sx={{ px: 1, py: 0.8 }}
                  >
                    <ListItemIcon sx={{ minWidth: '30px !important' }}>
                      {o?.icon}
                    </ListItemIcon>
                    <ListItemText>{o?.label}</ListItemText>
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </div>
        )}
      </div>
      {(showTime || showCreatedTime) && (
        <div className="chat-msg-date-bottom">
          {t('Đã gửi lúc')} {formatDate(item.creationTime, 'DD/MM/YY HH:mm')}
        </div>
      )}
    </StyledChatMsg>
  );
};

const StyledChatMsg = styled(Box)`
  --chat-text-bg: #f1f2f8;
  --theme-color: ${({ theme }) => theme.palette.primary.dark};
  --chat-text-color: #707386;
  display: flex;
  padding: 0;
  position: relative;
  .chat-msg-profile {
    flex-shrink: 0;
    margin-top: auto;
    margin-bottom: -16px;
    margin-right: 8px;
    position: relative;
    & > .MuiAvatar-root {
      box-shadow: ${({ theme }) =>
        `0 0 0 1px ${alpha(theme.palette.primary.dark, 0.25)}`};
      background-color: ${({ theme }) =>
        alpha(theme.palette.primary.main, 0.25)};
    }
  }
  .chat-msg-date-bottom {
    position: absolute;
    left: 44px;
    bottom: 4px;
    font-size: 12px;
    color: var(--chat-text-color);
    white-space: nowrap;
  }
  .file-msg-wrapper {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    cursor: pointer;
    text-decoration: none;
    color: #fff;
    & > .left-wrapper {
      margin-right: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    & > .right-wrapper {
      text-decoration: underline;
      font-weight: 500;
    }
    &.empty > .right-wrapper {
      text-decoration: none;
    }
  }
  .chat-msg-wrapper {
    max-width: 70%;
    margin-left: 0;
    background-color: var(--chat-text-bg);
    border-radius: 16px 16px 16px 0;
    line-height: 1.5;
    font-size: 14px;
    user-select: none;
    position: relative;
    color: var(--chat-text-color);
    z-index: 0;
    & > .msg-wrapper {
      padding: 16px;
    }
  }
  .chat-msg-wrapper + .chat-msg-text {
    margin-top: 10px;
  }

  &.owner {
    flex-direction: row-reverse;
  }
  &.owner .chat-msg-wrapper {
    margin-left: 0;
    margin-right: 0;
    align-items: flex-end;
    background-color: var(--theme-color);
    color: #fff;
    border-radius: 16px 16px 0 16px;
  }
  &.owner .chat-msg-date {
    left: auto;
    right: calc(100% + 8px);
  }
  &.owner .chat-msg-date-bottom {
    left: auto;
    right: 0;
  }

  .actions-wrapper {
    width: fit-content;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(calc(100% + 4px), -50%);
    z-index: 1;
    & > * {
      opacity: 0;
      visibility: hidden;
      transition: all 0.2s ease;
    }
  }
  &.owner .actions-wrapper {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(calc(-100% - 4px), -50%);
  }
  &:hover {
    .actions-wrapper > .btn-actions {
      opacity: 1;
      visibility: visible;
    }
  }
`;

export default forwardRef(MessageItem);
