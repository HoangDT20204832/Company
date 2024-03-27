import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import useTranslation from '@/hooks/use-translation';

import CardItemChart from '../../_components/card-item-chart';
import reflectService from '../_services/reflect.service';

const ChartRankingCitizen = ({
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
      'GetStatisticsCitizenReflectStar',
      month,
      year,
      urbanId,
      buildingId,
    ],
    queryFn: () =>
      reflectService.getStatisticsCitizenReflect(
        12,
        6,
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
      title={t('Đánh giá')}
      legend={[]}
      xAxis={[
        {
          type: 'value',
          boundaryGap: [0, 0.01],
        },
      ]}
      yAxis={[
        {
          type: 'category',
          data: ['1 sao', '2 sao', '3 sao', '4 sao', '5 sao'],
          inverse: true,
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

export default ChartRankingCitizen;
