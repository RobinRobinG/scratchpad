import React from 'react';

const Button = ({ onClick, size, color, label }) => {
  return (
    <button
      type="submit"
      className={`button ${color} ${size}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
