import { Box, Button, Chip, Grid, Stack, styled } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useGridApiRef } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import BaseFormInput from '@/base/base-form-input';
import BaseStyledTable from '@/base/base-styled-table';
import { TCrudFormField } from '@/base/crud-form-field.type';
import useTranslation from '@/hooks/use-translation';
import taiSanChiTietService from '@/services/assets/services/taisanchitiet.service';
import { convertFieldsToValues, removeEmptyKeys } from '@/services/utils';
import { resetFields } from '@/services/utils';

const TaiSanChiTietTab = () => {
  const { t } = useTranslation();
  const { data: dataMaHeThong } = useQuery({
    queryKey: ['dataMaHeThong'],
    queryFn: () => taiSanChiTietService.getAllMaHeThong<any>(),
  });
  const { data: dataNhomTaiSan } = useQuery({
    queryKey: ['dataNhomTaiSan'],
    queryFn: () => taiSanChiTietService.getAllNhomTaiSan<any>(null, true),
  });
  const { data: dataHinhThuc } = useQuery({
    queryKey: ['dataHinhThuc'],
    queryFn: () =>
      taiSanChiTietService.getEnum<any>('HinhThucTaiSanChiTietEnum'),
  });

  const { data: dataTrangThai } = useQuery({
    queryKey: ['dataTrangThai'],
    queryFn: () =>
      taiSanChiTietService.getEnum<any>('TrangThaiTaiSanChiTietEnum'),
  });

  const filterFields = useMemo<TCrudFormField[]>(
    () => [
      {
        name: 'maHeThongId',
        label: t('Mã hệ thống'),
        type: 'autocomplete',
        colSpan: 6,
        options: dataMaHeThong?.data.map((x: any) => ({
          label: x.code,
          value: x.id,
        })),
      },
      {
        name: 'nhomTaiSanId',
        label: t('Nhóm tài sản'),
        type: 'autocomplete',
        colSpan: 6,
        options: dataNhomTaiSan?.data.map((x: any) => ({
          label: x.title,
          value: x.id,
        })),
      },

      {
        name: 'hinhThuc',
        label: t('Hình thức'),
        type: 'autocomplete',
        colSpan: 6,
        options: dataHinhThuc?.data,
      },
      {
        name: 'trangThai',
        label: t('Trạng thái'),
        type: 'autocomplete',
        colSpan: 6,
        options: dataTrangThai?.data,
      },
    ],
    [
      dataHinhThuc?.data,
      dataMaHeThong?.data,
      dataNhomTaiSan?.data,
      dataTrangThai?.data,
      t,
    ],
  );
  const defaultGetAllParams = {};

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
        flex: 2,
      },

      {
        field: 'hinhThucText',
        headerName: t('Hình thức'),
        editable: false,
        flex: 1,
      },

      {
        field: 'nhomTaiSanText',
        headerName: t('Nhóm tài sản'),
        editable: false,
        flex: 1,
      },

      {
        field: 'trangThai',
        headerName: t('Trạng thái'),
        valueFormatter: (params) => {
          const status = params.value;
          switch (status) {
            case 1:
              return t('Đang sử dụng');
            case 2:
              return t('Ngưng sử dụng');
            default:
              return t('Ngưng sử dụng');
          }
        },
        renderCell: (params: GridRenderCellParams) => (
          <Chip
            label={params.formattedValue}
            //variant="soft"
            color={
              params.value === 1
                ? 'success'
                : params.value === 2
                  ? 'warning'
                  : 'default'
            }
          />
        ),
        editable: false,
        width: 140,
      },
    ],
    [t],
  );

  const getAllQuery = useQuery({
    queryKey: [
      `report/taisanchitiet/getAll`,
      { ...defaultGetAllParams, page, pageSize, ...filter },
    ],
    queryFn: () =>
      taiSanChiTietService.getAll<any>(
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

  const onSubmit = (data: any) => {
    setParams({
      ...params,
      ...data,
    });
  };
  return (
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
                        key={`${index}-${field.name}-${field.type}`}
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
export default TaiSanChiTietTab;
