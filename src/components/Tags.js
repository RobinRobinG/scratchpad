import React from 'react';
import {
  Input,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Chip
} from '@material-ui/core';

function Tags({ value, onChange, label, options }) {
  return (
    <FormControl fullWidth className="tags">
      <InputLabel htmlFor={label}>{label}</InputLabel>
      <Select
        multiple
        value={value}
        onChange={onChange}
        input={<Input id="select-input" />}
        renderValue={selected => (
          <div className="chips">
            {selected.map(value => (
              <Chip key={value} label={value} size="small" className="chip" />
            ))}
          </div>
        )}
      >
        {options.map(option => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default Tags;
