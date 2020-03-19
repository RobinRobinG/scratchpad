import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Button, Typography } from '@material-ui/core';
import Validate from './utility/FormValidation';
import axios from 'axios';
import uuidv4 from 'uuid/v4';
import Content from './Content';
import Input from './Input';
import SaveIcon from '@material-ui/icons/Save';
const config = require('../config.json');

const NewBoardForm = ({ auth }) => {
  let history = useHistory();
  const today = new Date();
  const timestamp = today.getTime();
  const { user } = auth;

  const initialState = {
    id: uuidv4(),
    timestamp: '',
    creator: '',
    title: ''
  };

  const initialErrors = {
    blankfield: ''
  };

  const [newEntry, setNewEntry] = useState(initialState);
  const [errors, setErrors] = useState(initialErrors);

  const handleAddBoardOnSubmit = async (id, event) => {
    event.preventDefault();
    setErrors(initialErrors);
    const error = Validate(newEntry);
    if (error) {
      return setErrors({ ...errors, ...error });
    }

    const creator = user ? user.username : null;

    try {
      const params = {
        id,
        timestamp,
        creator,
        title: newEntry.title
      };
      await axios.post(`${config.api.board.invokeUrl}/board`, params);
      setNewEntry(initialState);
      return history.push(`/board/${id}`);
    } catch (error) {
      console.log(`An error has occurred: ${error}`);
    }
  };

  const onAddBoardTitleChange = event => {
    setErrors(initialErrors);
    setNewEntry({ ...newEntry, title: event.target.value });
  };

  return (
    <Content>
      <form onSubmit={event => handleAddBoardOnSubmit(newEntry.id, event)}>
        <Box style={{ height: '2rem' }}>
          {errors && errors.blankfield && (
            <Typography variant="body1" color="error">
              {errors.blankfield.charAt(0).toUpperCase() +
                errors.blankfield.slice(1) +
                ' '}
              field cannot be blank.
            </Typography>
          )}
        </Box>
        <Box display="flex" flexDirection="column" alignItems="flex-end">
          <Input
            label="Title"
            type="text"
            value={newEntry.title}
            onChange={onAddBoardTitleChange}
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            startIcon={<SaveIcon />}
          >
            Save
          </Button>
        </Box>
      </form>
    </Content>
  );
};

export default NewBoardForm;
