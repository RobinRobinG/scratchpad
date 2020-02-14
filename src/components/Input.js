import React from 'react';
import { FormControl, InputLabel, Input } from '@material-ui/core';

const InputField = ({ value, onChange, label }) => {
  return (
    <FormControl fullWidth margin="normal">
      <InputLabel htmlFor={label}>{label}</InputLabel>
      <Input id={label} type="text" value={value} onChange={onChange} />
    </FormControl>
  );
};

export default InputField;
