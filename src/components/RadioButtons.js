import React from 'react';
import {
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel
} from '@material-ui/core';

const RadioButtonsField = ({ value, onChange, label, options }) => {
  return (
    <FormControl fullWidth className="radio-buttons" margin="dense">
      <RadioGroup
        aria-label={label}
        name={label}
        value={value}
        onChange={onChange}
        row
      >
        {options.map((option, index) => (
          <FormControlLabel
            key={index}
            value={option}
            control={<Radio color="primary" />}
            label={option}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioButtonsField;
