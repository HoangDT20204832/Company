import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Card, Stack, Typography } from '@mui/material';
import { UseQueryResult, useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import * as R from 'rambda';
import { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';

import BaseCrudFormContainer from '@/base/base-crud-form-container';
import useLoading from '@/hooks/use-loading';
import useTranslation from '@/hooks/use-translation';
import { IUserInfo } from '@/services/auth/auth.model';

import myAccountService from '../_services/my-account.service';

type TBasicInfoFormProps = {
  authQuery: UseQueryResult<IUserInfo, unknown>;
};

const BasicInfoForm = ({ authQuery }: TBasicInfoFormProps) => {
  const { t } = useTranslation();

  const defaultData = useMemo(
    () => ({
      id: authQuery.data?.id,
      userName: authQuery.data?.userName,
      fullName: authQuery.data?.fullName,
      emailAddress: authQuery.data?.emailAddress,
      phoneNumber: authQuery.data?.phoneNumber,
      dateOfBirth: new Date(authQuery.data?.dateOfBirth || new Date()),
      gender: authQuery.data?.gender,
      homeAddress: authQuery.data?.homeAddress,
      nationality: authQuery.data?.nationality,
      imageUrl: authQuery.data?.imageUrl,
      isActive: authQuery.data?.isActive,
    }),
    [authQuery.data],
  );

  const { enqueueSnackbar } = useSnackbar();

  const schema = useMemo(
    () =>
      yup.object().shape({
        userName: yup.string().required(t('field-required')),
        fullName: yup.string().required(t('field-required')),
        emailAddress: yup
          .string()
          .email(t('Email không hợp lệ'))
          .required(t('field-required')),
        phoneNumber: yup.string().required(t('field-required')),
        gender: yup.string(),
        homeAddress: yup.string(),
        dateOfBirth: yup.date(),
        nationality: yup.string(),
        isActive: yup.boolean(),
      }),
    [t],
  );

  const methods = useForm({
    defaultValues: {
      userName: '',
      fullName: '',
      emailAddress: '',
      phoneNumber: '',
      dateOfBirth: new Date(),
      gender: '',
      homeAddress: '',
      nationality: '',
      isActive: true,
    },
    resolver: yupResolver(schema),
  });

  const updateBasicMutation = useMutation({
    mutationFn: (data: Partial<IUserInfo>) => myAccountService.updateInfo(data),
    onSuccess: async () => {
      await authQuery.refetch();
      enqueueSnackbar(t('Cập nhật thành công'), { variant: 'success' });
    },
    onError: () =>
      enqueueSnackbar(t('Cập nhật thất bại'), { variant: 'error' }),
  });

  useLoading({
    showConditionsSome: [updateBasicMutation.isLoading, authQuery.isLoading],
    hideConditionsEvery: [!updateBasicMutation.isLoading, !authQuery.isLoading],
  });

  useEffect(() => {
    methods.reset(defaultData);
  }, [authQuery.data, methods, defaultData]);

  return (
    <Card sx={{ p: 2, height: '100%' }}>
      <form
        onSubmit={methods.handleSubmit((data) => {
          updateBasicMutation.mutate(data);
        })}
      >
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h6" color="primary.main">
            {t('Thông tin cơ bản')}
          </Typography>

          <Button
            variant="soft"
            type="submit"
            disabled={
              !methods.formState.isValid ||
              methods.formState.isSubmitting ||
              updateBasicMutation.isLoading ||
              R.equals(defaultData, methods.watch() as any)
            }
          >
            {t('Lưu')}
          </Button>
        </Stack>

        <Box sx={{ my: 2 }} />

        <FormProvider {...methods}>
          <BaseCrudFormContainer
            fields={[
              {
                name: 'userName',
                label: t('Tên đăng nhập'),
                type: 'text',
                readOnly: true,
              },
              {
                name: 'fullName',
                label: t('Họ tên'),
                type: 'text',
                required: true,
              },
              {
                name: 'emailAddress',
                label: t('E-mail'),
                type: 'text',
                required: true,
              },
              {
                name: 'phoneNumber',
                label: t('Số điện thoại'),
                type: 'text',
                required: true,
              },
              {
                name: 'homeAddress',
                label: t('Địa chỉ'),
                type: 'text',
              },
              {
                name: 'gender',
                label: t('Giới tính'),
                type: 'radio',
                options: [
                  {
                    label: t('Nam'),
                    value: 'male',
                  },
                  {
                    label: t('Nữ'),
                    value: 'female',
                  },
                  {
                    label: t('Khác'),
                    value: 'other',
                  },
                ],
              },
              {
                name: 'dateOfBirth',
                label: t('Ngày sinh'),
                type: 'date',
              },
              {
                name: 'nationality',
                label: t('Quốc tịch'),
                type: 'text',
              },
            ]}
          />
        </FormProvider>
      </form>
    </Card>
  );
};

export default BasicInfoForm;
