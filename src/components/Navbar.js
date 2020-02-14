import React from 'react';
import Logo from './Logo';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

function Navbar() {
  return (
    <AppBar position="sticky" className="nav-bar">
      <Toolbar variant="dense">
        <Logo />
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
