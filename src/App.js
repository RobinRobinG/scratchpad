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
import './App.css';
import Register from './components/auth/Register';
import LogIn from './components/auth/LogIn';
import ForgotPassword from './components/auth/ForgotPassword';
import ChangePasswordConfirmation from './components/auth/ChangePasswordConfirmation';
import Welcome from './components/auth/Welcome';
import NewBoardForm from './components/NewBoardForm';
import Boards from './components/Boards';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [user, setUser] = useState(null);

  const getCurrentUserSession = async () => {
    try {
      const session = await Auth.currentSession();
      console.log({ session });
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
    setUser
  };

  return (
    !isAuthenticating && (
      <Box display="flex" flexDirection="column" style={{ minHeight: '100vh' }}>
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
            <Redirect from="*" to="/" />
          </Switch>
          <Footer />
        </Router>
      </Box>
    )
  );
};

export default App;
