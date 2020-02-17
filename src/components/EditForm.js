import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Container } from '@material-ui/core';
import axios from 'axios';
import Input from './Input';
import TextArea from './TextArea';
import Dropdown from './Dropdown';
const config = require('../config.json');

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

const EditForm = () => {
  let history = useHistory();
  let { id } = useParams();
  const [note, setNote] = useState({
    id,
    title: '',
    body: '',
    color: '',
    created: ''
  });

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get(`${config.api.invokeUrl}/products`);

        const noteToUpdate = [...res.data].find(note => note.id === id);

        setNote(noteToUpdate);
      } catch (error) {
        console.log(`An error has occurred: ${error}`);
      }
    };
    fetchNotes();
  }, [id]);

  const onEditNoteTitleChange = event =>
    setNote({ ...note, title: event.target.value });

  const onEditNoteBodyChange = event =>
    setNote({ ...note, body: event.target.value });

  const onEditNoteColorChange = event =>
    setNote({ ...note, color: event.target.value });

  const handleEditNoteOnSubmit = async (id, event) => {
    event.preventDefault();

    try {
      const params = {
        id,
        body: note.body,
        color: note.color,
        title: note.title,
        created: new Date().toString()
      };
      await axios.patch(`${config.api.invokeUrl}/products/${id}`, params);

      history.push('/notes');
    } catch (error) {
      console.log(`An error has occurred: ${error}`);
    }
  };

  const handleDeleteNote = async (id, event) => {
    event.preventDefault();
    try {
      await axios.delete(`${config.api.invokeUrl}/products/${id}`);

      history.push('/notes');
    } catch (error) {
      console.log(`An error has occurred: ${error}`);
    }
  };

  const colorOptions = ['green', 'purple'];

  return (
    <Container maxWidth="sm" className="content">
      {isEmpty(note) === false && (
        <form
          onSubmit={event => handleEditNoteOnSubmit(note.id, event)}
          className="edit-form"
        >
          <Input
            label="Title"
            value={note.title}
            onChange={onEditNoteTitleChange}
          />
          <Dropdown
            label="color"
            value={note.color}
            onChange={onEditNoteColorChange}
            options={colorOptions}
          />
          <TextArea
            row="10"
            label="Note"
            value={note.body}
            onChange={onEditNoteBodyChange}
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
          >
            Save
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={event => handleDeleteNote(id, event)}
          >
            Delete
          </Button>
        </form>
      )}
    </Container>
  );
};

export default EditForm;
