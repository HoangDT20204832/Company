import { EditRounded } from '@mui/icons-material';
import {
  Divider,
  Fab,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { useId, useState } from 'react';

type TItem = {
  label?: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  type?: 'item' | 'divider';
  disabled?: boolean;
};

type TNewActionProps = {
  items?: TItem[];
};

const NewAction = ({ items }: TNewActionProps) => {
  const uid = useId();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Fab
        color="primary"
        size="medium"
        onClick={(event) => {
          setAnchorEl(event.currentTarget);
        }}
      >
        <EditRounded />
      </Fab>
      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        onClick={handleClose}
        disablePortal
        disableScrollLock
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        marginThreshold={0}
      >
        <Typography
          variant="caption"
          ml={2}
          fontSize={14}
          style={{ opacity: 0.5 }}
        >
          Tin nhắn mới:
        </Typography>
        {items?.map((item, index) =>
          item?.type === 'divider' ? (
            <Divider key={uid + 'MenuDivider' + index} />
          ) : (
            <MenuItem
              key={uid + 'Menu' + index}
              disabled={!!item?.disabled}
              onClick={item?.onClick}
            >
              <ListItemIcon>{item?.icon}</ListItemIcon>
              <ListItemText
                primary={item?.label}
                style={{ opacity: 0.8 }}
                primaryTypographyProps={{ variant: 'caption', fontSize: 15 }}
              />
            </MenuItem>
          ),
        )}
      </Menu>
    </>
  );
};

export default NewAction;
