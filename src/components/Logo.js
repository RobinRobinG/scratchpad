import React from 'react';
import Typography from '@material-ui/core/Typography';

const Logo = () => {
  return (
    <div className="logo">
      <Typography variant="h6" color="inherit">
        <span role="img" aria-label="notepad">
          🗒
        </span>
        Notes
      </Typography>
    </div>
  );
};

export default Logo;
