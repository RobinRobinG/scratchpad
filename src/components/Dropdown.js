import React from 'react';
import { FormControl, Select, InputLabel } from '@material-ui/core';

const Dropdown = ({ value, onChange, label, options }) => {
  return (
    <FormControl fullWidth className="drop-down">
      <InputLabel htmlFor={label}>{label}</InputLabel>
      <Select native name={label} value={value} onChange={onChange}>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};

export default Dropdown;
