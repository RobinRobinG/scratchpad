import React from 'react';
import {
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel
} from '@material-ui/core';

const RadioButtonsField = ({ value, onChange, label, options }) => {
  return (
    <FormControl
      component="RadioButtonsField"
      fullWidth
      className="radio-buttons"
    >
      <RadioGroup
        aria-label={label}
        name={label}
        value={value}
        onChange={onChange}
        row
      >
        {options.map(option => (
          <FormControlLabel
            value={option}
            control={<Radio className={option} />}
            label={option}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioButtonsField;
