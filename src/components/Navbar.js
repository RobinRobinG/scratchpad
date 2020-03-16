import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useLocation, useHistory } from 'react-router-dom';
import {
  Menu,
  MenuItem,
  AppBar,
  Button,
  Toolbar,
  Typography,
  IconButton
} from '@material-ui/core';
import { Auth } from 'aws-amplify';
import AccountCircle from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  }
}));

function renderNewNoteButton(pathname, history, setBoardId) {
  if (pathname !== '/') {
    return (
      <Button
        color="primary"
        size="small"
        onClick={() => {
          setBoardId(null);
          history.push('/');
        }}
      >
        New note
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
        onClick={() => history.push('/notes')}
      >
        Notes
      </Button>
    );
  }
}

function Navbar({ auth }) {
  const classes = useStyles();
  const { pathname } = useLocation();
  const history = useHistory();
  const { isAuthenticated, setIsAuthenticated, setUser, setBoardId } = auth;
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogInOnClick = event => {
    history.push('/login');
    setAnchorEl(null);
  };

  const handleRegisterOnClick = event => {
    history.push('/register');
    setAnchorEl(null);
  };

  const handleBoardsOnClick = event => {
    setBoardId(null);
    history.push('/boards');
    setAnchorEl(null);
  };

  const handleLogOutOnClick = async event => {
    event.preventDefault();
    try {
      await Auth.signOut();
      setIsAuthenticated(false);
      history.push('/');
      setUser(null);
    } catch (error) {
      console.log(error.message);
    }
    setAnchorEl(null);
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id="user login and register"
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {!isAuthenticated && pathname !== '/login' && (
        <MenuItem onClick={handleLogInOnClick}>Login</MenuItem>
      )}
      {!isAuthenticated && pathname !== '/register' && (
        <MenuItem onClick={handleRegisterOnClick}>Register</MenuItem>
      )}
      {isAuthenticated && pathname !== '/boards' && (
        <MenuItem onClick={handleBoardsOnClick}>Boards</MenuItem>
      )}
      {isAuthenticated && (
        <MenuItem onClick={handleLogOutOnClick}>Logout</MenuItem>
      )}
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="sticky" color="default">
        <Toolbar variant="dense">
          <Typography variant="h6" color="primary" className={classes.grow}>
            <span role="img" aria-label="note-book">
              🗒
            </span>{' '}
            Scratchpad
          </Typography>
          {renderNewNoteButton(pathname, history, setBoardId)}
          {renderAllButton(pathname, history)}
          <IconButton
            edge="end"
            aria-label="user login and register"
            aria-controls="user login and register"
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="primary"
          >
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
}

export default Navbar;
