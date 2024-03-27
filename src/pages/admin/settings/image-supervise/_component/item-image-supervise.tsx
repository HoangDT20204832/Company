import NiceModal from '@ebay/nice-modal-react';
import {
  DeleteTwoTone as DeleteIcon,
  EditTwoTone as EditIcon,
  MoreHorizOutlined as MoreIcon,
} from '@mui/icons-material';
import { Box, Grid, Menu, MenuItem, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';
import * as yup from 'yup';

import { TCrudFormField } from '@/base/crud-form-field.type';
import IconButton from '@/components/button/icon-button';
import ConfirmModal from '@/components/confirm-modal';
import { NOTIF_TYPES_ARRAY } from '@/configs/notification-type.config';
import useAbp from '@/hooks/use-abp';
import useTranslation from '@/hooks/use-translation';
import tenantSettingService from '@/services/tenant-settings/tenant-setting.service';

import {
  CONFIG_TYPE,
  IImageSuperviseTenant,
} from '../_services/image-supervise.model';
import imageSuperviseService from '../_services/image-supervise.services';

type TItemImage = {
  imgItem: IImageSuperviseTenant;
  setFormProps: any;
  onCloseFormModal: () => void;
  deleteMutation: any;
  refetch?: any;
};
const ItemImage = (props: TItemImage) => {
  const { imgItem, setFormProps, onCloseFormModal, deleteMutation, refetch } =
    props;

  const { t } = useTranslation();
  const { getCurLoginInfoQuery } = useAbp();

  const { data: listTenant } = useQuery({
    queryKey: ['tenant/image-management'],
    queryFn: () => tenantSettingService.getAllTenant(),
  });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const createSchema = useMemo(
    () =>
      yup.object().shape({
        type: yup.string().required(t('Trường này là bắt buộc')),
      }),
    [t],
  );

  const onClickDeleteBtn = useCallback(() => {
    NiceModal.show(ConfirmModal, {
      title: t('Bạn có chắc muốn xóa'),
      btn2Variant: 'contained',
      btn2Click: () => {
        deleteMutation(imgItem.id);
      },
      children: <></>,
    });
  }, [deleteMutation, imgItem.id, t]);

  const updateFields = useMemo<TCrudFormField[]>(
    () => [
      {
        name: 'id',
        label: '',
        type: 'custom',
        noRender: true,
      },
      {
        name: 'imageUrl',
        label: t('Ảnh'),
        type: 'uploadimage',
        required: true,
      },
      {
        name: 'type',
        label: t('Loại ứng dụng'),
        type: 'autocomplete',
        required: true,
        options: CONFIG_TYPE,
        colSpan: 6,
      },
      {
        name: 'actions',
        label: t('Hành động'),
        type: 'autocomplete',
        options: NOTIF_TYPES_ARRAY,
        colSpan: 6,
      },
      {
        name: 'data',
        label: t('Dữ liệu điều hướng'),
        type: 'text',
        colSpan: 6,
      },
      {
        name: 'tenantId',
        label: t('Loại tenant'),
        type: 'autocomplete',
        options: listTenant?.items
          ? listTenant?.items?.map((item) => ({
              label: item.name,
              value: item.id,
            }))
          : [],
        colSpan: 6,
        noRender: !!getCurLoginInfoQuery?.data?.tenant?.id,
      },
      {
        name: 'scope',
        label: t('Phạm vi'),
        type: 'select',
        options: [
          {
            value: 0,
            label: t('Global'),
          },
          {
            value: 1,
            label: t('Tenant'),
          },
        ],
        defaultValue: 1,
        noRender: !!getCurLoginInfoQuery?.data?.tenant?.id,
        colSpan: 6,
      },
    ],
    [getCurLoginInfoQuery?.data?.tenant?.id, listTenant?.items, t],
  );

  return (
    <Grid item xs={4} key={imgItem.id}>
      <Box
        onClick={(e) => {
          e.stopPropagation();
        }}
        sx={{
          backgroundColor: 'white',
          width: '100%',
          height: 250,
          position: 'relative',
        }}
      >
        <picture>
          <img
            loading="lazy"
            src={imgItem?.imageUrl}
            alt="Img"
            width={'100%'}
            height={250}
            style={{
              objectFit: 'contain',
              backgroundPosition: 'center',
              borderRadius: 12,
            }}
          />
        </picture>
        <Box
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            backgroundColor: 'rgba(0,0,0,0.2)',
            borderRadius: 12,
          }}
        >
          <IconButton size={32} sx={{ color: 'white' }} onClick={handleClick}>
            <MoreIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem
              onClick={() => {
                const actions = imgItem.properties
                  ? JSON?.parse(imgItem.properties ?? '')?.actions
                  : '';
                const data = imgItem.properties
                  ? JSON?.parse(imgItem.properties ?? '')?.data
                  : '';
                setFormProps({
                  open: true,
                  onClose: onCloseFormModal,
                  name: 'updateImage',
                  mode: 'edit',
                  title: `${t('Chỉnh sửa hình ảnh')}`,
                  fields: updateFields,
                  service: imageSuperviseService,
                  schema: createSchema,
                  updatePath: '/Update',
                  defaultValues: {
                    ...imgItem,
                    actions: actions,
                    data: data,
                  },
                  refetchData: refetch,
                });
              }}
            >
              <EditIcon sx={{ mr: 1 }} color="warning" fontSize="small" />
              <Typography variant="body1" fontSize={15}>
                {t('Chỉnh sửa')}
              </Typography>
            </MenuItem>
            <MenuItem
              onClick={() => {
                onCloseFormModal(), onClickDeleteBtn();
              }}
            >
              <DeleteIcon sx={{ mr: 1 }} color="error" fontSize="small" />
              <Typography variant="body1" fontSize={15}>
                {t('Xóa')}
              </Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Box>
    </Grid>
  );
};

export default ItemImage;
