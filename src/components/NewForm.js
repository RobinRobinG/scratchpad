import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import axios from 'axios';
import uuidv4 from 'uuid/v4';
import Input from './Input';
import TextArea from './TextArea';
import Dropdown from './Dropdown';
const config = require('../config.json');

const NewForm = () => {
  let history = useHistory();

  const initialState = {
    title: '',
    body: '',
    id: uuidv4(),
    created: new Date().toString(),
    color: 'green'
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
        color: newEntry.color
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

  const onSelectNoteColorChange = event =>
    setNewEntry({ ...newEntry, color: event.target.value });

  const onAddNoteBodyChange = event =>
    setNewEntry({ ...newEntry, body: event.target.value });

  const colorOptions = ['green', 'purple'];

  return (
    <form
      onSubmit={event => handleAddNoteOnSubmit(newEntry.id, event)}
      className="new-form"
    >
      <Input
        label="Title"
        value={newEntry.title}
        onChange={onAddNoteTitleChange}
      />
      <Dropdown
        label="color"
        value={newEntry.color}
        onChange={onSelectNoteColorChange}
        options={colorOptions}
      />
      <TextArea
        row="10"
        label="Note"
        value={newEntry.body}
        onChange={onAddNoteBodyChange}
      />
      <Button variant="contained" color="primary" size="large" type="submit">
        Save
      </Button>
    </form>
  );
};

export default NewForm;
