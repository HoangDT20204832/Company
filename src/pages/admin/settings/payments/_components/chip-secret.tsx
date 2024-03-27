import {
  ContentCopyTwoTone,
  VisibilityOffTwoTone,
  VisibilityTwoTone,
} from '@mui/icons-material';
import { IconButton, Stack, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useToggle } from 'react-use';

import useTranslation from '@/hooks/use-translation';

type TChipSecretProps = {
  label: string;
};

const ChipSecret = ({ label }: TChipSecretProps) => {
  const { t } = useTranslation();

  const [show, toggleShow] = useToggle(false);

  const { enqueueSnackbar } = useSnackbar();

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        bgcolor: 'grey.200',
        px: 1,
        m: 0,
        borderRadius: 3,
      }}
    >
      <Typography variant="subtitle2">
        {show ? label : label.replace(/./g, '•')}
      </Typography>

      <Stack direction="row">
        <IconButton size="small" onClick={toggleShow}>
          {show ? <VisibilityOffTwoTone /> : <VisibilityTwoTone />}
        </IconButton>

        <IconButton
          size="small"
          onClick={() => {
            navigator.clipboard.writeText(label);
            enqueueSnackbar(t('Đã copy vào clipboard'), {
              variant: 'success',
            });
          }}
        >
          <ContentCopyTwoTone />
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default ChipSecret;
