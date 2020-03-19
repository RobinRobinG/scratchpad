import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Button, Link, Typography } from '@material-ui/core';
import Content from '../Content';
import Input from '../Input';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Validate from '../utility/FormValidation';
import { Auth } from 'aws-amplify';

const ChangePassword = ({ auth }) => {
  let history = useHistory();

  const initialState = {
    oldpassword: '',
    newpassword: '',
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

    const error = Validate(formValues);
    if (error) {
      return setErrors({ ...errors, ...error });
    }

    const { oldpassword, newpassword, confirmpassword } = formValues;
    try {
      const user = await Auth.currentAuthenticatedUser();
      await Auth.changePassword(user, oldpassword, newpassword);
      return history.push('/changepasswordconfirmation');
    } catch (error) {
      let err = null;
      !error.message ? (err = { message: error }) : (err = error);
      return setErrors({ ...errors, cognito: err });
    }
  };

  const oldPasswordOnChange = event => {
    setErrors(initialErrors);
    setFormValues({ ...formValues, oldpassword: event.target.value });
  };
  const newPasswordOnChange = event => {
    setErrors(initialErrors);
    setFormValues({ ...formValues, newpassword: event.target.value });
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
            Change Password
          </Typography>
          <Box style={{ height: '2rem' }}>
            {errors && errors.blankfield && (
              <Typography variant="body1" color="error">
                {errors.blankfield.charAt(0).toUpperCase() +
                  errors.blankfield.slice(1)}
                cannot be blank.
              </Typography>
            )}
            {errors && errors.cognito && (
              <Typography variant="body1" color="error">
                {errors.cognito.message}
              </Typography>
            )}
          </Box>
          <Input
            label="Old Password"
            type="password"
            id="oldpassword"
            value={formValues.oldpassword}
            onChange={oldPasswordOnChange}
          />
          <Input
            label="New Password"
            type="password"
            value={formValues.newpassword}
            onChange={newPasswordOnChange}
          />
          <Input
            label="Confirm Password"
            type="password"
            value={formValues.confirmpassword}
            onChange={confirmPasswordOnChange}
          />
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
              Change Password
            </Button>
          </Box>
        </Box>
      </form>
    </Content>
  );
};

export default ChangePassword;
