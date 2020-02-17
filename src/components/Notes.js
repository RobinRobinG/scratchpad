import React, { useState, useEffect } from 'react';
import { Container } from '@material-ui/core';
import NoteCard from './NoteCard';
import axios from 'axios';
const config = require('../config.json');

const Notes = () => {
  const [notes, setNotes] = useState([]);

  const handleDeleteNote = async (id, event) => {
    event.preventDefault();
    try {
      await axios.delete(`${config.api.invokeUrl}/products/${id}`);
      const updatedNotes = [...notes].filter(note => note.id !== id);
      setNotes(updatedNotes);
    } catch (error) {
      console.log(`An error has occurred: ${error}`);
    }
  };

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get(`${config.api.invokeUrl}/products`);
        setNotes(res.data);
      } catch (error) {
        console.log(`An error has occurred: ${error}`);
      }
    };

    fetchNotes();
  }, []);

  return (
    <Container maxWidth="sm" className="content">
      {notes && notes.length > 0 ? (
        notes.map(note => (
          <NoteCard
            note={note}
            key={note.id}
            handleDeleteNote={handleDeleteNote}
          />
        ))
      ) : (
        <div className="tile notification is-warning">No notes available</div>
      )}
    </Container>
  );
};

export default Notes;
