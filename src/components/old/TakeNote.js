import React, { useState, useEffect, Fragment } from 'react';
import Note from './Note';
import axios from 'axios';
const config = require('../config.json');

const TakeNote = () => {
  const [notes, setNotes] = useState([]);

  const handleUpdateNote = async (id, title, body) => {
    try {
      const params = { id, title, body };
      await axios.patch(`${config.api.invokeUrl}/products/${id}`, params);

      const noteToUpdate = [...notes].find(note => note.id === id);
      const updatedNotes = [...notes].filter(note => note.id !== id);
      noteToUpdate.title = title;
      noteToUpdate.body = body;
      updatedNotes.unshift(noteToUpdate);
      setNotes(updatedNotes);
    } catch (error) {
      console.log(`An error has occurred: ${error}`);
    }
  };

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

  const fetchNotes = async () => {
    try {
      const { data: fetchedNotes } = await axios.get(
        `${config.api.invokeUrl}/products`
      );
      setNotes(fetchedNotes);
    } catch (error) {
      console.log(`An error has occurred: ${error}`);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <Fragment>
      <section className="section">
        <div className="container">
          <div className="tile is-vertical">
            {notes.map(note => (
              <Note
                isAdmin={true}
                handleUpdateNote={handleUpdateNote}
                handleDeleteNote={handleDeleteNote}
                title={note.title}
                body={note.body}
                id={note.id}
                key={note.id}
              />
            ))}
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default TakeNote;
