import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.secondary.light,
    padding: '1.5rem 2rem',
    marginTop: '0.5rem'
  }
}));

function Footer() {
  const classes = useStyles();
  const year = new Date().getFullYear();

  return (
    <div className={classes.root}>
      <Typography variant="body2" color="textPrimary" component="p">
        © {year}
      </Typography>
    </div>
  );
}

export default Footer;
