import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Button, Typography } from '@material-ui/core';
import Validate from './utility/FormValidation';
import axios from 'axios';
import uuidv4 from 'uuid/v4';
import Content from './Content';
import Input from './Input';
import TextArea from './TextArea';
import Tags from './Tags';
import SaveIcon from '@material-ui/icons/Save';
const config = require('../config.json');

const NewForm = ({ auth }) => {
  let history = useHistory();
  const today = new Date();
  const created = today.getTime();
  const { user, boardId } = auth;

  const initialState = {
    id: uuidv4(),
    title: '',
    body: '',
    label: [],
    boardid: null
  };

  const initialErrors = {
    blankfield: ''
  };

  const [newEntry, setNewEntry] = useState(initialState);
  const [errors, setErrors] = useState(initialErrors);

  const handleAddNoteOnSubmit = async (id, event) => {
    event.preventDefault();
    setErrors(initialErrors);
    const error = Validate(newEntry);
    if (error) {
      return setErrors({ ...errors, ...error });
    }

    const username = user ? user.username : null;

    try {
      const params = {
        id,
        title: newEntry.title,
        body: newEntry.body,
        label: newEntry.label,
        boardid: boardId,
        created,
        username
      };
      await axios.post(`${config.api.notes.invokeUrl}/products/${id}`, params);
      setNewEntry(initialState);
      return boardId
        ? history.push(`/board/${boardId}`)
        : history.push('/notes');
    } catch (error) {
      console.log(`An error has occurred: ${error}`);
    }
  };

  const onAddNoteTitleChange = event => {
    setErrors(initialErrors);
    setNewEntry({ ...newEntry, title: event.target.value });
  };

  const onSelectNoteLabelChange = event => {
    setErrors(initialErrors);
    setNewEntry({ ...newEntry, label: event.target.value });
  };

  const onAddNoteBodyChange = event => {
    setErrors(initialErrors);
    setNewEntry({ ...newEntry, body: event.target.value });
  };

  const labelOptions = ['Work', 'Personal'];

  return (
    <Content>
      <form onSubmit={event => handleAddNoteOnSubmit(newEntry.id, event)}>
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
            onChange={onAddNoteTitleChange}
          />
          <Tags
            label="Label"
            value={newEntry.label}
            onChange={onSelectNoteLabelChange}
            options={labelOptions}
          />
          <TextArea
            row="15"
            label="Note"
            value={newEntry.body}
            onChange={onAddNoteBodyChange}
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

export default NewForm;
