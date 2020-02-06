import React from 'react';

const CardContent = ({ title, body }) => {
  return (
    <div className="card-content">
      <div className="content">
        <h4>{title}</h4>
        <p>{body}</p>
      </div>
    </div>
  );
};

export default CardContent;
