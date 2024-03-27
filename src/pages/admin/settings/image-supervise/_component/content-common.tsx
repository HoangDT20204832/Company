import { Box, Grid, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useCallback, useState } from 'react';

import BaseCrudFormModal, {
  TBaseCrudFormModalProps,
} from '@/base/base-crud-form-modal';
import useTranslation from '@/hooks/use-translation';

import { IImageSuperviseTenant } from '../_services/image-supervise.model';
import imageSuperviseService from '../_services/image-supervise.services';
import ItemImage from './item-image-supervise';

type TContentCommon = {
  data: any;
};
const ContentCommon = (props: TContentCommon) => {
  const { data } = props;
  const { t } = useTranslation();

  const { enqueueSnackbar } = useSnackbar();

  const [formProps, setFormProps] = useState<Partial<TBaseCrudFormModalProps>>({
    open: false,
    onClose: () => setFormProps((data: any) => ({ ...data, open: false })),
  });

  const onCloseFormModal = useCallback(() => {
    setFormProps((data: any) => ({ ...data, open: false }));
  }, []);

  const { data: getListImageTenant, refetch } = useQuery({
    queryKey: [`image-supervise-get-list`, data],
    queryFn: () => imageSuperviseService.getImage(data, '/GetList'),
    keepPreviousData: true,
  });

  const deleteMutation = async (id: number) => {
    try {
      const result = await imageSuperviseService.deleteItem(id, '/Delete');
      if (result?.success === true) {
        refetch();
        enqueueSnackbar(t('Xóa thành công'), { variant: 'success' });
      } else {
        enqueueSnackbar(t('Xóa thất bại'), { variant: 'error' });
      }
    } catch {
      return;
    }
  };

  return (
    <Stack pb={1}>
      <Grid container spacing={2} px={2}>
        {getListImageTenant?.map((imgItem: IImageSuperviseTenant) => {
          return (
            <ItemImage
              imgItem={imgItem}
              setFormProps={setFormProps}
              onCloseFormModal={onCloseFormModal}
              deleteMutation={deleteMutation}
              key={imgItem.id}
              refetch={refetch}
            />
          );
        })}
      </Grid>
      {getListImageTenant?.length == 0 && (
        <Box
          sx={{
            width: '100%',
            height: '100%',
            textAlign: 'center',
            mt: '20%',
            color: 'black',
          }}
        >
          <Typography variant="body1">{t('Không có ảnh')}</Typography>
        </Box>
      )}
      <BaseCrudFormModal {...(formProps as any)} />
    </Stack>
  );
};

export default ContentCommon;
