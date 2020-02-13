import React, { useState, useEffect } from 'react';
import Note from './Note';
import axios from 'axios';
const config = require('../config.json');

const Notes = () => {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const res = await axios.get(`${config.api.invokeUrl}/products`);
      console.log(res);
      setNotes(res.data);
    } catch (error) {
      console.log(`An error has occurred: ${error}`);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <section className="container">
      <div className="features is-multiline">
        {notes && notes.length > 0 ? (
          notes.map(note => (
            <Note
              title={note.notetitle}
              body={note.notebody}
              id={note.id}
              key={note.id}
            />
          ))
        ) : (
          <div className="tile notification is-warning">No notes available</div>
        )}
      </div>
    </section>
  );
};

export default Notes;
