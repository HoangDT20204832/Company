import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import useTranslation from '@/hooks/use-translation';

import CardItemChart from '../../_components/card-item-chart';
import reflectService from '../_services/reflect.service';

const ChartProcessingTimeCitizen = ({
  month,
  year,
  urbanId,
  buildingId,
}: {
  month: number;
  year: number;
  urbanId: number;
  buildingId: number;
}) => {
  const { t } = useTranslation();

  const { data: GetStatisticsCitizenReflect } = useQuery({
    queryKey: [
      'GetStatisticsCitizenReflectHours',
      month,
      year,
      urbanId,
      buildingId,
    ],
    queryFn: () =>
      reflectService.getStatisticsCitizenReflect(
        12,
        5,
        2,
        month,
        year,
        urbanId,
        buildingId,
      ),
  });
  const valueData = useMemo(
    () =>
      GetStatisticsCitizenReflect &&
      Object.values(GetStatisticsCitizenReflect?.data),
    [GetStatisticsCitizenReflect],
  );

  return (
    <CardItemChart
      title={t('Thời gian xử lý phản ánh')}
      legend={[]}
      xAxis={[
        {
          type: 'category',
          data: [
            'Trong 1 ngày',
            '1 ngày đến 3 ngày',
            '3 đến 5 ngày',
            'Lớn hơn 5 ngày',
          ],
        },
      ]}
      yAxis={[
        {
          type: 'value',
        },
      ]}
      series={[
        {
          data: valueData,
          type: 'bar',
        },
      ]}
    />
  );
};

export default ChartProcessingTimeCitizen;
