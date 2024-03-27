import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import useTranslation from '@/hooks/use-translation';

import CardItemChart from '../../_components/card-item-chart';
import reflectService from '../_services/reflect.service';

const ChartFeedbackCitizen = ({
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
    queryKey: ['GetStatisticsCitizenReflect', month, year, urbanId, buildingId],
    queryFn: () =>
      reflectService.getStatisticsCitizenReflect(
        12,
        4,
        1,
        month,
        year,
        urbanId,
        buildingId,
      ),
  });

  const { data: GetStatisticsCitizenReflectComplete } = useQuery({
    queryKey: [
      'GetStatisticsCitizenReflectComplete',
      month,
      year,
      urbanId,
      buildingId,
    ],
    queryFn: () =>
      reflectService.getStatisticsCitizenReflect(
        12,
        4,
        2,
        month,
        year,
        urbanId,
        buildingId,
      ),
  });

  const valueGetComplete = useMemo(
    () =>
      GetStatisticsCitizenReflectComplete &&
      Object.values(GetStatisticsCitizenReflectComplete?.data),
    [GetStatisticsCitizenReflectComplete],
  );

  const keyData = useMemo(
    () =>
      GetStatisticsCitizenReflect &&
      Object.keys(GetStatisticsCitizenReflect?.data),
    [GetStatisticsCitizenReflect],
  );
  const valueData = useMemo(
    () =>
      GetStatisticsCitizenReflect &&
      Object.values(GetStatisticsCitizenReflect?.data),
    [GetStatisticsCitizenReflect],
  );

  return (
    <CardItemChart
      title={t('Phản ánh của cư dân')}
      legend={[t('Phản ánh của cư dân'), t('Phản ánh đã xử lý')]}
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
          name: t('Phản ánh của cư dân'),
          type: 'line',
          barWidth: '60%',
          data: valueData,
          smooth: true,
        },
        {
          name: t('Phản ánh đã xử lý'),
          type: 'line',
          barWidth: '60%',
          data: valueGetComplete,
          smooth: true,
          color: 'green',
        },
      ]}
    />
  );
};

export default ChartFeedbackCitizen;
