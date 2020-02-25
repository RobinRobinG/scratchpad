import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Button, Typography } from '@material-ui/core';
import Content from '../Content';
import Input from '../Input';
import Validate from '../utility/FormValidation';
import { Auth } from 'aws-amplify';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const ForgotPassword = ({ auth }) => {
  let history = useHistory();

  const initialState = {
    email: ''
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

    const { email } = formValues;

    try {
      await Auth.forgotPassword(email);
      history.push('/forgotpasswordverification');
    } catch (error) {
      let err = null;
      !error.message ? (err = { message: error }) : (err = error);

      setErrors({ ...errors, cognito: err });
    }
  };

  const emailOnChange = event => {
    setFormValues({ ...formValues, email: event.target.value });
  };

  return (
    <Content>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" alignItems="flex-start">
          <Typography variant="h5" gutterBottom>
            Forgot your password?
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            Please enter the email address associated with your account and
            we'll email you a password reset link.
          </Typography>
          <Input
            label="Email"
            type="email"
            id="email"
            value={formValues.email}
            onChange={emailOnChange}
          />
          <Box alignSelf="flex-end">
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
        </Box>
      </form>
    </Content>
  );
};

export default ForgotPassword;
