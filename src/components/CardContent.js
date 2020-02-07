import React from 'react';

const CardContent = ({ children }) => {
  return (
    <div className="card is-shady">
      <div className="card-content">{children}</div>
    </div>
  );
};

export default CardContent;
