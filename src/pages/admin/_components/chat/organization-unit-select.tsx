import {
  Autocomplete,
  Avatar,
  Chip,
  Stack,
  TextField,
  TextFieldProps,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useId, useMemo } from 'react';

import {
  TOrganizationUnitUserItem,
  getOrganizationUnitIdByUserReq,
} from '../../../../services/organizations/organization.service';

type TOrganizationUnitSelectProps = {
  value?: number;
  onChange?: (v?: number) => void;
  getOrganizationUnits?: (items?: TOrganizationUnitUserItem[]) => void;
  hideBadge?: boolean;
} & Pick<
  TextFieldProps,
  | 'error'
  | 'helperText'
  | 'fullWidth'
  | 'placeholder'
  | 'size'
  | 'sx'
  | 'label'
  | 'required'
>;

const OrganizationUnitSelect = ({
  value,
  onChange,
  getOrganizationUnits,
  hideBadge,
  placeholder,
  size,
  sx,
  ...props
}: TOrganizationUnitSelectProps) => {
  const uid = useId();
  const { data: getOrganizationUnitsRes, isFetching } = useQuery({
    queryKey: ['GetOrganizationUnits'],
    queryFn: () => getOrganizationUnitIdByUserReq(),
    onSuccess: (data) => {
      const mappedList = data?.items.filter((o) => o.types?.includes(3)) || [];
      getOrganizationUnits?.(mappedList);
    },
  });
  const organizationUnits =
    getOrganizationUnitsRes?.items.filter((o) => o.types?.includes(3)) || [];
  const selectedValue = useMemo(() => {
    return value
      ? getOrganizationUnitsRes?.items?.find(
          (o) => o.organizationUnitId === value,
        )
      : undefined;
  }, [getOrganizationUnitsRes, value]);

  return (
    <Autocomplete<TOrganizationUnitUserItem>
      key={uid + isFetching + value}
      fullWidth
      loading={isFetching}
      size={size}
      value={selectedValue}
      isOptionEqualToValue={(o, value) =>
        o?.organizationUnitId === value?.organizationUnitId
      }
      clearIcon={null}
      onChange={(_e, o) => onChange?.(o?.organizationUnitId)}
      getOptionLabel={(o) => o.displayName}
      options={organizationUnits}
      renderOption={(props, option) => (
        <Stack
          key={JSON.stringify(option)}
          component="li"
          direction="row"
          justifyContent="space-between"
          spacing={1}
          {...props}
        >
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            flex="1 1 auto"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            <Avatar src={option.imageUrl} sx={{ width: 32, height: 32 }}>
              {option.displayName[0]}
            </Avatar>
            <Typography noWrap>{option.displayName}</Typography>
          </Stack>
          {!!hideBadge || <Chip variant="soft" label={0} size="small" />}
        </Stack>
      )}
      sx={sx}
      renderInput={(params) => (
        <TextField {...params} placeholder={placeholder} {...props} />
      )}
    />
  );
};

export default OrganizationUnitSelect;
