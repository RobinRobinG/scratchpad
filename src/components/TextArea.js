import React from 'react';
import { FormControl, TextareaAutosize } from '@material-ui/core';

const TextAreaField = ({ value, onChange, row, label }) => {
  return (
    <FormControl fullWidth className="textarea" margin="normal">
      <TextareaAutosize
        rowsMin={row}
        value={value}
        onChange={onChange}
        aria-label={label}
        placeholder={label}
      />
    </FormControl>
  );
};

export default TextAreaField;
