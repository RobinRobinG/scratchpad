import React, { useState } from 'react';
import axios from 'axios';
import uuidv4 from 'uuid/v4';
import Input from '../components/Input';
import TextArea from '../components/TextArea';
const config = require('../config.json');

const NewNote = () => {
  const [newEntry, setNewEntry] = useState({
    notetitle: '',
    notebody: '',
    id: uuidv4(),
    created: new Date().toString(),
    color: 'green'
  });

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
      setNewEntry({
        notetitle: '',
        notebody: '',
        id: uuidv4(),
        created: new Date().toString(),
        color: 'green'
      });
    } catch (error) {
      console.log(`An error has occurred: ${error}`);
    }
  };

  const onAddNoteTitleChange = event =>
    setNewEntry({ ...newEntry, notetitle: event.target.value });

  const onAddNoteBodyChange = event =>
    setNewEntry({ ...newEntry, notebody: event.target.value });

  const onAddNoteColorChange = event =>
    setNewEntry({ ...newEntry, color: event.target.value });

  return (
    <section className="container">
      <form onSubmit={event => handleAddNoteOnSubmit(newEntry.id, event)}>
        <div className="field new-note">
          <Input
            label="Title"
            value={newEntry.notetitle}
            onChange={onAddNoteTitleChange}
          />
          <TextArea
            row="5"
            label="Note"
            value={newEntry.notebody}
            onChange={onAddNoteBodyChange}
          />
          <Input
            label="Color"
            value={newEntry.color}
            onChange={onAddNoteColorChange}
          />
          <div className="buttons is-right input-control">
            <button type="submit" className="button is-success is-medium">
              Save
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default NewNote;
