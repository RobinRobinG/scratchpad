import React from 'react';
import { FormControl, InputLabel, Input } from '@material-ui/core';

const InputField = ({ value, onChange, label, type }) => {
  return (
    <FormControl fullWidth margin="normal">
      <InputLabel htmlFor={label}>{label}</InputLabel>
      <Input id={label} type={type} value={value} onChange={onChange} />
    </FormControl>
  );
};

export default InputField;
