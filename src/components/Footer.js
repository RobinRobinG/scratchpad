import React from 'react';
import { Container, Typography } from '@material-ui/core';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <Container className="footer">
      <Typography variant="body2" color="textPrimary" component="p">
        © {year}
      </Typography>
    </Container>
  );
}

export default Footer;
