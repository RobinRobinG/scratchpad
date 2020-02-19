import React, { useState, useEffect } from 'react';
import { Container } from '@material-ui/core';
import NoteCard from './NoteCard';
import axios from 'axios';
const config = require('../config.json');

function sortByDate(notes) {
  return notes.sort((a, b) => b.created - a.created);
}

const Notes = () => {
  const [notes, setNotes] = useState([]);

  const handleDeleteNote = async (id, event) => {
    event.preventDefault();
    try {
      await axios.delete(`${config.api.invokeUrl}/products/${id}`);
      const updatedNotes = [...notes].filter(note => note.id !== id);
      const sortedNotes = sortByDate(updatedNotes);
      setNotes(sortedNotes);
    } catch (error) {
      console.log(`An error has occurred: ${error}`);
    }
  };

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get(`${config.api.invokeUrl}/products`);
        const sortedNotes = sortByDate(res.data);
        setNotes(sortedNotes);
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
        <div className="tile loading">Loading...</div>
      )}
    </Container>
  );
};

export default Notes;
