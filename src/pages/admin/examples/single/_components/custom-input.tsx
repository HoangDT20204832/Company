import { FormLabel, Stack } from '@mui/material';

import { TBaseInputProps } from '@/base/base-form-input';

const CustomInput = (props: TBaseInputProps<string>) => {
  const { label, value, onChange, disabled, readOnly } = props;

  return (
    <Stack>
      <FormLabel>{label}</FormLabel>
      <input
        style={{ maxWidth: 400 }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        readOnly={readOnly}
      />
    </Stack>
  );
};

export default CustomInput;
