import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Button, Typography } from '@material-ui/core';
import Content from '../Content';
import Input from '../Input';
import Validate from '../utility/FormValidation';
import { Auth } from 'aws-amplify';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const ForgotPassword = ({ auth }) => {
  console.log('forget?');
  let history = useHistory();

  const initialState = {
    email: ''
  };

  const initialErrors = {
    cognito: null,
    blankfield: ''
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

    const { email } = formValues;
    try {
      await Auth.forgotPassword(email);
      return history.push('/forgotpasswordverification');
    } catch (error) {
      let err = null;
      !error.message ? (err = { message: error }) : (err = error);
      return setErrors({ ...errors, cognito: err });
    }
  };

  const emailOnChange = event => {
    setErrors(initialErrors);
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
          <Box style={{ height: '2rem' }}>
            {errors && errors.blankfield && (
              <Typography variant="body1" color="error">
                {errors.blankfield} can not be blank.
              </Typography>
            )}
            {errors && errors.cognito && (
              <Typography variant="body1" color="error">
                {errors.cognito.message}
              </Typography>
            )}
          </Box>
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
