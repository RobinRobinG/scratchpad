import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { useLocation, useHistory } from 'react-router-dom';
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  }
}));

function renderNewButton(pathname, history) {
  if (pathname !== '/') {
    return (
      <Button color="primary" size="small" onClick={() => history.push('/')}>
        Add new
      </Button>
    );
  }
}

function renderAllButton(pathname, history) {
  if (pathname !== '/notes') {
    return (
      <Button
        color="primary"
        size="small"
        className="view-all"
        onClick={() => history.push('/notes')}
      >
        View all
      </Button>
    );
  }
}

function Navbar() {
  const classes = useStyles();
  const { pathname } = useLocation();
  const history = useHistory();

  return (
    <div className={classes.grow}>
      <AppBar position="sticky" color="default">
        <Toolbar variant="dense">
          <Typography variant="h6" color="primary" className={classes.grow}>
            <Typography variant="span" role="img" aria-label="notepad">
              🗒
            </Typography>
            Notes
          </Typography>
          {renderNewButton(pathname, history)}
          {renderAllButton(pathname, history)}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
