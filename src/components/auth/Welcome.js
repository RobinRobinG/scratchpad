import React from 'react';
import { Box, Typography } from '@material-ui/core';
import Content from '../Content';

const Welcome = () => {
  return (
    <Content>
      <Box display="flex" flexDirection="column" alignItems="flex-start">
        <Typography variant="h5" gutterBottom>
          Welcome!
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          You have successfully registered a new account. We've sent you a
          email. Please click on the confirmation link to verify your account.
        </Typography>
      </Box>
    </Content>
  );
};

export default Welcome;
