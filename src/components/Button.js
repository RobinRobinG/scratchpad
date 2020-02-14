import React from 'react';
import { Button } from '@material-ui/core';

const FormButton = ({ onClick, size, color, label }) => {
  return (
    <Button
      variant="contained"
      color={color}
      size={size}
      type="submit"
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

export default FormButton;
