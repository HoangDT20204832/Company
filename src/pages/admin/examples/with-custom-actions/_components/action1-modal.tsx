import { Dialog, DialogTitle } from '@mui/material';

import { TBaseModalProps } from '@/base/base.model';

type TAction1ModalProps = TBaseModalProps;

const Action1Modal = (props: TAction1ModalProps) => {
  return (
    <Dialog {...props}>
      <DialogTitle>Action 1 hehe</DialogTitle>
    </Dialog>
  );
};

export default Action1Modal;
