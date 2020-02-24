import React from 'react';
import { FormControl, TextareaAutosize } from '@material-ui/core';

const TextAreaField = ({ value, onChange, row, label }) => {
  return (
    <FormControl fullWidth margin="normal">
      <TextareaAutosize
        rowsMin={row}
        value={value}
        onChange={onChange}
        aria-label={label}
        placeholder={label}
        style={{ resize: 'vertical' }}
      />
    </FormControl>
  );
};

export default TextAreaField;
