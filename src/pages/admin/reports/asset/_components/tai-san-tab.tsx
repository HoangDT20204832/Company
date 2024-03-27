import { VisibilityTwoTone as ViewIcon } from '@mui/icons-material';
import { Box, Button, Grid, Stack, Typography, styled } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useGridApiRef } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import BaseFormInput from '@/base/base-form-input';
import BaseStyledTable from '@/base/base-styled-table';
import { TCrudFormField } from '@/base/crud-form-field.type';
import useTranslation from '@/hooks/use-translation';
import taiSanService from '@/services/assets/services/taisan.service';
import { formatCurrency } from '@/services/utils';
import { convertFieldsToValues, removeEmptyKeys } from '@/services/utils';
import { resetFields } from '@/services/utils';

import ViewNhapXuatModal from './view-info-nhap-xuat';

const TaiSanTab = () => {
  const { t } = useTranslation();
  const { data: dataNhomTaiSan } = useQuery({
    queryKey: ['dataNhomTaiSan'],
    queryFn: () => taiSanService.getAllNhomTaiSan<any>(),
  });
  const { data: dataLoaiTaiSan } = useQuery({
    queryKey: ['dataLoaiTaiSan'],
    queryFn: () => taiSanService.getAllLoaiTaiSan<any>(),
  });
  const { data: dataNhaSanXuat } = useQuery({
    queryKey: ['dataNhaSanXuat'],
    queryFn: () => taiSanService.getAllNhaSanXuat<any>(),
  });

  const { data: dataDonViTaiSan } = useQuery({
    queryKey: ['dataDonViTaiSan'],
    queryFn: () => taiSanService.getAllDonViTaiSan<any>(),
  });

  const { data: dataKhoTaiSan } = useQuery({
    queryKey: ['dataKhoTaiSan'],
    queryFn: () => taiSanService.getAllKhoTaiSan<any>(),
  });
  const filterFields = useMemo<TCrudFormField[]>(
    () => [
      {
        name: 'nhomTaiSanId',
        label: t('Nhóm tài sản'),
        type: 'autocomplete',
        colSpan: 4,
        options: dataNhomTaiSan?.data.map((x: any) => ({
          label: x.title,
          value: x.id,
        })),
      },
      {
        name: 'loaiTaiSanId',
        label: t('Loại tài sản'),
        type: 'autocomplete',
        colSpan: 4,
        options: dataLoaiTaiSan?.data.map((x: any) => ({
          label: x.title,
          value: x.id,
        })),
      },
      {
        name: 'khoTaiSanId',
        label: t('Kho tài sản'),
        type: 'autocomplete',
        colSpan: 4,
        options: dataKhoTaiSan?.data.map((x: any) => ({
          label: x.title,
          value: x.id,
        })),
      },
      {
        name: 'nhaSanXuatId',
        label: t('Nhà sản xuất'),
        type: 'autocomplete',
        colSpan: 4,
        options: dataNhaSanXuat?.data.map((x: any) => ({
          label: x.title,
          value: x.id,
        })),
      },
      {
        name: 'donViTinhId',
        label: t('Đơn vị tính'),
        type: 'autocomplete',
        colSpan: 4,
        options: dataDonViTaiSan?.data.map((x: any) => ({
          label: x.title,
          value: x.id,
        })),
      },
    ],
    [
      dataDonViTaiSan?.data,
      dataKhoTaiSan?.data,
      dataLoaiTaiSan?.data,
      dataNhaSanXuat?.data,
      dataNhomTaiSan?.data,
      t,
    ],
  );
  const defaultGetAllParams = {};
  const [show, setShow] = useState(false);
  const [taiSanId, settaiSanId] = useState<any>(null);
  const [params, setParams] = useState({
    page: 0,
    pageSize: 10,
    ...convertFieldsToValues(filterFields || []),
  });
  let { page, pageSize, ...filter } = params;
  page = +page || 0;
  pageSize = +pageSize || 10;
  filter = filter || convertFieldsToValues(filterFields || []);
  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: 'id',
        headerName: `${t('STT')}`,
        filterable: false,
        sortable: false,
        hideSortIcons: true,
        headerAlign: 'center',
        align: 'center',
        type: 'number',
        width: 70,
        renderCell: (params) => {
          return params.api.getRowIndexRelativeToVisibleRows(params.row.id) + 1;
        },
      },
      {
        field: 'code',
        headerName: t('Mã tài sản'),
        editable: false,
        flex: 1,
      },

      {
        field: 'title',
        headerName: t('Tên tài sản'),
        editable: false,
        flex: 3,
      },
      {
        field: 'soLuongTrongKho',
        headerName: t('Số lượng còn lại'),
        type: 'number',
        editable: false,
        flex: 1,
      },
      {
        field: 'soLuongHong',
        headerName: t('Số lượng hỏng'),
        type: 'number',
        editable: false,
        flex: 1,
      },
      {
        field: 'tongSoLuong',
        headerName: t('Tổng số lượng'),
        type: 'number',
        editable: false,
        flex: 1,
      },
      // {
      //   field: 'giaNhap',
      //   headerName: t('Giá nhập'),
      //   editable: false,
      //   flex: 1,
      // },
      {
        field: 'giaNhap',
        headerName: t('Giá nhập'),
        type: 'number',
        editable: false,
        renderCell: (params) => {
          return (
            <Typography fontWeight={600} variant="body2">
              {formatCurrency(params.row.giaNhap)}
            </Typography>
          );
        },
        minWidth: 120,
      },
      {
        field: 'id1',
        headerName: t('Chi tiết'),
        type: 'actions',
        editable: false,
        renderCell: (params) => {
          return (
            <ViewIcon
              sx={{ cursor: 'pointer' }}
              fontSize="small"
              color="primary"
              onClick={() => {
                setShow(true);
                settaiSanId(params.row.id);
              }}
            />
          );
        },
        minWidth: 120,
      },
    ],
    [t],
  );

  const getAllQuery = useQuery({
    queryKey: [
      `report/taisan/getAll`,
      { ...defaultGetAllParams, page, pageSize, ...filter },
    ],
    queryFn: () =>
      taiSanService.getAll<any>(
        removeEmptyKeys({
          ...defaultGetAllParams,
          page: page,
          pageSize: pageSize,
          ...filter,
        }),
        '/getAll',
      ),
    keepPreviousData: true,
    staleTime: Infinity,
  });
  const apiRef = useGridApiRef();
  const { handleSubmit, control, reset } = useForm({
    defaultValues: filter,
  });
  const onClose = () => {
    setShow(false);
    settaiSanId(null);
  };

  const onSubmit = (data: any) => {
    setParams({
      ...params,
      ...data,
    });
  };
  return (
    <>
      <Stack height={`calc(100dvh - 80px)`} mb={2}>
        <StyledTableWrapper>
          <StyledPageHeader>
            <div className="bottom-wrapper">
              {filterFields && (
                <>
                  <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={1} mb={2}>
                      {filterFields.map((field, index) => (
                        <Grid
                          key={`${index}`}
                          xs={field.colSpan || 12}
                          sx={{ padding: '10px' }}
                        >
                          {BaseFormInput({
                            field,
                            control,
                          })}
                        </Grid>
                      ))}
                    </Grid>

                    <Stack direction="row" justifyContent="end" spacing={1}>
                      <Button
                        color="inherit"
                        onClick={() => {
                          reset(resetFields(filterFields), {
                            keepValues: false,
                            keepDirty: false,
                            keepDefaultValues: false,
                          });
                          setParams({
                            page,
                            pageSize,
                            keyWord: filter.keyWord,
                            orderBy: filter.orderBy,
                            tab: params?.tab,
                          });
                          //onClose();
                        }}
                      >
                        {t('Làm mới')}
                      </Button>

                      <Button type="submit" variant="contained">
                        {t('Thống kê')}
                      </Button>
                    </Stack>
                  </Box>
                </>
              )}
            </div>
          </StyledPageHeader>

          <BaseStyledTable
            apiRef={apiRef}
            columns={columns}
            rows={getAllQuery?.data?.data || getAllQuery?.data?.items || []}
            rowCount={
              getAllQuery?.data?.totalRecords ||
              getAllQuery?.data?.totalCount ||
              0
            }
            initialState={{
              pagination: {
                paginationModel: {
                  page: 0,
                  pageSize: 10,
                },
              },
            }}
            paginationModel={{
              page,
              pageSize,
            }}
            onPaginationModelChange={(model) => {
              setParams({
                ...params,
                page: model.page,
                pageSize: model.pageSize,
              });
            }}
            pageSizeOptions={[10, 25, 50, 100]}
            keepNonExistentRowsSelected
            disableRowSelectionOnClick
            pagination
            paginationMode="server"
            getRowId={(row) => row.id}
            getRowHeight={() => 'auto'}
            columnHeaderHeight={48}
            stickyLastCol={false}
          />
        </StyledTableWrapper>
      </Stack>
      <ViewNhapXuatModal idTaiSan={taiSanId} onClose={onClose} open={show} />
    </>
  );
};
export const StyledPageHeader = styled(Box)`
  background-color: ${({ theme }) => theme.palette.common.white};
  border-radius: 15px;
  margin-bottom: 10px;
  flex: 0 0 auto;
  min-height: 0px;
`;

const StyledTableWrapper = styled(Box)`
  background-color: ${({ theme }) => theme.palette.common.white};
  padding: 16px;
  border-radius: 16px;
  flex: 1 1 auto;
  min-height: auto;
  & .simplebar-wrapper {
    height: 100%;
  }
  & .simplebar-content {
    height: 100%;
  }
`;
export default TaiSanTab;
