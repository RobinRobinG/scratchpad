import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Button, Link, Typography } from '@material-ui/core';
import Content from '../Content';
import Input from '../Input';
import Validate from '../utility/FormValidation';
import { Auth } from 'aws-amplify';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const LogIn = ({ auth }) => {
  let history = useHistory();

  const initialState = {
    username: '',
    password: ''
  };

  const initialErrors = {
    cognito: null,
    blankfield: false
  };

  const [formValues, setFormValues] = useState(initialState);
  const [errors, setErrors] = useState(initialErrors);

  const handleSubmit = async event => {
    event.preventDefault();

    setErrors(initialErrors);
    const error = Validate(event, formValues);
    if (error) {
      setErrors({ ...errors, ...error });
    }

    const { username, password } = formValues;
    const { setIsAuthenticated, setUser } = auth;
    try {
      const signedInUser = await Auth.signIn(username, password);
      setIsAuthenticated(true);
      setUser(signedInUser);
      history.push('/');
    } catch (error) {
      let err = null;
      !error.message ? (err = { message: error }) : (err = error);

      setErrors({ ...errors, cognito: err });
    }
  };

  const usernameOnChange = event => {
    setFormValues({ ...formValues, username: event.target.value });
  };

  const passwordOnChange = event =>
    setFormValues({ ...formValues, password: event.target.value });

  return (
    <Content>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" alignItems="flex-start">
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>
          <Input
            label="Username or Email"
            type="text"
            id="username"
            value={formValues.username}
            onChange={usernameOnChange}
          />
          <Input
            label="Password"
            type="password"
            value={formValues.password}
            onChange={passwordOnChange}
          />
          <Typography gutterBottom>
            <Link href="/register">Don't have an account?</Link>
          </Typography>
          <Typography gutterBottom>
            <Link href="/forgotpassword">Forgot password?</Link>
          </Typography>
          <Box alignSelf="flex-end">
            <Button
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              startIcon={<AccountCircleIcon />}
            >
              Log In
            </Button>
          </Box>
        </Box>
      </form>
    </Content>
  );
};

export default LogIn;
