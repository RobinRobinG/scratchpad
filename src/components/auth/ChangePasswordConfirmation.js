import React from 'react';
import { Box, Typography } from '@material-ui/core';
import Content from '../Content';

const ChangePasswordConfirmation = () => {
  return (
    <Content>
      <Box display="flex" flexDirection="column" alignItems="flex-start">
        <Typography variant="h5" gutterBottom>
          Change Password
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          Your password has been successfully updated!
        </Typography>
      </Box>
    </Content>
  );
};

export default ChangePasswordConfirmation;
