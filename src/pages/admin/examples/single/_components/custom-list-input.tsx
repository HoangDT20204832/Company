import { FormLabel, Stack } from '@mui/material';
import { useState } from 'react';

import { TBaseInputProps } from '@/base/base-form-input';

const CustomListInput = (props: TBaseInputProps<string[]>) => {
  const { label, onChange, disabled, readOnly } = props;

  const [values, setValues] = useState<string[]>(['', '', '']);

  return (
    <Stack>
      <FormLabel>{label}</FormLabel>
      <Stack direction="row" spacing={1}>
        {values.map((v, i) => (
          <input
            key={i}
            value={v}
            onChange={(e) => {
              const newValues = [...values];
              newValues[i] = e.target.value;
              setValues(newValues);
              onChange(newValues);
            }}
            disabled={disabled}
            readOnly={readOnly}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default CustomListInput;
