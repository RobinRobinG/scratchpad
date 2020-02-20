import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Container } from '@material-ui/core';
import axios from 'axios';
import uuidv4 from 'uuid/v4';
import Input from './Input';
import TextArea from './TextArea';
import Tags from './Tags';
import SaveIcon from '@material-ui/icons/Save';
const config = require('../config.json');

const NewForm = () => {
  let history = useHistory();
  const today = new Date();
  const created = today.getTime();

  const initialState = {
    title: '',
    body: '',
    id: uuidv4(),
    created,
    label: []
  };
  const [newEntry, setNewEntry] = useState(initialState);

  const handleAddNoteOnSubmit = async (id, event) => {
    event.preventDefault();
    try {
      const params = {
        id,
        title: newEntry.title,
        body: newEntry.body,
        created: newEntry.created,
        label: newEntry.label
      };
      await axios.post(`${config.api.invokeUrl}/products/${id}`, params);
      setNewEntry(initialState);
      history.push('/notes');
    } catch (error) {
      console.log(`An error has occurred: ${error}`);
    }
  };

  const onAddNoteTitleChange = event =>
    setNewEntry({ ...newEntry, title: event.target.value });

  const onSelectNoteLabelChange = event => {
    setNewEntry({ ...newEntry, label: event.target.value });
  };

  const onAddNoteBodyChange = event =>
    setNewEntry({ ...newEntry, body: event.target.value });

  const labelOptions = ['Work', 'Personal'];

  return (
    <Container maxWidth="sm" className="content">
      <form
        onSubmit={event => handleAddNoteOnSubmit(newEntry.id, event)}
        className="new-form"
      >
        <Input
          label="Title"
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
      </form>
    </Container>
  );
};

export default NewForm;
