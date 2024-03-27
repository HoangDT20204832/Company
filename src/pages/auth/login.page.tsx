/* eslint-disable no-extra-boolean-cast */
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Box, Link, Stack, TextField, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useContext, useEffect } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { useCookie } from 'react-use';
import * as yup from 'yup';

import LoadingButton from '@/components/button/loading-button';
import CheckboxLabel from '@/components/field/checkbox-label';
import PasswordInput from '@/components/field/password-input';
import SelectChangeLocale from '@/components/field/select-change-locale';
import useTranslation from '@/hooks/use-translation';
import i18n from '@/i18n';
import appService from '@/services/app/app.service';
import { AuthContext } from '@/services/auth/auth.context';
import { ILoginInput } from '@/services/auth/auth.model';
import authService from '@/services/auth/auth.service';

import TenantIdPopup from './_components/tenant-id-popup';

const loginSchema = yup.object({
  tenancyName: yup.string().optional(),
  userNameOrEmailAddress: yup
    .string()
    .required(i18n.t('userNameOrEmailAddress-required')),
  password: yup.string().required(i18n.t('password-required')),
  rememberClient: yup.boolean(),
});

const LoginPage = () => {
  const [, dispatch] = useContext(AuthContext);

  const { t } = useTranslation();

  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();

  const [_tenantId, setTenantId, deleteTenantId] = useCookie('tenantId');
  const [tenancyName, setTenancyName, deleteTenancyName] =
    useCookie('tenancyName');

  const {
    register,
    handleSubmit,
    control,
    resetField,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      rememberClient: false,
    },
  });

  const formWatch = useWatch({ control });

  const { mutate, isLoading: loginLoading } = useMutation({
    mutationFn: (data: ILoginInput) => authService.login(data),
    onSuccess: (data) => {
      dispatch({ type: 'setIsAuth', payload: true });
      dispatch({ type: 'setCurrentUser', payload: data });

      appService.hideLoadingModal();
      enqueueSnackbar(t('Đăng nhập thành công'), { variant: 'success' });

      queryClient.refetchQueries({ queryKey: ['auth/getUserInfo'] });
    },
    onError: (err: any) => {
      appService.hideLoadingModal();
      enqueueSnackbar(
        err.response.data.error?.details || t('Đã có lỗi xảy ra'),
        {
          variant: 'error',
        },
      );
    },
  });

  const onSubmit = (data: ILoginInput) => {
    mutate(data);
    appService.showLoadingModal();
  };

  useEffect(() => {
    if (!!tenancyName) resetField('tenancyName', { defaultValue: tenancyName });
  }, [resetField, tenancyName]);

  return (
    <Box
      sx={{
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: 'background.paper',
        flex: '1 1 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url('https://images.pexels.com/photos/4186017/pexels-photo-4186017.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'bottom',
          zIndex: 0,
        }}
      ></Box>
      <Box
        sx={{
          maxWidth: 550,
          px: 3,
          pt: 4,
          pb: 6,
          width: '100%',
          backgroundColor: 'background.paper',
          borderRadius: 1,
          zIndex: 1,
          position: 'relative',
        }}
      >
        <Typography
          variant="caption"
          sx={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translate(-50%,-100%)',
            fontSize: 28,
          }}
        >
          {formWatch?.tenancyName || ''}
        </Typography>
        <div>
          <Stack
            spacing={1}
            sx={{
              mb: 3,
              position: 'relative',
              '.btn-locale': {
                position: 'absolute',
                top: 0,
                right: 0,
                mt: 0,
              },
            }}
          >
            <Typography variant="h4">{t('Đăng nhập')}</Typography>
            <Typography color="text.secondary" variant="subtitle2">
              {t('Chưa có tài khoản') + '? '}
              <Link href="/auth/register" underline="hover" variant="subtitle2">
                {t('Đăng ký ngay')}
              </Link>
            </Typography>
            <SelectChangeLocale
              buttonProps={{
                className: 'btn-locale',
                size: 44,
                style: {
                  fontSize: 26,
                },
              }}
            />
          </Stack>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="tenancyName"
              control={control}
              render={({ field: { ref, value, name, onChange } }) => (
                <Alert
                  severity="info"
                  variant="outlined"
                  sx={{
                    pl: 1.2,
                    pr: 0,
                    py: 0.5,
                    mb: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    bgcolor: (theme) => alpha(theme.palette.info.main, 0.1),
                    '.MuiAlert-action': {
                      p: 0,
                      ml: 'auto',
                      mr: 0.5,
                    },
                  }}
                  action={
                    <TenantIdPopup
                      buttonProps={{
                        disabled: loginLoading,
                        children: t('Thay đổi'),
                      }}
                      name={name}
                      inputRef={ref}
                      value={value}
                      getTenantInfo={(id, name) => {
                        if (!!id && !!name) {
                          onChange(name);
                          setTenantId(String(id));
                          setTenancyName(name);
                        } else {
                          onChange(undefined);
                          deleteTenancyName();
                          deleteTenantId();
                        }
                      }}
                    />
                  }
                >
                  <Typography fontSize={14} component={'span'}>
                    {t('Tenant hiện tại')}:{' '}
                  </Typography>
                  <Typography
                    fontSize={15}
                    fontWeight={600}
                    component={'span'}
                    color={(theme) =>
                      value ? theme.palette.info.main : theme.palette.grey[500]
                    }
                  >
                    {value || t('Chưa có')}
                  </Typography>
                </Alert>
              )}
            />
            <TextField
              fullWidth
              label={t('Tên người dùng hoặc Email')}
              error={!!errors.userNameOrEmailAddress?.message}
              helperText={errors.userNameOrEmailAddress?.message}
              disabled={loginLoading}
              required
              margin="dense"
              style={{ marginBottom: 12 }}
              {...register('userNameOrEmailAddress')}
            />
            <PasswordInput
              fullWidth
              label={t('Mật khẩu')}
              error={!!errors.password?.message}
              helperText={errors.password?.message}
              disabled={loginLoading}
              required
              margin="dense"
              style={{ marginBottom: 12 }}
              {...register('password')}
            />
            <Stack
              direction={'row'}
              alignItems={'center'}
              justifyContent={'space-between'}
              style={{ marginBottom: 20 }}
            >
              <CheckboxLabel
                label={
                  <Typography variant="subtitle2">
                    {t('Ghi nhớ đăng nhập')}
                  </Typography>
                }
                disabled={loginLoading}
                size="small"
                {...register('rememberClient')}
              />
              <Link
                href="/auth/forgot-password"
                underline="hover"
                variant="subtitle2"
              >
                {t('Quên mật khẩu')}?
              </Link>
            </Stack>
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={loginLoading}
            >
              {t('Đăng nhập')}
            </LoadingButton>
          </form>
        </div>
      </Box>
    </Box>
  );
};

export default LoginPage;
