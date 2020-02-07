import React from 'react';

const Input = ({ value, onChange, label }) => {
  return (
    <div className="input-control">
      <input
        className="input is-medium"
        type="text"
        placeholder={label}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
