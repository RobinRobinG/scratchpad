import React from 'react';

const TextArea = ({ value, onChange, row, label }) => {
  return (
    <div className="input-control">
      <textarea
        className="textarea is-medium"
        row={row}
        value={value}
        onChange={onChange}
        placeholder={label}
      ></textarea>
    </div>
  );
};

export default TextArea;
