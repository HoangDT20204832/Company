import { yupResolver } from '@hookform/resolvers/yup';
import {
  AddCircleRounded,
  AddPhotoAlternateRounded,
} from '@mui/icons-material';
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  FormHelperText,
  InputBase,
  Stack,
  Typography,
  alpha,
  styled,
  useTheme,
} from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
  useGridApiRef,
} from '@mui/x-data-grid';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useId, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import {
  LightTooltip,
  cssScrollbarStyled,
  sxTextEllipsis,
} from '@/base/base-styled-components';
import { httpService } from '@/base/http-service';
import Scrollbar from '@/components/scrollbar';
import useTranslation from '@/hooks/use-translation';
import { CreateGroupChatSchema } from '@/services/chat/chat.model';
import { createGroupChatReq } from '@/services/chat/chat.service';
import citizenTempService from '@/services/citizen-temp/citizen-temp.service';
import { formatDate } from '@/services/utils-date';

import ImageUpload from '../field/image-upload';
import { ImageUploadItem2 } from '../field/image-upload-item';

type TCreateGroupChatProps = {
  refetch?: () => void;
};

const CreateGroupChat = ({ refetch }: TCreateGroupChatProps) => {
  const uid = useId();
  const { t } = useTranslation();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });
  const { data: getAllCitizenRes } = useQuery({
    queryKey: ['GetAllCitizen', paginationModel],
    queryFn: () =>
      citizenTempService.getAllCitizen({
        params: {
          isStayed: true,
          maxResultCount: paginationModel.pageSize,
          skipCount: paginationModel.page * paginationModel.pageSize,
        },
      }),
  });
  const citizenList = getAllCitizenRes?.data || [];
  const citizenTotalRecords = getAllCitizenRes?.totalRecords || 0;
  const apiRef = useGridApiRef();

  const {
    control,
    register,
    watch,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(CreateGroupChatSchema),
  });
  const memberShipsWatch = watch('memberShips', []) as any[];
  const { mutateAsync: createGroupChatMutate } = useMutation({
    mutationKey: ['CreateGroupChat'],
    mutationFn: (data: any) => createGroupChatReq(data),
    onSuccess: () => {
      refetch?.();
      reset();
      enqueueSnackbar(t('Thêm thành công'), { variant: 'success' });
    },
    onError: () => {
      refetch?.();
      reset();
      enqueueSnackbar(t('Đã có lỗi xảy ra khi thêm'), { variant: 'error' });
    },
  });

  const onSubmitForm = handleSubmit(async (formData) => {
    const { memberShips, groupImageFile, groupName } = formData;
    const mappedMemberShips = ((memberShips || []) as any[]).map((item) => ({
      friendUserId: item.id,
      friendTenantId: item.tenantId,
    }));
    const groupImageUrl = groupImageFile
      ? (await httpService.uploadFile({ file: groupImageFile })).result.data
      : undefined;
    await createGroupChatMutate({
      memberShips: mappedMemberShips,
      groupImageUrl,
      groupName,
    });
  });

  const columns = useMemo<GridColDef<any>[]>(
    () => [
      {
        field: 'id',
        headerName: t('STT'),
        type: 'number',
        width: 32,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) =>
          params.api.getRowIndexRelativeToVisibleRows(params.row.id) + 1,
      },
      {
        field: 'fullName',
        headerName: t('Họ tên'),
        editable: false,
        flex: 1,
        minWidth: 180,
        renderCell: (params) => (
          <Stack direction="row" alignItems="center" spacing={1} py={1}>
            <Avatar
              sx={{
                width: 38,
                height: 38,
                opacity: params.value ? 0.8 : 0.4,
              }}
            >
              {params.value?.[0]}
            </Avatar>
            <Stack>
              <Typography
                variant="subtitle2"
                lineHeight={1.2}
                sx={{
                  opacity: params.value ? 0.8 : 0.4,
                  ...sxTextEllipsis(2),
                }}
              >
                {params.value || t('Chưa có')}
              </Typography>
            </Stack>
          </Stack>
        ),
      },
      {
        field: 'urbanName',
        headerName: t('Dự án'),
        editable: false,
        flex: 1,
        minWidth: 120,
        renderCell: (params) => (
          <Typography
            variant="body2"
            lineHeight={1.2}
            sx={{ opacity: params.value ? 0.8 : 0.4, ...sxTextEllipsis(2) }}
          >
            {params.value || t('Chưa có')}
          </Typography>
        ),
      },
      {
        field: 'apartmentCode',
        headerName: t('Mã căn hộ'),
        editable: false,
        flex: 1,
        minWidth: 100,
        renderCell: (params) => (
          <Typography
            variant="body2"
            lineHeight={1.2}
            sx={{ opacity: params.value ? 0.8 : 0.4, ...sxTextEllipsis(2) }}
          >
            {params.value || t('Chưa có')}
          </Typography>
        ),
      },
      {
        field: 'relationShip',
        headerName: t('Vai trò'),
        editable: false,
        flex: 1,
        minWidth: 100,
        renderCell: (params) => {
          let text = '---';
          switch (params.row.relationShip) {
            case 1:
              text = t('Chủ hộ');
              break;
            case 2:
              text = t('Vợ');
              break;
            case 3:
              text = t('Chồng');
              break;
            case 4:
              text = t('Con gái');
              break;
            case 5:
              text = t('Con trai');
              break;
            case 6:
              text = t('Họ hàng');
              break;
            default:
              break;
          }
          return (
            <Typography variant="body2" gutterBottom>
              {text}
            </Typography>
          );
        },
      },
      {
        field: 'dateOfBirth',
        headerName: t('Ngày sinh'),
        editable: false,
        flex: 1,
        minWidth: 105,
        valueFormatter: (params) => {
          if (!params.value) return '---';
          return formatDate(params.value);
        },
      },
    ],
    [t],
  );

  return (
    <StyledWrapper
      noValidate
      id={uid + 'Form'}
      className="right-wrapper"
      onSubmit={onSubmitForm}
      onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
    >
      <Scrollbar
        sx={{
          flex: '1 1 auto',
          minHeight: 0,
          '.simplebar-content-wrapper': {
            padding: '12px !important',
          },
          '.simplebar-content': {},
        }}
      >
        <Typography variant="caption" fontSize={16} sx={{ mb: 1 }}>
          Danh sách cư dân:
        </Typography>
        <Controller
          control={control}
          name="memberShips"
          render={({ field }) => (
            <DataGrid
              apiRef={apiRef}
              disableRowSelectionOnClick
              checkboxSelection
              columns={columns}
              rows={citizenList}
              scrollbarSize={8}
              autoHeight
              rowHeight={62}
              columnHeaderHeight={46}
              rowCount={citizenTotalRecords}
              paginationMode="server"
              pageSizeOptions={[10]}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              onRowSelectionModelChange={() => {
                setTimeout(() => {
                  const models = Array.from(
                    apiRef.current?.getSelectedRows(),
                  ).flatMap(
                    ([_GridRowId, GridValidRowModel]) => GridValidRowModel,
                  );
                  field.onChange(models);
                }, 100);
              }}
              getRowClassName={(params) =>
                params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
              }
              sx={{
                '.MuiDataGrid-main': { flex: '1 1 auto', minHeight: 0 },
              }}
            />
          )}
        />
      </Scrollbar>
      <Box
        sx={{
          flex: '0 0 auto',
          zIndex: 2,
          minHeight: 64,
          padding: '10px 12px',
          bgcolor: theme.palette.common.white,
          borderTop: `1px solid ${theme.palette.grey[100]}`,
        }}
      >
        <Stack direction="row" spacing={1}>
          <Controller
            name="groupImageFile"
            control={control}
            render={({ field }) => {
              return (
                <ImageUpload
                  value={field.value || undefined}
                  onChange={field.onChange}
                  accept="image/png, image/jpg, image/jpeg"
                  imageSize="66px"
                  sx={{ alignSelf: 'center' }}
                  icon={
                    <AddPhotoAlternateRounded
                      fontSize="large"
                      style={{ opacity: 0.4, margin: '-2px -2px 0 0' }}
                    />
                  }
                  renderUploadedFile={(initialFile, file) => (
                    <ImageUploadItem2
                      width="66px"
                      height="66px"
                      initialFile={initialFile}
                      file={file}
                      onDelete={() => field.onChange(undefined)}
                      sx={{ boxShadow: theme.shadows[1] }}
                    />
                  )}
                />
              );
            }}
          />
          <Stack sx={{ flex: '1 1 auto', minWidth: 0, pb: '2px' }}>
            <InputBase
              autoComplete="off"
              placeholder="Tên nhóm..."
              sx={{
                width: '100%',
                position: 'relative',
                pl: '2px',
                '& > input': {
                  fontSize: 20,
                  fontWeight: 600,
                  opacity: 0.6,
                },
              }}
              {...register('groupName')}
            />
            <Stack
              direction="row"
              alignItems="center"
              mt="auto"
              height={'26px'}
            >
              {memberShipsWatch?.length ? (
                <AvatarGroup
                  max={10}
                  sx={{ opacity: 0.6 }}
                  slotProps={{
                    additionalAvatar: {
                      sx: { width: 26, height: 26 },
                    },
                  }}
                >
                  {memberShipsWatch.map((item, index) => (
                    <Avatar
                      sx={{ width: 26, height: 26 }}
                      key={uid + item.id + 'Avatar' + index}
                    >
                      {item.fullName[0]}
                    </Avatar>
                  ))}
                </AvatarGroup>
              ) : (
                <Typography fontSize={14} color={theme.palette.error.main}>
                  Chưa có thành viên
                </Typography>
              )}
            </Stack>
            <Stack
              direction="row"
              sx={{
                position: 'absolute',
                bottom: 12,
                right: 12,
              }}
            >
              <LightTooltip
                open={
                  !![
                    errors.groupImageFile?.message,
                    errors.groupName?.message,
                    errors.memberShips?.message,
                  ].filter((m) => !!m).length
                }
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title={
                  <ul style={{ padding: '0 0 0 14px' }}>
                    {[
                      errors.groupImageFile?.message,
                      errors.groupName?.message,
                      errors.memberShips?.message,
                    ]
                      .filter((m) => !!m)
                      .map((item, index) => (
                        <FormHelperText
                          error
                          component="li"
                          key={uid + 'errors' + index}
                        >
                          {item}
                        </FormHelperText>
                      ))}
                  </ul>
                }
                placement="top-start"
              >
                <Button
                  type="submit"
                  variant="contained"
                  size="small"
                  startIcon={<AddCircleRounded />}
                  form={uid + 'Form'}
                  disabled={isSubmitting}
                  sx={{ py: 1 }}
                >
                  Thêm nhóm mới
                </Button>
              </LightTooltip>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </StyledWrapper>
  );
};

const StyledWrapper = styled('form')`
  background-color: ${({ theme }) => theme.palette.common.white};
  width: 100%;
  height: 100%;
  flex: 1 1 auto;
  min-width: 300px;
  min-height: auto;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .MuiDataGrid-columnHeaders {
    position: sticky;
    top: 0;
    border-radius: 0;
    z-index: 0;
    background-color: ${({ theme }) => theme.palette.grey[100]};
    .MuiDataGrid-iconSeparator {
      display: none;
    }
  }
  .MuiDataGrid-virtualScroller {
    ${cssScrollbarStyled}
    .MuiDataGrid-row.odd {
    }
  }
  .MuiDataGrid-footerContainer {
    position: sticky;
    bottom: 0px;
    margin-top: auto;
    min-height: 44px;
    height: 46px;
    background-color: ${({ theme }) => theme.palette.grey[50]};
    /* background-color: ${({ theme }) =>
      alpha(theme.palette.primary.main, 0.1)}; */
    backdrop-filter: blur(8px);
    z-index: 1;
    .MuiToolbar-root {
      z-index: 1;
      min-height: 0;
    }
    .MuiDataGrid-selectedRowCount {
      z-index: 1;
    }
  }
`;

export default CreateGroupChat;
