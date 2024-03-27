import { Popover, PopoverProps } from '@mui/material';

import ChatLayout from './chat-layout';

type TChatPopoverProps = Pick<PopoverProps, 'open' | 'onClose' | 'anchorEl'>;

const ChatPopover = ({ open, anchorEl, onClose }: TChatPopoverProps) => {
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
      <ChatLayout mode="POPOVER" />
    </Popover>
  );
};

export default ChatPopover;
