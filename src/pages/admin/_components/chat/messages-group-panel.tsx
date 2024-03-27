import { yupResolver } from '@hookform/resolvers/yup';
import { SendRounded } from '@mui/icons-material';
import CallTwoToneIcon from '@mui/icons-material/CallTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';
import VideocamTwoToneIcon from '@mui/icons-material/VideocamTwoTone';
import {
  Avatar,
  AvatarGroup,
  Box,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  alpha,
  styled,
  useTheme,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useContext, useId, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTimeoutFn } from 'react-use';

import { httpService } from '@/base/http-service';
import Scrollbar from '@/components/scrollbar';
import useTranslation from '@/hooks/use-translation';
import { ChatContext } from '@/services/chat/chat.context';
import { TMsgItem, sendMsgSchema } from '@/services/chat/chat.model';
import {
  getGroupChatDetailReq,
  getMessageGroupChatReq,
} from '@/services/chat/chat.service';
import { isSameTime } from '@/services/utils-date';

import MessageFileUpload from './message-file-upload';
import MessageImageUpload from './message-image-upload';
import MessageItem from './message-item';

type TMessagesGroupPanelProps = {
  selectedChatItem: number;
  className?: string;
  mode?: 'PAGE' | 'POPOVER';
};

const MessagesGroupPanel = ({
  selectedChatItem,
  className,
  mode = 'PAGE',
}: TMessagesGroupPanelProps) => {
  const uid = useId();
  const theme = useTheme();
  const { t } = useTranslation();
  const [chatState] = useContext(ChatContext);
  const hubConnection = chatState.hubSignalR;
  const { enqueueSnackbar } = useSnackbar();
  const scrollableNodeRef = useRef<HTMLDivElement>(null);

  const {
    data: getMessageGroupChatRes,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ['GetMessageGroupChat', selectedChatItem],
    queryFn: () =>
      getMessageGroupChatReq({
        GroupChatId: selectedChatItem,
      }),
  });
  const { data: getGroupChatDetailRes } = useQuery({
    queryKey: ['GetGroupChatDetail', selectedChatItem],
    queryFn: () => getGroupChatDetailReq({ id: selectedChatItem }),
  });
  const groupChatDetail = getGroupChatDetailRes?.data || null;
  const chatMessageList = getMessageGroupChatRes?.data || [];

  const { handleSubmit, reset, control, register } = useForm({
    mode: 'onChange',
    resolver: yupResolver(sendMsgSchema),
    defaultValues: {
      text: '',
    },
  });

  const [__, _, resetScrollToBottom] = useTimeoutFn(() => {
    if (scrollableNodeRef.current) {
      scrollableNodeRef.current.querySelector(`#bottom`)?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  }, 500);

  const handleSendMessage = (msgData: any) => {
    return hubConnection
      ?.invoke('sendMessageToGroupChatClient', msgData)
      .then(() => {
        refetch();
        reset();
        resetScrollToBottom();
      });
  };

  const onSubmitForm = handleSubmit((formData: any) => {
    if (!groupChatDetail) return;
    const {
      text: message,
      image: imageFileUpload,
      file: fileUpload,
    } = formData;

    const sentMsg = {
      roomId: groupChatDetail.id,
      groupCode: groupChatDetail.groupChatCode,
      senderImageUrl: undefined,
      message: undefined,
      typeMessage: 1,
    };
    if (imageFileUpload) {
      httpService
        .uploadListImage({ files: Array.from(imageFileUpload) })
        .then((res) => {
          res?.result &&
            handleSendMessage({
              ...sentMsg,
              senderImageUrl: res.result[0],
              message: res.result[0],
              typeMessage: 2,
            });
        })
        .catch((_err) => {});
    }
    if (fileUpload?.[0]) {
      httpService
        .uploadFile({ file: fileUpload[0] })
        .then((res) => {
          res?.result?.data &&
            handleSendMessage({
              ...sentMsg,
              message: fileUpload[0].name,
              senderImageUrl: res.result.data,
              typeMessage: 4,
            });
        })
        .catch((_err) => {});
    }
    if (message) {
      handleSendMessage({
        ...sentMsg,
        message,
        typeMessage: 1,
      });
    }

    reset();
  });

  const handleDeleteMsg = (item: TMsgItem) => {
    hubConnection
      ?.invoke('RecallMessageGroup', item)
      .then((res: any) => {
        console.log('[done delete mess store]', res);
      })
      .catch((err: any) => {
        console.error(err);
        enqueueSnackbar({
          variant: 'warning',
          message: t('Thu hồi tin nhắn thất bại'),
        });
      })
      .finally(() => {
        refetch();
      });
  };

  return (
    <MessagesGroupPanelStyled
      key={uid + String(selectedChatItem)}
      className={className}
    >
      <div className="title-wrapper">
        <div className="left-wrapper">
          <Avatar
            sx={{ width: '46px', height: '46px' }}
            src={groupChatDetail?.groupImageUrl}
          >
            {groupChatDetail?.name || '---'}
          </Avatar>
          <div className="name-wrapper">
            <Typography variant="caption" fontSize={20} noWrap>
              {groupChatDetail?.name || '---'}
            </Typography>
            <Stack direction="row" alignItems="center">
              <Typography fontSize={14} style={{ opacity: 0.6 }}>
                Thành viên:
              </Typography>
              {groupChatDetail?.members?.length ? (
                <AvatarGroup max={10}>
                  {groupChatDetail?.members.map((item, index) => (
                    <Avatar
                      key={uid + 'members' + index}
                      src={item?.memberAvatarUrl}
                      variant="circular"
                      style={{ width: 18, height: 18 }}
                    >
                      {item?.memberFullName?.[0]}
                    </Avatar>
                  ))}
                </AvatarGroup>
              ) : (
                <Typography fontSize={14} style={{ marginLeft: 2 }}>
                  0
                </Typography>
              )}
            </Stack>
          </div>
        </div>
        <div className="actions-wrapper">
          <IconButton sx={{ mr: 1, fontSize: 23 }}>
            <CallTwoToneIcon fontSize="inherit" />
          </IconButton>
          <IconButton sx={{ mr: 1, fontSize: 30 }}>
            <VideocamTwoToneIcon fontSize="inherit" />
          </IconButton>
          <Divider flexItem variant="middle" orientation="vertical" />
          <IconButton sx={{ ml: 1, fontSize: 25 }}>
            <MoreVertTwoToneIcon fontSize="inherit" />
          </IconButton>
        </div>
      </div>
      <Box
        component={Scrollbar}
        className="message-list-wrapper"
        // scrollableNodeProps={{ ref: scrollableNodeRef }}
      >
        <Box className="message-list">
          {chatMessageList?.map((item, index) =>
            !item ? (
              <></>
            ) : (
              <MessageItem
                key={uid + 'MessageItem' + selectedChatItem + index}
                showTime={
                  item.side === chatMessageList[index + 1]?.side
                    ? !isSameTime(
                        item.creationTime,
                        chatMessageList[index + 1].creationTime,
                      )
                    : true
                }
                hideProfile={item.side === 1}
                sentProfile={
                  item.side !== chatMessageList?.[index + 1]?.side ||
                  !isSameTime(
                    item.creationTime,
                    chatMessageList?.[index + 1]?.creationTime,
                  )
                    ? {
                        url: undefined,
                      }
                    : undefined
                }
                options={[
                  {
                    label: item.side === 1 ? t('Thu hồi') : t('Xóa ở phía bạn'),
                    icon: <DeleteTwoToneIcon />,
                    onClick: () => handleDeleteMsg(item),
                  },
                ]}
                {...(item || {})}
              />
            ),
          )}
        </Box>
        <div id={`bottom`} style={{ height: 1 }}></div>
      </Box>

      <Box
        id={uid + 'MessageForm'}
        className="bottom-wrapper"
        component="form"
        onSubmit={onSubmitForm}
      >
        <TextField
          fullWidth
          placeholder="Tin nhắn..."
          autoFocus
          autoComplete="off"
          sx={{
            '.MuiInputBase-root': {
              backgroundColor: alpha(theme.palette.primary.main, 0.05),
              '& input': { py: 1.5 },
              '&.Mui-focused': {
                '& input::placeholder': { color: theme.palette.primary.main },
                '& .btn-send': { color: theme.palette.primary.main },
              },
            },
          }}
          InputProps={{
            readOnly: isFetching,
            endAdornment: (
              <InputAdornment position="end">
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  className="actions-wrapper"
                  sx={{ mr: -1 }}
                >
                  <Controller
                    name="image"
                    control={control}
                    render={({ field: { value, onChange }, fieldState }) => (
                      <MessageImageUpload
                        accept="image/png, image/jpg, image/jpeg"
                        error={!!fieldState.error?.message}
                        helpText={fieldState.error?.message}
                        value={value as any}
                        onChange={(v) => onChange(v)}
                        maxWidthText={mode === 'PAGE' ? '160px' : '100px'}
                      />
                    )}
                  />
                  <Controller
                    name="file"
                    control={control}
                    render={({ field: { value, onChange }, fieldState }) => (
                      <MessageFileUpload
                        accept=".pdf, .docx"
                        error={!!fieldState.error?.message}
                        helpText={fieldState.error?.message}
                        value={value as any}
                        onChange={(v) => onChange(v)}
                        maxWidthText={mode === 'PAGE' ? '160px' : '100px'}
                      />
                    )}
                  />

                  <Divider
                    variant="middle"
                    orientation="vertical"
                    sx={{
                      height: '32px',
                      borderColor: alpha(theme.palette.primary.main, 0.1),
                    }}
                  />
                  <IconButton
                    sx={{ fontSize: 26 }}
                    className="btn-send"
                    type="submit"
                    form={uid + 'MessageForm'}
                  >
                    <SendRounded fontSize="inherit" />
                  </IconButton>
                </Stack>
              </InputAdornment>
            ),
          }}
          {...register('text')}
        />
      </Box>
    </MessagesGroupPanelStyled>
  );
};
const MessagesGroupPanelStyled = styled(Box)`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-width: 0;
  background-color: ${({ theme }) => theme.palette.common.white};
  overflow: hidden;
  height: 100%;
  & > .title-wrapper {
    padding: 0 12px;
    flex: 0 0 auto;
    min-height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    & > .left-wrapper {
      display: flex;
      align-items: center;
      & > .MuiAvatar-root {
        box-shadow: ${({ theme }) =>
          `0 0 0 1px ${alpha(theme.palette.primary.dark, 0.25)}`};
        background-color: ${({ theme }) =>
          alpha(theme.palette.primary.main, 0.25)};
      }
      & > .name-wrapper {
        display: flex;
        flex-direction: column;
        margin-left: 12px;
      }
    }
    & > .actions-wrapper {
      display: flex;
      align-items: center;
    }
  }
  & > .message-list-wrapper {
    margin-top: auto;
    flex: 1 1 auto;
    min-height: 0;
    border-top: ${({ theme }) => `1px solid ${theme.palette.grey[200]}`};
    border-bottom: ${({ theme }) => `1px solid ${theme.palette.grey[200]}`};
    & .simplebar-content .message-list {
      width: 100%;
      min-width: fit-content;
      padding: 16px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  & > .bottom-wrapper {
    flex: 0 0 auto;
    min-height: 64px;
    padding: 12px;
  }
`;

export default MessagesGroupPanel;
