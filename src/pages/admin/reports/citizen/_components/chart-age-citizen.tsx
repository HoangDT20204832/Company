import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import useTranslation from '@/hooks/use-translation';

import CardItemChart from '../../_components/card-item-chart';
import reportCitizenService from '../_services/citizen.service';

const ChartAgeCitizen = () => {
  const { t } = useTranslation();

  const { data: GetStatisticsCitizenTempBoy } = useQuery({
    queryKey: ['GetStatisticsCitizenTemp', 1],
    queryFn: () => reportCitizenService.getStatisticsCitizenTemp(1, 5),
  });

  const { data: GetStatisticsCitizenTempGirl } = useQuery({
    queryKey: ['GetStatisticsCitizenTemp', 2],
    queryFn: () => reportCitizenService.getStatisticsCitizenTemp(2, 5),
  });

  const valueGetGirl = useMemo(
    () =>
      GetStatisticsCitizenTempGirl &&
      Object.values(GetStatisticsCitizenTempGirl?.data),
    [GetStatisticsCitizenTempGirl],
  );

  const keyData = useMemo(
    () =>
      GetStatisticsCitizenTempBoy &&
      Object.keys(GetStatisticsCitizenTempBoy?.data),
    [GetStatisticsCitizenTempBoy],
  );
  const valueGetBoy = useMemo(
    () =>
      GetStatisticsCitizenTempBoy &&
      Object.values(GetStatisticsCitizenTempBoy?.data),
    [GetStatisticsCitizenTempBoy],
  );
  return (
    <CardItemChart
      title={t('Thống kê độ tuổi cư dân')}
      height={600}
      legend={[t('Nam'), t('Nữ')]}
      xAxis={[
        {
          type: 'category',
          data: keyData,
        },
      ]}
      yAxis={[
        {
          type: 'value',
        },
      ]}
      series={[
        {
          name: t('Nam'),
          type: 'bar',
          data: valueGetBoy,
        },
        {
          name: t('Nữ'),
          type: 'bar',
          data: valueGetGirl,
          color: 'red',
        },
      ]}
    />
  );
};

export default ChartAgeCitizen;
