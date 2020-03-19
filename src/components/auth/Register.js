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
    blankfield: '',
    passwordmatch: false
  };

  const [formValues, setFormValues] = useState(initialState);
  const [errors, setErrors] = useState(initialErrors);

  const handleSubmit = async event => {
    event.preventDefault();
    setErrors(initialErrors);

    const error = Validate(formValues);
    if (error) {
      return setErrors({ ...errors, ...error });
    }

    const { username, email, password } = formValues;
    try {
      await Auth.signUp({
        username,
        password,
        attributes: {
          email
        }
      });

      return history.push('/welcome');
    } catch (error) {
      let err = null;
      !error.message ? (err = { message: error }) : (err = error);

      return setErrors({ ...errors, cognito: err });
    }
  };

  const usernameOnChange = event => {
    setErrors(initialErrors);
    setFormValues({ ...formValues, username: event.target.value });
  };

  const emailOnChange = event => {
    setErrors(initialErrors);
    setFormValues({ ...formValues, email: event.target.value });
  };

  const passwordOnChange = event => {
    setErrors(initialErrors);
    setFormValues({ ...formValues, password: event.target.value });
  };

  const confirmPasswordOnChange = event => {
    setErrors(initialErrors);
    setFormValues({ ...formValues, confirmpassword: event.target.value });
  };

  return (
    <Content>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" alignItems="flex-start">
          <Typography variant="h5" gutterBottom>
            Create an account
          </Typography>
          <Box style={{ height: '2rem' }}>
            {errors && errors.blankfield && (
              <Typography variant="body1" color="error">
                {errors.blankfield.charAt(0).toUpperCase() +
                  errors.blankfield.slice(1) +
                  ' '}
                field cannot be blank.
              </Typography>
            )}
            {errors && errors.cognito && (
              <Typography variant="body1" color="error">
                {errors.cognito.message}
              </Typography>
            )}
            {errors && errors.passwordmatch === true && (
              <Typography variant="body1" color="error">
                The new password and the confirm password do not match.
              </Typography>
            )}
          </Box>
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
            <Link href="/login">Already have an account?</Link>
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
