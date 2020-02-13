import React, { useState } from 'react';
import { Container } from '@material-ui/core';
import axios from 'axios';
import uuidv4 from 'uuid/v4';
import Input from './Input';
import TextArea from './TextArea';
import RadioButtons from './RadioButtons';
const config = require('../config.json');

const NewForm = () => {
  const initialState = {
    notetitle: '',
    notebody: '',
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
        notetitle: newEntry.notetitle,
        notebody: newEntry.notebody,
        created: newEntry.created,
        color: newEntry.color
      };
      await axios.post(`${config.api.invokeUrl}/products/${id}`, params);
      // setNotes([...notes, newEntry]);
      setNewEntry(initialState);
    } catch (error) {
      console.log(`An error has occurred: ${error}`);
    }
  };

  const onAddNoteTitleChange = event =>
    setNewEntry({ ...newEntry, notetitle: event.target.value });

  const onSelectNoteColorChange = event =>
    setNewEntry({ ...newEntry, color: event.target.value });

  const onAddNoteBodyChange = event =>
    setNewEntry({ ...newEntry, notebody: event.target.value });

  const colorOptions = ['green', 'purple', 'pink', 'orange'];

  return (
    <Container maxWidth="sm">
      <form onSubmit={event => handleAddNoteOnSubmit(newEntry.id, event)}>
        <Input
          label="Title"
          value={newEntry.notetitle}
          onChange={onAddNoteTitleChange}
        />
        <RadioButtons
          label="color"
          value={newEntry.color}
          onChange={onSelectNoteColorChange}
          options={colorOptions} 
        />
        <TextArea
          row="10"
          label="Note"
          value={newEntry.notebody}
          onChange={onAddNoteBodyChange}
        />
        <button type="submit" className="button is-success is-medium">
          Save
        </button>
      </form>
    </Container>
  );
};

export default NewForm;
