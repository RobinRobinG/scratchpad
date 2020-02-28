import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    margin: '4rem auto .5rem'
  }
});

const PageHeader = ({ title, subTitle }) => {
  const classes = useStyles();

  return (
    <Container maxWidth="sm" className={classes.root}>
      <Typography variant="h2" color="primary">
        {title}
      </Typography>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        {subTitle}
      </Typography>
    </Container>
  );
};

export default PageHeader;
