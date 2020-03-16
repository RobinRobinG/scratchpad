import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
// import Background from '../assets/background.svg';

const useStyles = makeStyles({
  root: {
    flex: 1
  }
});

const Content = props => {
  const classes = useStyles(props);

  return (
    <Container maxWidth="sm" className={classes.root}>
      {props.children}
    </Container>
  );
};

export default Content;
