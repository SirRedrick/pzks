import * as React from 'react';
import { Stack, Button, TextField } from '@mui/material';


export function Form({ onSubmit }) {
  const [value, setValue] = React.useState('');

  return (
    <Stack py={5} gap={3} alignItems="flex-start">
      <TextField fullWidth label="Expression" value={value} onChange={(e) => setValue(e.target.value)} />
      <Button type="submit" variant="contained" onClick={() => onSubmit(value)}>Submit</Button>
    </Stack>
  );
}