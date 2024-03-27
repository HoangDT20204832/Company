import {
  ArrowDropDownRounded,
  ExpandMore,
  OutboxRounded as Export,
  FilterAltTwoTone,
  ImportContactsRounded,
} from '@mui/icons-material';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import {
  Backdrop,
  Button,
  ButtonGroup,
  Card,
  CircularProgress,
  Dialog,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import { styled } from '@mui/material/styles';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

import usePopover from '@/hooks/use-popover';
import useTranslation from '@/hooks/use-translation';
import useGetAllBuildings from '@/services/buildings/use-get-all-buildings';
import useGetAllUrbans from '@/services/urban/use-get-all-urbans';
import { formatCurrency } from '@/services/utils';
import { dayjs } from '@/services/utils-date';

import CardItemChart from '../../reports/_components/card-item-chart';
import FilterPopover from './_components/filter-chart';
import statisticalBillService from './_service/statistical-invoices.service';

/* eslint-disable react/jsx-key */
const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'light'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
  margin: 0,
}));

const DetailBill = (props: any) => {
  const { listBill, data, monthSelect } = props;

  const [expanded, setExpanded] = useState<string | false>('panel1');

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const { t } = useTranslation();

  const { data: urbans } = useGetAllUrbans();

  const { data: buildingQuery } = useGetAllBuildings({
    urbanId: data ? data?.urbanId : '',
    pageSize: 1000,
  });

  const nameUrban = useMemo(
    () => urbans?.data?.find((el) => el.id === data?.urbanId)?.displayName,
    [data?.urbanId, urbans?.data],
  );

  const nameBuilding = useMemo(
    () =>
      buildingQuery?.data?.find((el) => el.id === data?.buildingId)
        ?.displayName,
    [buildingQuery?.data, data?.buildingId],
  );

  return (
    <Card sx={{ width: { xl: 'auto', md: 600, sm: 500 } }}>
      <Stack>
        <Typography
          sx={{
            py: '8px',
            textAlign: 'center',
            color: 'black',
            fontWeight: '500',
            fontSize: 20,
          }}
          variant="body1"
        >
          {t('Thống kê hóa đơn')}{' '}
          {nameBuilding
            ? `${t('tòa')} ${nameBuilding}`
            : nameUrban
              ? ` ${t('khu đô thị')} ${nameUrban} `
              : ''}{' '}
          {t('Tháng').toLowerCase()} {''}
          {monthSelect ? monthSelect : dayjs().month() + 1}
        </Typography>
      </Stack>
      <Divider variant="fullWidth" />
      <Stack>
        <Accordion
          expanded={expanded === 'panel1'}
          onChange={handleChange('panel1')}
        >
          <AccordionSummary
            expandIcon={<ExpandMore />}
            sx={{ height: 5, minHeight: 40 }}
          >
            <Typography>
              {t('Tổng tiền hóa đơn')}: {formatCurrency(listBill.totalCost)}
            </Typography>
          </AccordionSummary>
          <Divider variant="middle" />
          <AccordionDetails sx={{ paddingY: 0, paddingLeft: 2 }}>
            {Object.keys(listBill.totalCostChild)?.map((key) => {
              return (
                <Stack>
                  <Typography
                    sx={{
                      py: '10px',
                      px: 2,
                    }}
                    variant="body1"
                  >
                    {key}: {formatCurrency(listBill.totalCostChild[key])}
                  </Typography>
                  <Divider variant="middle" />
                </Stack>
              );
            })}
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'panel2'}
          onChange={handleChange('panel2')}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography>
              {t('Tổng tiền công nợ')}: {formatCurrency(listBill.totalDebt)}
            </Typography>
          </AccordionSummary>
          <Divider variant="middle" />
          <AccordionDetails sx={{ paddingY: 0, paddingLeft: 2 }}>
            {Object.keys(listBill.totalDebtChild)?.map((key) => {
              return (
                <Stack>
                  <Typography
                    sx={{
                      py: '10px',
                      px: 2,
                    }}
                    variant="body1"
                  >
                    {key}: {formatCurrency(listBill.totalDebtChild[key])}
                  </Typography>
                  <Divider variant="middle" />
                </Stack>
              );
            })}
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'panel3'}
          onChange={handleChange('panel3')}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography>
              {t('Tổng tiền hóa đơn đã thanh toán')}:{' '}
              {formatCurrency(listBill.totalPaid)}
            </Typography>
          </AccordionSummary>
          <Divider variant="middle" />
          <AccordionDetails sx={{ paddingY: 0, paddingLeft: 2 }}>
            {Object.keys(listBill.totalPaidChild)?.map((key) => {
              return (
                <Stack>
                  <Typography
                    sx={{
                      py: '10px',
                      px: 2,
                    }}
                    variant="body1"
                  >
                    {key}: {formatCurrency(listBill.totalPaidChild[key])}
                  </Typography>
                  <Divider variant="middle" />
                </Stack>
              );
            })}
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'panel4'}
          onChange={handleChange('panel4')}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography>
              {t('Tổng tiền thu')}:{' '}
              {formatCurrency(listBill.totalPaymentIncome)}
            </Typography>
          </AccordionSummary>
          <Divider variant="middle" />
          <AccordionDetails sx={{ paddingY: 0, paddingLeft: 2 }}>
            {Object.keys(listBill.totalPaymentIncomeChild)?.map((key) => {
              return (
                <Stack>
                  <Typography
                    sx={{
                      py: '10px',
                      px: 2,
                    }}
                    variant="body1"
                  >
                    {key}:{' '}
                    {formatCurrency(listBill.totalPaymentIncomeChild[key])}
                  </Typography>
                  <Divider variant="middle" />
                </Stack>
              );
            })}
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'panel5'}
          onChange={handleChange('panel5')}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography>{t('Các thông số khác')} </Typography>
          </AccordionSummary>
          <Divider variant="middle" />
          <AccordionDetails sx={{ paddingY: 0, paddingLeft: 2 }}>
            {Object.keys(listBill.otherParam)?.map((key) => {
              let name = 'chiếc';
              if (
                key === t('Tổng chỉ số điện tiêu thụ') ||
                key === t('Tổng chỉ số nước tiêu thụ')
              ) {
                name = 'kwh';
              }
              return (
                <Stack>
                  <Typography
                    sx={{
                      py: '10px',
                      px: 2,
                    }}
                    variant="body1"
                  >
                    {key}: {listBill.otherParam[key]} {name}
                  </Typography>
                  <Divider variant="middle" />
                </Stack>
              );
            })}
          </AccordionDetails>
        </Accordion>
      </Stack>
    </Card>
  );
};

const ReportInvoicePage = () => {
  const { t } = useTranslation();

  const filterPopover = usePopover();
  const [data, setData] = useState({});
  const [month, setMonth] = useState<number | undefined>();
  const [monthSelect, setMonthSelect] = useState<number | undefined>();
  const [loading, setLoading] = useState<boolean>();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { data: GetApartmentBillStatistics } = useQuery({
    queryKey: ['GetApartmentBillStatistics', { data }],
    queryFn: () => statisticalBillService.getApartmentBillStatistics(data),
  });

  const keyData = useMemo(
    () =>
      GetApartmentBillStatistics &&
      Object.keys(GetApartmentBillStatistics?.data),
    [GetApartmentBillStatistics],
  );

  const valueSumPaid = useMemo(
    () =>
      GetApartmentBillStatistics &&
      Object.values(GetApartmentBillStatistics?.data)?.map(
        (item: any) => item.sumPaid,
      ),
    [GetApartmentBillStatistics],
  );

  const valueSumUnpaid = useMemo(
    () =>
      GetApartmentBillStatistics &&
      Object.values(GetApartmentBillStatistics?.data)?.map(
        (item: any) => item.sumUnpaid,
      ),
    [GetApartmentBillStatistics],
  );

  const valueSumDebt = useMemo(
    () =>
      GetApartmentBillStatistics &&
      Object.values(GetApartmentBillStatistics?.data)?.map(
        (item: any) => item.sumDebt,
      ),
    [GetApartmentBillStatistics],
  );

  const { data: GetTotalStatisticUserBill } = useQuery({
    queryKey: ['GetTotalStatisticUserBill', { data, month }],
    queryFn: () =>
      statisticalBillService
        .getTotalStatisticUserBill({
          ...data,
          Period: month,
        })
        .then((result) => {
          return result;
        })
        .catch((error) => {
          console.error(t('Thất bại'), error);
        }),
  });

  const listBill: any = useMemo(
    () => ({
      totalCost: GetTotalStatisticUserBill?.data?.totalCost,
      totalCostChild: {
        [t('Tổng tiền hóa đơn điện')]:
          GetTotalStatisticUserBill?.data?.totalCostElectric,
        [t('Tổng tiền hóa đơn nước')]:
          GetTotalStatisticUserBill?.data?.totalCostWater,
        [t('Tổng tiền hóa đơn phí quản lý')]:
          GetTotalStatisticUserBill?.data?.totalCostManager,
        [t('Tổng tiền hóa đơn phí gửi xe tháng')]:
          GetTotalStatisticUserBill?.data?.totalCostParking,
        [t('Tổng tiền hóa đơn phí cư dân')]:
          GetTotalStatisticUserBill?.data?.totalCostResidence,
        [t('Tổng tiền các hóa đơn khác')]:
          GetTotalStatisticUserBill?.data?.totalCostOther,
      },
      totalDebt: GetTotalStatisticUserBill?.data?.totalDebt,
      totalDebtChild: {
        [t('Tổng tiền công nợ điện')]:
          GetTotalStatisticUserBill?.data?.totalDebtElectric,
        [t('Tổng tiền công nợ nước')]:
          GetTotalStatisticUserBill?.data?.totalDebtWater,
        [t('Tổng tiền công nợ phí quản lý')]:
          GetTotalStatisticUserBill?.data?.totalDebtManager,
        [t('Tổng tiền công nợ phí gửi xe tháng')]:
          GetTotalStatisticUserBill?.data?.totalDebtParking,
        [t('Tổng tiền công nợ phí cư dân')]:
          GetTotalStatisticUserBill?.data?.totalDebtResidence,
        [t('Tổng tiền công nợ khác')]:
          GetTotalStatisticUserBill?.data?.totalDebtOther,
      },
      totalPaid: GetTotalStatisticUserBill?.data?.totalPaid,
      totalPaidChild: {
        [t('Tổng tiền đã thanh toán điện')]:
          GetTotalStatisticUserBill?.data?.totalPaidElectric,
        [t('Tổng tiền đã thanh toán nước')]:
          GetTotalStatisticUserBill?.data?.totalPaidWater,
        [t('Tổng tiền đã thanh toán phí quản lý')]:
          GetTotalStatisticUserBill?.data?.totalPaidManager,
        [t('Tổng tiền đã thanh toán phí gửi xe tháng')]:
          GetTotalStatisticUserBill?.data?.totalPaidParking,
        [t('Tổng tiền đã thanh toán phí cư dân')]:
          GetTotalStatisticUserBill?.data?.totalPaidResidence,
        [t('Tổng tiền đã thanh toán khác')]:
          GetTotalStatisticUserBill?.data?.totalPaidOther,
      },
      totalPaymentIncome: GetTotalStatisticUserBill?.data?.totalPaymentIncome,
      totalPaymentIncomeChild: {
        [t('Thu trực tiếp')]:
          GetTotalStatisticUserBill?.data?.totalPaymentWithDirect,
        [t('Thu qua ngân hàng')]:
          GetTotalStatisticUserBill?.data?.totalPaymentWithBanking,
        [t('Thu qua MoMo')]:
          GetTotalStatisticUserBill?.data?.totalPaymentWithMomo,
        [t('Thu qua VnPay')]:
          GetTotalStatisticUserBill?.data?.totalPaymentWithVNPay,
        [t('Thu qua ZaloPay')]:
          GetTotalStatisticUserBill?.data?.totalPaymentWithZaloPay,
      },
      otherParam: {
        [t('Tổng chỉ số điện tiêu thụ')]:
          GetTotalStatisticUserBill?.data?.totalEIndex,
        [t('Tổng chỉ số nước tiêu thụ')]:
          GetTotalStatisticUserBill?.data?.totalWIndex,
        [t('Số ô tô')]: GetTotalStatisticUserBill?.data?.carNumber,
        [t('Số xe máy')]: GetTotalStatisticUserBill?.data?.motorbikeNumber,
        [t('Số xe đạp')]: GetTotalStatisticUserBill?.data?.bicycleNumber,
      },
    }),
    [GetTotalStatisticUserBill?.data, t],
  );

  return (
    <Grid container spacing={2} px={2} py={2}>
      <Dialog open={open} onClose={handleClose}>
        <DetailBill listBill={listBill} data={data} monthSelect={monthSelect} />
      </Dialog>
      <Grid
        xs={12}
        xl={4}
        sm={12}
        item
        sx={{ display: { xs: 'none', xl: 'block' } }}
      >
        <DetailBill listBill={listBill} data={data} monthSelect={monthSelect} />
      </Grid>

      <Grid xs={12} xl={8} md={12} sm={12} item>
        <CardItemChart
          setMonth={setMonth}
          setMonthSelect={setMonthSelect}
          title={t('Biểu đồ thống kê')}
          legend={[
            t('Tổng tiền đã thanh toán'),
            t('Tổng tiền chưa thanh toán'),
            t('Tổng tiền công nợ'),
          ]}
          left={40}
          xAxis={[
            {
              type: 'category',
              data: keyData,
            },
          ]}
          yAxis={[
            {
              type: 'value',
              name: '',
              axisLabel: {
                formatter: (params: number) => {
                  return formatCurrency(params);
                },
              },
            },
          ]}
          series={[
            {
              name: t('Tổng tiền đã thanh toán'),
              type: 'bar',
              barGap: 0,
              data: valueSumPaid,
              smooth: true,
              stack: 'Ad',
              emphasis: {
                focus: 'series',
              },
            },
            {
              name: t('Tổng tiền chưa thanh toán'),
              type: 'bar',
              barGap: 0,
              data: valueSumUnpaid,
              smooth: true,
              stack: 'Ad',
              emphasis: {
                focus: 'series',
              },
            },
            {
              name: t('Tổng tiền công nợ'),
              type: 'bar',
              barGap: 0,
              data: valueSumDebt,
              smooth: true,
              stack: 'Ad',
              color: 'teal',
              emphasis: {
                focus: 'series',
              },
            },
          ]}
          paddingLeft={2}
          widthBoolean={true}
          button={
            <Grid
              display="flex"
              justifyContent="flex-end"
              mt={0}
              alignItems="center"
            >
              <ButtonGroup variant="outlined">
                <Button
                  endIcon={<ImportContactsRounded />}
                  onClick={handleClickOpen}
                  sx={{
                    fontSize: 15,
                    height: 42.5,
                    justifyContent: 'stretch',
                    display: { xl: 'none' },
                  }}
                >
                  {t('Chi tiết hóa đơn')}
                </Button>
                <Button
                  ref={filterPopover.anchorRef}
                  variant="outlined"
                  startIcon={<FilterAltTwoTone />}
                  endIcon={
                    <ArrowDropDownRounded sx={{ width: 26, height: 26 }} />
                  }
                  onClick={filterPopover.handleOpen}
                  sx={{
                    fontSize: 15,
                    height: 42.5,
                    justifyContent: 'stretch',
                    width: 122,
                    '.MuiButton-endIcon': {
                      ml: 'auto',
                      mr: -1.6,
                    },
                    display: { xl: 'none' },
                  }}
                >
                  {t('Lọc')}
                </Button>
              </ButtonGroup>
              <Button
                ref={filterPopover.anchorRef}
                variant="outlined"
                startIcon={<FilterAltTwoTone />}
                endIcon={
                  <ArrowDropDownRounded sx={{ width: 26, height: 26 }} />
                }
                onClick={filterPopover.handleOpen}
                sx={{
                  fontSize: 15,
                  height: 42.5,
                  justifyContent: 'stretch',
                  width: 122,
                  '.MuiButton-endIcon': {
                    ml: 'auto',
                    mr: -1.6,
                  },
                  display: { xs: 'none', xl: 'flex' },
                }}
              >
                {t('Lọc')}
              </Button>
              <FilterPopover
                anchorEl={filterPopover.anchorRef.current}
                open={filterPopover.open}
                onClose={() => {
                  filterPopover.handleClose();
                }}
                setData={setData}
              />
            </Grid>
          }
          buttonExport={
            <ButtonGroup variant="outlined" sx={{ mr: 1 }}>
              <Button
                variant="soft"
                startIcon={<Export />}
                onClick={() => {
                  setLoading(true);
                  statisticalBillService
                    .exportStatisticBillExcel(data)
                    .then((result) => {
                      setLoading(false);
                      return result;
                    })
                    .catch((error) => {
                      console.error(t('Thất bại'), error);
                    });
                }}
                color="primary"
              >
                {t('Xuất thống kê')}
              </Button>
              <Button
                variant="soft"
                startIcon={<Export />}
                onClick={() => {
                  setLoading(true);
                  statisticalBillService
                    .exportAllDetailUserBillToExcel(data)
                    .then((result) => {
                      setLoading(false);
                      return result;
                    })
                    .catch((error) => {
                      console.error(t('Thất bại'), error);
                    });
                }}
                color="primary"
              >
                {t('Xuất báo cáo chi tiết')}
              </Button>
            </ButtonGroup>
          }
          height={652}
        />
      </Grid>

      <Backdrop sx={{ color: '#fff', zIndex: 10 }} open={!!loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Grid>
  );
};

export default ReportInvoicePage;
