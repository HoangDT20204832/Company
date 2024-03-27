import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';
import TextSnippetTwoToneIcon from '@mui/icons-material/TextSnippetTwoTone';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  TooltipProps,
  Typography,
  styled,
  tooltipClasses,
} from '@mui/material';
import { ForwardRefRenderFunction, forwardRef, useId, useMemo } from 'react';

import { getFileDetail } from '@/services/utils';

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    boxShadow: theme.shadows[1],
    maxWidth: 'none',
    padding: 0,
  },
}));

type TMessageFileUploadProps = {
  value?: FileList;
  onChange?: (v?: FileList) => void;
  error?: boolean;
  helpText?: string;
  accept?: string;
  maxWidthText?: string;
};

const MessageFileUpload: ForwardRefRenderFunction<
  HTMLDivElement,
  TMessageFileUploadProps
> = (
  { value, onChange, error, helpText, accept = '*', maxWidthText = '100px' },
  forwardedRef,
) => {
  const uid = useId();
  const mappedFileData = useMemo(() => {
    if (value?.[0]) {
      return {
        localUrl: URL.createObjectURL(value[0]),
        ...getFileDetail(value[0]),
      };
    }
  }, [value]);

  return (
    <Stack
      direction="row"
      alignItems="center"
      key={uid + JSON.stringify(value)}
      ref={forwardedRef}
    >
      {mappedFileData ? (
        <>
          <Chip
            label={
              <LightTooltip
                disableFocusListener
                placement="top-end"
                title={
                  <Card style={{ maxWidth: 400, borderRadius: 8 }}>
                    <CardContent sx={{ px: 1, pt: 1, pb: 0 }}>
                      <Typography variant="caption" fontSize={16}>
                        {mappedFileData.filename}.{mappedFileData.extension}
                      </Typography>
                      {!!error && (
                        <Typography fontSize={14} color="red">
                          {helpText}
                        </Typography>
                      )}
                    </CardContent>
                    <CardActions>
                      <Typography fontSize={14}>
                        {mappedFileData.sizeString}
                      </Typography>
                      <Button
                        sx={{ ml: 'auto' }}
                        component="a"
                        size="small"
                        color="primary"
                        startIcon={<LaunchRoundedIcon />}
                        href={mappedFileData.localUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Xem file
                      </Button>
                      <Divider
                        flexItem
                        variant="middle"
                        orientation="vertical"
                      />
                      <Button
                        size="small"
                        color="error"
                        startIcon={<CancelRoundedIcon />}
                        onClick={() => {
                          onChange?.(undefined);
                          URL.revokeObjectURL(mappedFileData.localUrl);
                        }}
                      >
                        Xóa file
                      </Button>
                    </CardActions>
                  </Card>
                }
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  flexWrap="nowrap"
                  sx={{ textOverflow: 'ellipsis', maxWidth: maxWidthText }}
                >
                  <Typography
                    noWrap
                    fontSize={14}
                    sx={{
                      flex: '1 1 auto',
                      minWidth: 0,
                      textDecoration: 'underline',
                    }}
                  >
                    {mappedFileData.filename}
                  </Typography>
                  <Typography
                    noWrap
                    fontSize={14}
                    sx={{ flex: '0 0 auto', minWidth: 0 }}
                  >
                    .{mappedFileData.extension}
                  </Typography>
                </Stack>
              </LightTooltip>
            }
            onDelete={() => {
              onChange?.(undefined);
              !!mappedFileData?.localUrl &&
                URL.revokeObjectURL(mappedFileData.localUrl);
            }}
            avatar={<Avatar>{mappedFileData.extension}</Avatar>}
            deleteIcon={<CancelRoundedIcon color="inherit" />}
            color={error ? 'error' : 'default'}
            variant={error ? 'soft' : 'filled'}
          />
        </>
      ) : (
        <IconButton
          sx={{ fontSize: 26 }}
          className="btn-file"
          component="label"
          color={value?.length ? 'primary' : 'default'}
        >
          <TextSnippetTwoToneIcon fontSize="inherit" />
          <input
            type="file"
            hidden
            accept={accept}
            onChange={(e) => onChange?.(e.target.files || undefined)}
          />
        </IconButton>
      )}
    </Stack>
  );
};

export default forwardRef(MessageFileUpload);
