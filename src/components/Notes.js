import React, { useState, useEffect } from 'react';
import { Container } from '@material-ui/core';
import NoteCard from './NoteCard';
import Chips from './Chips';
import axios from 'axios';
const config = require('../config.json');

function sortByDate(notes) {
  return notes.sort((a, b) => b.created - a.created);
}

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState(notes);

  const chipsOnClick = (event, tag) => {
    event.preventDefault();

    if (tag === 'All') {
      setFilteredNotes(notes);
    } else {
      setFilteredNotes([...notes].filter(note => note.label.includes(tag)));
    }
  };

  const handleDeleteNote = async (id, event) => {
    event.preventDefault();
    try {
      await axios.delete(`${config.api.invokeUrl}/products/${id}`);
      const updatedNotes = [...notes].filter(note => note.id !== id);
      const sortedNotes = sortByDate(updatedNotes);
      setNotes(sortedNotes);
      setFilteredNotes(notes);
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
        setFilteredNotes(notes);
      } catch (error) {
        console.log(`An error has occurred: ${error}`);
      }
    };

    fetchNotes();
  }, []);

  const tags = ['All', 'Work', 'Personal'];

  return (
    <Container maxWidth="sm" className="content">
      <Chips tags={tags} handleClick={chipsOnClick} />
      {filteredNotes && notes.length > 0 ? (
        filteredNotes.map(note => (
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
