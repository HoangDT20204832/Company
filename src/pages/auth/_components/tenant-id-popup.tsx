import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import ErrorIcon from '@mui/icons-material/Error';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {
  Alert,
  Button,
  ButtonProps,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  TextField,
  TextFieldProps,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useDebounce } from 'react-use';

import IconButton from '@/components/button/icon-button';
import useTranslation from '@/hooks/use-translation';
import authService from '@/services/auth/auth.service';

type TTenantIdPopupProps = {
  name?: string;
  value?: string;
  getTenantInfo?: (_v?: number, _name?: string) => void;
  buttonProps?: ButtonProps;
  inputRef?: TextFieldProps['inputRef'];
};

const TenantIdPopup = ({
  getTenantInfo,
  value,
  name,
  inputRef,
  buttonProps,
}: TTenantIdPopupProps) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const [internalValue, setInternalValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState<string>();
  useDebounce(
    () => {
      setDebouncedValue(internalValue ?? value);
    },
    500,
    [internalValue, value],
  );

  const { isFetching, isError, data } = useQuery({
    enabled: !!debouncedValue,
    queryKey: ['authService.isTenantAvailable', debouncedValue],
    queryFn: ({ queryKey }) =>
      authService.isTenantAvailable({ name: queryKey[1] }),
    onSuccess(data) {
      if (data?.tenantId) {
        getTenantInfo?.(data.tenantId, debouncedValue);
      } else {
        getTenantInfo?.(undefined, undefined);
      }
    },
    onError() {
      getTenantInfo?.(undefined, undefined);
      setInternalValue('');
    },
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    if (data?.tenantId) {
      getTenantInfo?.(data.tenantId, debouncedValue);
      setOpen(false);
    } else {
      getTenantInfo?.(undefined, undefined);
      setOpen(false);
    }
  };

  const handleChangeToHost = () => {
    getTenantInfo?.(undefined, undefined);
    setOpen(false);
  };

  return (
    <>
      <Button
        {...buttonProps}
        sx={{
          textDecoration: 'underline !important',
        }}
        onClick={() => {
          setInternalValue(value || '');
          setOpen(true);
        }}
      >
        {buttonProps?.children}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        scroll="paper"
        sx={{
          '& .MuiDialog-container': {
            alignItems: 'flex-start',
          },
        }}
      >
        <DialogTitle sx={{ pt: 2.5, pb: 3.2, position: 'relative' }}>
          {t('Thay đổi Tenant')}
          <IconButton
            sx={{
              position: 'absolute',
              right: 14,
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: 24,
              color: (theme) => theme.palette.grey[500],
            }}
            size={36}
            onClick={() => {
              setOpen(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ px: 3, pb: 0 }}>
          <TextField
            name={name}
            sx={{ mt: 0.6, mb: 1.2 }}
            value={internalValue || ''}
            onChange={(e) => {
              setInternalValue(e.target.value);
            }}
            // onBlur={(e) => {
            //   !!e.target.value && isTenantAvailableMutate(e.target.value);
            // }}
            // onKeyDown={(e) => {
            //   if (e.key === 'Enter' && !!value) {
            //     isTenantAvailableMutate(value);
            //   }
            // }}
            required
            size="medium"
            fullWidth
            label={t('Tên Tenant')}
            inputRef={inputRef}
            InputProps={{
              endAdornment: debouncedValue ? (
                <InputAdornment position="end">
                  {isFetching ? (
                    <MoreHorizIcon color={'info'} />
                  ) : (
                    <>
                      {!!data?.tenantId && (
                        <CheckCircleIcon color={'success'} />
                      )}
                      {(!data?.tenantId || isError) && (
                        <ErrorIcon color={'error'} />
                      )}
                    </>
                  )}
                </InputAdornment>
              ) : undefined,
            }}
          />
        </DialogContent>
        <DialogActions
          sx={{
            py: 3,
            px: 3,
            justifyContent: 'unset',
            position: 'relative',
          }}
        >
          <Alert
            severity="info"
            color="warning"
            variant="outlined"
            sx={{
              pl: 1,
              pr: 0.4,
              py: 0.25,
              display: 'flex',
              alignItems: 'center',
              position: 'absolute',
              left: 24,
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: (theme) => alpha(theme.palette.warning.main, 0.1),
              '.MuiAlert-action': {
                p: 0,
                mx: 0,
              },
            }}
            action={
              <Button
                onClick={handleChangeToHost}
                size={'medium'}
                variant="outlined"
                color="warning"
                sx={{
                  py: 0.5,
                  px: 1,
                  borderRadius: 1,
                  borderStyle: 'dashed',
                }}
              >
                {t('Chuyển sang Host')}
              </Button>
            }
          ></Alert>
          <Button
            disabled={isFetching}
            variant="contained"
            style={{ marginLeft: 'auto' }}
            onClick={handleConfirm}
          >
            {`${t('Lưu thông tin')}${
              data?.tenantId ? ' • ' + debouncedValue : ''
            }`}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TenantIdPopup;
