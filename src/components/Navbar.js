import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useLocation, useHistory } from 'react-router-dom';
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import { Auth } from 'aws-amplify';

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  }
}));

function renderRegisterButton(pathname, history) {
  if (pathname !== '/register') {
    return (
      <Button
        color="primary"
        size="small"
        onClick={() => history.push('/register')}
      >
        Register
      </Button>
    );
  }
}

function renderLoginButton(pathname, history) {
  if (pathname !== '/') {
    return (
      <Button color="primary" size="small" onClick={() => history.push('/')}>
        Login
      </Button>
    );
  }
}

function renderNewButton(pathname, history) {
  if (pathname !== '/new') {
    return (
      <Button color="primary" size="small" onClick={() => history.push('/new')}>
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
        onClick={() => history.push('/notes')}
      >
        View all
      </Button>
    );
  }
}

async function handleLogOut({ event, setIsAuthenticated, setUser, history }) {
  event.preventDefault();
  try {
    await Auth.signOut();
    setIsAuthenticated(false);
    setUser(null);
    history.push('/');
    console.log({ history });
  } catch (error) {
    console.log(error.message);
  }
}

function renderLogOutButton({ history, setIsAuthenticated, setUser }) {
  return (
    <Button
      color="default"
      size="small"
      onClick={event =>
        handleLogOut({ event, setIsAuthenticated, setUser, history })
      }
    >
      Log out
    </Button>
  );
}

function Navbar({ auth }) {
  const classes = useStyles();
  const { pathname } = useLocation();
  const history = useHistory();

  const { isAuthenticated, user, setIsAuthenticated, setUser } = auth;

  return (
    <div className={classes.grow}>
      <AppBar position="sticky" color="default">
        <Toolbar variant="dense">
          <Typography variant="h6" color="primary" className={classes.grow}>
            🗒 Notes
          </Typography>
          {!isAuthenticated && renderLoginButton(pathname, history)}
          {!isAuthenticated && renderRegisterButton(pathname, history)}
          {isAuthenticated && user && renderNewButton(pathname, history)}
          {isAuthenticated && user && renderAllButton(pathname, history)}
          {isAuthenticated &&
            user &&
            renderLogOutButton({ history, setIsAuthenticated, setUser })}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
