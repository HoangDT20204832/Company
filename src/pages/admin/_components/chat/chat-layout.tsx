import { SupervisorAccountRounded } from '@mui/icons-material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { Box, Chip, IconButton, Typography, styled } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { concat, sort } from 'rambda';
import { useId, useMemo, useState } from 'react';

import Scrollbar from '@/components/scrollbar';
import useTranslation from '@/hooks/use-translation';
import { TChatItem } from '@/services/chat/chat.model';
import {
  getAllGroupChatsReq,
  getOrganizationUnitChatAdminReq,
} from '@/services/chat/chat.service';
import { dayjs } from '@/services/utils-date';

import ChatListItem from './chat-list-item';
import CreateGroupChat from './create-group-chat';
import MessagesGroupPanel from './messages-group-panel';
import MessagesPanel from './messages-panel';
import NewAction from './new-action';
import OrganizationUnitSelect from './organization-unit-select';

type TChatLayoutProps = {
  mode?: 'PAGE' | 'POPOVER';
};

const ChatLayout = ({ mode = 'PAGE' }: TChatLayoutProps) => {
  const uid = useId();
  const { t } = useTranslation();
  const [organizationUnitId, setOrganizationUnitId] = useState<
    number | undefined
  >();
  const [selectedChatItem, setSelectedChatItem] = useState<
    number | TChatItem
  >();
  const [selectedNewType, setSelectedNewType] = useState<string>();

  const { data: getOrganizationUnitChatAdminRes } = useQuery({
    queryKey: ['GetOrganizationUnitChatAdmin', organizationUnitId],
    queryFn: () =>
      getOrganizationUnitChatAdminReq({
        organizationUnitId: organizationUnitId,
      }),
  });
  const { data: getAllGroupChatsRes, refetch: getAllGroupChatsRefetch } =
    useQuery({
      queryKey: ['GetAllGroupChats'],
      queryFn: () => getAllGroupChatsReq({}),
    });

  const chatListMemo = useMemo(() => {
    const chatListAdmin = getOrganizationUnitChatAdminRes?.friends || [];
    const chatListRoom = getAllGroupChatsRes?.data || [];
    return sort(
      (a, b) =>
        !!a?.lastMessage && !!b?.lastMessage
          ? dayjs(a.lastMessageDate).isBefore(dayjs(b.lastMessageDate))
            ? 1
            : -1
          : dayjs(a.creationTime).isBefore(dayjs(b.creationTime))
            ? 1
            : -1,
      concat<any>(chatListAdmin, chatListRoom),
    );
  }, [getAllGroupChatsRes?.data, getOrganizationUnitChatAdminRes?.friends]);

  return (
    <WrapperStyled component="main" className={mode} key={mode}>
      <Box className="left-wrapper">
        <div className="title-wrapper">
          <div className="title">
            <Typography variant="h2" fontSize={22} mr={1} lineHeight={1.2}>
              {t('Giao tiếp số')}
            </Typography>
            <Chip variant="soft" label={0} size="small" />
            <div className="actions-wrapper">
              <IconButton size="small">
                <SearchRoundedIcon />
              </IconButton>
            </div>
          </div>
          <div className="select-wrapper">
            <OrganizationUnitSelect
              size="small"
              sx={{
                '.MuiInputBase-root': {
                  paddingRight: '6px',
                  backgroundColor: 'grey.200',
                },
              }}
              placeholder="Phòng ban"
              value={organizationUnitId}
              onChange={(v) => {
                setOrganizationUnitId(v);
              }}
              getOrganizationUnits={(items) => {
                if (!organizationUnitId && !!items?.length)
                  setOrganizationUnitId(items[0].organizationUnitId);
              }}
            />
          </div>
        </div>
        <Box component={Scrollbar} style={{ flex: '1 1 auto', minHeight: 0 }}>
          {chatListMemo.length ? (
            <Box className="chat-list-wrapper">
              {chatListMemo.map((item, index) => {
                if ('members' in item)
                  return (
                    <ChatListItem
                      variant="Group"
                      key={uid + 'ChatListItem' + item.id + index}
                      active={false}
                      onClick={() => {
                        setSelectedChatItem(item.id);
                        setSelectedNewType(undefined);
                      }}
                      item={item}
                      mode={mode}
                    />
                  );
                return (
                  <ChatListItem
                    variant="One"
                    key={uid + 'ChatListItem' + item.friendUserId + index}
                    active={
                      typeof selectedChatItem === 'object' &&
                      selectedChatItem?.friendUserId === item.friendUserId
                    }
                    onClick={() => {
                      setSelectedChatItem(item);
                      setSelectedNewType(undefined);
                    }}
                    item={item}
                    mode={mode}
                  />
                );
              })}
            </Box>
          ) : (
            <Box className="chat-list-wrapper empty">
              <Typography>{t('Không có dữ liệu')}</Typography>
            </Box>
          )}
          <Box className="bottom-actions">
            <NewAction
              items={[
                {
                  icon: <SupervisorAccountRounded />,
                  label: 'Nhóm',
                  onClick: () => setSelectedNewType('GROUP'),
                },
              ]}
            />
          </Box>
        </Box>
      </Box>
      {selectedNewType ? (
        <CreateGroupChat
          refetch={() => {
            getAllGroupChatsRefetch();
          }}
        />
      ) : selectedChatItem ? (
        typeof selectedChatItem === 'number' ? (
          <MessagesGroupPanel
            mode={mode}
            className="right-wrapper"
            selectedChatItem={selectedChatItem}
          />
        ) : (
          !!organizationUnitId && (
            <MessagesPanel
              mode={mode}
              className="right-wrapper"
              organizationUnitId={organizationUnitId}
              selectedChatItem={selectedChatItem}
            />
          )
        )
      ) : (
        <div className="right-wrapper empty">
          <Typography>{t('Không có dữ liệu')}</Typography>
        </div>
      )}
    </WrapperStyled>
  );
};

const WrapperStyled = styled(Box)`
  --spacing: ${({ theme }) => theme.spacing(1)};
  display: flex;
  height: calc(100dvh - 64px);
  overflow: hidden;
  position: relative;
  background-color: ${({ theme }) => theme.palette.grey[200]};
  border-top: ${({ theme }) => `1px solid ${theme.palette.grey[200]}`};
  & > .left-wrapper {
    display: flex;
    flex-direction: column;
    flex: 0 0 auto;
    min-width: 360px;
    background-color: ${({ theme }) => theme.palette.common.white};
    margin-right: 1px;
    position: relative;
    & > .title-wrapper {
      display: flex;
      justify-content: center;
      flex-direction: column;
      position: relative;
      flex: 0 0 auto;
      min-height: 64px;
      padding: 10px 12px 14px;
      & > .title {
        position: relative;
        margin-bottom: 10px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        & > .actions-wrapper {
          margin-left: auto;
        }
      }
    }
    & .chat-list-wrapper {
      display: flex;
      flex-direction: column;
    }
    & .chat-list-wrapper.empty {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      flex: 1 1 auto;
      min-height: 0;
    }
    & .bottom-actions {
      margin-top: auto;
      align-self: flex-end;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      position: sticky;
      bottom: 0;
      padding: 8px;
    }
  }
  & > .right-wrapper.empty {
    flex: 1 1 auto;
    min-width: 0;
    background-color: ${({ theme }) => theme.palette.common.white};
    overflow: hidden;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  &.POPOVER {
    height: calc(100dvh - 60px);
    border-top: none;
    & > .left-wrapper {
      min-width: 260px;
    }
    & > .right-wrapper {
      min-width: 560px;
      max-width: 560px;
    }
  }
`;

export default ChatLayout;
