import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Button, Link, Typography } from '@material-ui/core';
import Content from '../Content';
import Input from '../Input';
import Validate from '../utility/FormValidation';
import { Auth } from 'aws-amplify';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const Register = () => {
  let history = useHistory();

  const initialState = {
    username: '',
    email: '',
    password: '',
    confirmpassword: ''
  };

  const initialErrors = {
    cognito: null,
    blankfield: false,
    passwordmatch: false
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

    const { username, email, password } = formValues;
    try {
      const signUpResponse = await Auth.signUp({
        username,
        password,
        attributes: {
          email
        }
      });
      console.log({ signUpResponse });
      history.push('/welcome');
    } catch (error) {
      let err = null;
      !error.message ? (err = { message: error }) : (err = error);

      setErrors({ ...errors, cognito: err });
    }
  };

  const usernameOnChange = event =>
    setFormValues({ ...formValues, username: event.target.value });

  const emailOnChange = event =>
    setFormValues({ ...formValues, email: event.target.value });

  const passwordOnChange = event =>
    setFormValues({ ...formValues, password: event.target.value });

  const confirmPasswordOnChange = event =>
    setFormValues({ ...formValues, confirmpassword: event.target.value });

  return (
    <Content>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" alignItems="flex-start">
          <Typography variant="h5" gutterBottom>
            Create an account
          </Typography>
          <Input
            label="Username"
            type="text"
            value={formValues.username}
            onChange={usernameOnChange}
          />
          <Input
            label="Email"
            type="email"
            value={formValues.email}
            onChange={emailOnChange}
          />
          <Input
            label="Password"
            type="password"
            value={formValues.password}
            onChange={passwordOnChange}
          />
          <Input
            label="Confirm Password"
            type="password"
            value={formValues.confirmpassword}
            onChange={confirmPasswordOnChange}
          />
          <Typography gutterBottom>
            <Link href="/">Already have an account?</Link>
          </Typography>
          <Box alignSelf="flex-end">
            <Button
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              startIcon={<AccountCircleIcon />}
            >
              Register
            </Button>
          </Box>
        </Box>
      </form>
    </Content>
  );
};

export default Register;
