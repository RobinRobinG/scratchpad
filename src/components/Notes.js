import React, { useState, useEffect } from 'react';
import Content from './Content';
import NoteCard from './NoteCard';
import Chips from './Chips';
import LoadingSpinner from './LoadingSpinner';
import axios from 'axios';
const config = require('../config.json');

function sortByDate(notes) {
  return notes.sort((a, b) => b.created - a.created);
}

const Notes = ({ auth }) => {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [open, setOpen] = React.useState(true);
  const { user } = auth;

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
      setFilteredNotes(sortedNotes);
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
        setFilteredNotes(sortedNotes);
        setOpen(false);
      } catch (error) {
        console.log(`An error has occurred: ${error}`);
      }
    };

    fetchNotes();
  }, []);

  const tags = ['All', 'Work', 'Personal'];

  return (
    <Content>
      <Chips tags={tags} handleClick={chipsOnClick} />
      {filteredNotes && notes.length > 0 ? (
        filteredNotes.map(note => (
          <NoteCard
            note={note}
            key={note.id}
            handleDeleteNote={handleDeleteNote}
            user={user}
          />
        ))
      ) : (
        <LoadingSpinner open={open} />
      )}
    </Content>
  );
};

export default Notes;
