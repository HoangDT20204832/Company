import {
  ConnectWithoutContactOutlined,
  GroupsOutlined,
  QuickreplyOutlined,
  SummarizeOutlined,
} from '@mui/icons-material';
import { Box, Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import useTranslation from '@/hooks/use-translation';

import CardItemRecord from '../_components/card-item-record';
import ChartFaqs from './_components/chart-faq';
import ChartFeedbackCitizen from './_components/chart-feedback-citizen';
import ChartStatisticsCitizen from './_components/chart-statistics-citizen';
import ChartStatisticsCityVote from './_components/chart-statistics-city-vote';
import ChartUserStatistics from './_components/chart-user-statistics';
import reportService from './_services/report.service';

const ReportOverViewPage = () => {
  const { t } = useTranslation();

  const { data: GetReflectCountStatistic } = useQuery({
    queryKey: ['GetReflectCountStatistic'],
    queryFn: () => reportService.getReflectCountStatistic(),
  });

  const { data: GetChatMsgCountStatistics } = useQuery({
    queryKey: ['GetChatMsgCountStatistics'],
    queryFn: () => reportService.getChatMsgCountStatistics(),
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} px={2} py={2}>
        <Grid xs={12} xl={3} lg={3} md={3} sm={6} item>
          <CardItemRecord
            total={GetReflectCountStatistic?.data}
            title={t('quản lý')}
            content={t('Số lượt phản ánh')}
            icon={<QuickreplyOutlined sx={{ fontSize: 20 }} />}
            background="orange"
            pathRouter="/digital-management/feedbacks"
          />
        </Grid>
        <Grid xs={12} xl={3} lg={3} md={3} sm={6} item>
          <CardItemRecord
            total={GetChatMsgCountStatistics?.data}
            title={t('quản lý')}
            content={t('Lượt giao tiếp giữa người dân và ban quản lý')}
            icon={<ConnectWithoutContactOutlined sx={{ fontSize: 20 }} />}
            background="#007bff"
            pathRouter="/digital-management/communications"
          />
        </Grid>
        <Grid xs={12} xl={3} lg={3} md={3} sm={6} item>
          <CardItemRecord
            total={25}
            title={t('quản lý')}
            content={t('Số dân cư')}
            icon={<GroupsOutlined sx={{ fontSize: 20 }} />}
            background="#007bff"
            pathRouter="/citizens/list"
          />
        </Grid>
        <Grid xs={12} xl={3} lg={3} md={3} sm={6} item>
          <CardItemRecord
            total={25}
            title={t('quản lý')}
            content={t('Số khảo sát được thực hiện')}
            icon={<SummarizeOutlined sx={{ fontSize: 20 }} />}
            background="#007bff"
            pathRouter="/digital-management/surveys"
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} px={2} mb={2}>
        <Grid xs={12} xl={6} lg={6} md={12} sm={12} item>
          <ChartFeedbackCitizen />
        </Grid>
        <Grid xs={12} xl={6} lg={6} md={12} sm={12} item>
          <ChartFaqs />
        </Grid>
        <Grid xs={12} xl={12} lg={12} md={12} sm={12} item>
          <ChartStatisticsCityVote />
        </Grid>
        <Grid xs={12} xl={6} lg={6} md={12} sm={12} item>
          <ChartStatisticsCitizen />
        </Grid>
        <Grid xs={12} xl={6} lg={6} md={12} sm={12} item>
          <ChartUserStatistics />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReportOverViewPage;
