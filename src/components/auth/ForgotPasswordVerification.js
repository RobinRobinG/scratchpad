import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Button, Typography } from '@material-ui/core';
import Content from '../Content';
import Input from '../Input';
import Validate from '../utility/FormValidation';
import { Auth } from 'aws-amplify';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const LogIn = ({ auth }) => {
  let history = useHistory();

  const initialState = {
    verificationcode: '',
    email: '',
    newpassword: ''
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

    const { email, verificationcode, newpassword } = formValues;
    const { setIsAuthenticated, setUser } = auth;
    try {
      const signedInUser = await Auth.forgotPasswordSubmit(
        email,
        verificationcode,
        newpassword
      );
      setIsAuthenticated(true);
      setUser(signedInUser);
      history.push('/changepasswordconfirmation');
    } catch (error) {
      let err = null;
      !error.message ? (err = { message: error }) : (err = error);

      setErrors({ ...errors, cognito: err });
    }
  };

  const verificationCodeOnChange = event => {
    setFormValues({ ...formValues, verificationcode: event.target.value });
  };

  const emailOnChange = event =>
    setFormValues({ ...formValues, email: event.target.value });

  const newPasswordOnChange = event =>
    setFormValues({ ...formValues, newpassword: event.target.value });

  return (
    <Content>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" alignItems="flex-start">
          <Typography variant="h5" gutterBottom>
            Set new password
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            Please enter the verification code sent to your email address below,
            your email address and a new password.
          </Typography>
          <Input
            label="Verification Code"
            type="text"
            id="verificationcode"
            value={formValues.verificationcode}
            onChange={verificationCodeOnChange}
          />
          <Input
            label="Email"
            type="email"
            id="email"
            value={formValues.email}
            onChange={emailOnChange}
          />
          <Input
            label="New Password"
            type="password"
            id="newpassword"
            value={formValues.newpassword}
            onChange={newPasswordOnChange}
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            startIcon={<AccountCircleIcon />}
          >
            Submit
          </Button>
        </Box>
      </form>
    </Content>
  );
};

export default LogIn;
