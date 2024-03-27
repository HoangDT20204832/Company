import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import useTranslation from '@/hooks/use-translation';

import CardItemChart from '../../_components/card-item-chart';
import reflectService from '../_services/reflect.service';

const ChartGeneralCitizen = ({
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
      'GetStatisticsCitizenReflectMonth',
      month,
      year,
      urbanId,
      buildingId,
    ],
    queryFn: () =>
      reflectService.getStatisticsCitizenReflect(
        12,
        2,
        1,
        month,
        year,
        urbanId,
        buildingId,
      ),
  });

  const { data: GetStatisticsCitizenReflectComplete } = useQuery({
    queryKey: [
      'GetStatisticsCitizenReflectMonthComplete',
      month,
      year,
      urbanId,
      buildingId,
    ],
    queryFn: () =>
      reflectService.getStatisticsCitizenReflect(
        12,
        2,
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
          type: 'bar',
          data: valueData,
        },
        {
          name: t('Phản ánh đã xử lý'),
          type: 'bar',
          data: valueGetComplete,
          color: 'green',
        },
      ]}
    />
  );
};

export default ChartGeneralCitizen;
