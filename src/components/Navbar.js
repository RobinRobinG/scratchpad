import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Logo from './Logo';
import { AppBar, Button, Toolbar } from '@material-ui/core';

function renderNewButton(pathname, history) {
  if (pathname !== '/') {
    return (
      <Button
        color="inherit"
        variant="outlined"
        size="small"
        onClick={() => history.push('/')}
      >
        Add New
      </Button>
    );
  }
}

function renderAllButton(pathname, history) {
  if (pathname !== '/notes') {
    return (
      <Button
        color="inherit"
        variant="outlined"
        size="small"
        className="view-all"
        onClick={() => history.push('/notes')}
      >
        View All
      </Button>
    );
  }
}

function Navbar() {
  const { pathname } = useLocation();
  const history = useHistory();

  return (
    <AppBar position="sticky" className="nav-bar">
      <Toolbar variant="dense">
        <Logo />
        {renderNewButton(pathname, history)}
        {renderAllButton(pathname, history)}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
