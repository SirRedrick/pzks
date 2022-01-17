import * as React from 'react';
import { isBoolean } from 'util/validation';

export function useToggle(initialValue) {
  isBoolean(initialValue);

  const [value, setValue] = React.useState(initialValue);
  const toggle = (newValue) => {
    if (newValue) {
      isBoolean(newValue);
      setValue(newValue);
    } else {
      setValue(prev => !prev);
    }
  };

  return [value, toggle];
}
