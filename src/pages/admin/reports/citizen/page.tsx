import { Box, Grid, Stack, Typography } from '@mui/material';

import useTranslation from '@/hooks/use-translation';

import ChartAgeCitizen from './_components/chart-age-citizen';
import ChartCareerCitizen from './_components/chart-career-citizen';

const ReportCitizenPage = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} px={2} py={2}>
        <Grid xs={12} xl={12} lg={12} md={12} sm={12} item>
          <Stack
            direction="row"
            justifyContent="space-between"
            spacing={4}
            sx={{ mb: 0.8 }}
          >
            <Stack spacing={1}>
              <Typography variant="h5" component="h1">
                {t('Thống kê cư dân')}
              </Typography>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
      <Grid container spacing={2} px={2} mb={2}>
        <Grid xs={12} xl={6} lg={6} md={12} sm={12} item>
          <ChartAgeCitizen />
        </Grid>
        <Grid xs={12} xl={6} lg={6} md={12} sm={12} item>
          <ChartCareerCitizen />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReportCitizenPage;
