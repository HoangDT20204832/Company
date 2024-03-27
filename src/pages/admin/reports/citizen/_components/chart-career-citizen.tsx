import { Card, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import ReactEcharts from 'echarts-for-react';
import { useMemo } from 'react';

import useTranslation from '@/hooks/use-translation';

import reportCitizenService from '../_services/citizen.service';

const ChartCareerCitizen = () => {
  const { t } = useTranslation();

  const { data: GetStatisticsCareerCitizenTemp } = useQuery({
    queryKey: ['getStatisticsCareerCitizenTemp', 1],
    queryFn: () => reportCitizenService.getStatisticsCareerCitizenTemp(6),
  });
  const keyData = useMemo(
    () =>
      GetStatisticsCareerCitizenTemp &&
      Object.keys(GetStatisticsCareerCitizenTemp?.data),
    [GetStatisticsCareerCitizenTemp],
  );
  return (
    <Card
      sx={{
        pt: 2,
        height: { xl: 652, xs: 600 },
      }}
    >
      <Stack
        direction="row"
        mx={5}
        justifyContent="space-between"
        mt={2}
        alignItems="center"
      >
        <Typography
          sx={{
            textAlign: 'center',
            mb: 1,
            fontWeight: 500,
            fontSize: 25,
          }}
        >
          {t('Thống kê nghề nghiệp cư dân')}
        </Typography>
      </Stack>
      <ReactEcharts
        key={Date.now()}
        theme="light"
        option={{
          color: ['#3398DB'],
          tooltip: {
            trigger: 'item',
          },
          legend: {
            bottom: 10,
            left: 'center',
            data: keyData,
          },
          grid: {},
          series: [
            {
              type: 'pie',
              radius: '65%',
              center: ['50%', '50%'],
              selectedMode: 'single',
              data: GetStatisticsCareerCitizenTemp?.data
                ? Object.entries(GetStatisticsCareerCitizenTemp?.data).map(
                    ([name, value]) => ({ name, value }),
                  )
                : [],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
              },
            },
          ],
        }}
        style={{
          width: '100%',
          height: '91%',
        }}
      />
    </Card>
  );
};

export default ChartCareerCitizen;
