import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { AppBar, Button, Toolbar } from '@material-ui/core';
import Logo from './Logo';

function renderNewButton(pathname, history) {
  if (pathname !== '/') {
    return (
      <Button color="inherit" onClick={() => history.push('/')}>
        Add new
      </Button>
    );
  }
}

function renderAllButton(pathname, history) {
  if (pathname !== '/notes') {
    return (
      <Button
        color="inherit"
        className="view-all"
        onClick={() => history.push('/notes')}
      >
        View all
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
