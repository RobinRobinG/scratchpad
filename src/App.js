import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { Box } from '@material-ui/core';
import Navbar from './components/Navbar';
import NewForm from './components/NewForm';
import Notes from './components/Notes';
import EditForm from './components/EditForm';
import Footer from './components/Footer';
import { Auth } from 'aws-amplify';
import Register from './components/auth/Register';
import LogIn from './components/auth/LogIn';
import ForgotPassword from './components/auth/ForgotPassword';
import ChangePasswordConfirmation from './components/auth/ChangePasswordConfirmation';
import Welcome from './components/auth/Welcome';
import NewBoardForm from './components/NewBoardForm';
import Boards from './components/Boards';
import Board from './components/Board';
import { makeStyles } from '@material-ui/core/styles';
import Background from './assets/background.svg';
import './App.css';

const useStyles = makeStyles({
  root: {
    flex: 1,
    background: `url(${Background})`,
    backgroundSize: '100% auto',
    backgroundPosition: 'center bottom',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'local',
    overflow: 'hidden'
  }
});

const App = () => {
  const classes = useStyles();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [user, setUser] = useState(null);
  const [boardId, setBoardId] = useState(null);

  const getCurrentUserSession = async () => {
    try {
      await Auth.currentSession();
      setIsAuthenticated(true);
      const currentUser = await Auth.currentAuthenticatedUser();
      setUser(currentUser);
    } catch (error) {
      console.log(error);
    }
    setIsAuthenticating(false);
  };

  useEffect(() => {
    getCurrentUserSession();
  }, []);

  const authProps = {
    isAuthenticated,
    user,
    setIsAuthenticated,
    setUser,
    boardId,
    setBoardId
  };

  return (
    !isAuthenticating && (
      <Box
        display="flex"
        flexDirection="column"
        className={classes.root}
        style={{ minHeight: '100vh' }}
      >
        <Router>
          <Navbar auth={authProps} />
          <Switch>
            <Route
              exact
              path="/notes"
              render={props => <Notes {...props} auth={authProps} />}
            />
            <Route
              path="/edit/:id"
              render={props => <EditForm {...props} auth={authProps} />}
            />
            <Route
              exact
              path="/"
              render={props => <NewForm {...props} auth={authProps} />}
            />
            <Route
              exact
              path="/register"
              render={props => <Register {...props} auth={authProps} />}
            />
            <Route
              exact
              path="/welcome"
              render={props => <Welcome {...props} auth={authProps} />}
            />
            <Route
              exact
              path="/forgotpassword"
              render={props => <ForgotPassword {...props} auth={authProps} />}
            />
            <Route
              exact
              path="/forgotpasswordverification"
              render={props => (
                <ChangePasswordConfirmation {...props} auth={authProps} />
              )}
            />
            <Route
              exact
              path="/login"
              render={props => <LogIn {...props} auth={authProps} />}
            />
            <Route
              exact
              path="/newboard"
              render={props => <NewBoardForm {...props} auth={authProps} />}
            />
            <Route
              exact
              path="/boards"
              render={props => <Boards {...props} auth={authProps} />}
            />
            <Route
              path="/board/:id"
              render={props => <Board {...props} auth={authProps} />}
            />
            <Redirect from="*" to="/" />
          </Switch>
          <Footer />
        </Router>
      </Box>
    )
  );
};

export default App;
