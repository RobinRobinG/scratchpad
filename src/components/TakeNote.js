import React, { useState, useEffect, Fragment } from 'react';
import Note from './Note';
import axios from 'axios';
const config = require('../config.json');

const TakeNote = () => {
  const [newEntry, setNewEntry] = useState({
    notetitle: '',
    notebody: '',
    id: ''
  });
  const [notes, setNotes] = useState([]);

  const handleAddNoteOnSubmit = async (id, event) => {
    event.preventDefault();
    try {
      const params = {
        id,
        notetitle: newEntry.notetitle,
        notebody: newEntry.notebody
      };
      await axios.post(`${config.api.invokeUrl}/products/${id}`, params);
      setNotes([...notes, newEntry]);
      setNewEntry({ notetitle: '', notebody: '', id: '' });
    } catch (error) {
      console.log(`An error has occurred: ${error}`);
    }
  };

  const handleUpdateNote = async (id, title, body) => {
    try {
      const params = { id, notetitle: title, notebody: body };
      await axios.patch(`${config.api.invokeUrl}/products/${id}`, params);

      const noteToUpdate = [...notes].find(note => note.id === id);
      const updatedNotes = [...notes].filter(note => note.id !== id);
      noteToUpdate.notetitle = title;
      noteToUpdate.notebody = body;
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

  const onAddNoteTitleChange = event =>
    setNewEntry({ ...newEntry, notetitle: event.target.value });

  const onAddNoteBodyChange = event =>
    setNewEntry({ ...newEntry, notebody: event.target.value });

  const onAddNoteIdChange = event =>
    setNewEntry({ ...newEntry, id: event.target.value });

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <Fragment>
      <section className="section">
        <div className="container">
          <h1>Write something...</h1>

          <div className="columns">
            <div className="column">
              <form
                onSubmit={event => handleAddNoteOnSubmit(newEntry.id, event)}
              >
                <div className="field">
                  <div className="control">
                    <input
                      className="input is-medium"
                      type="text"
                      placeholder="Title"
                      value={newEntry.notetitle}
                      onChange={onAddNoteTitleChange}
                    />
                  </div>
                  <div className="control">
                    <input
                      className="input is-medium"
                      type="text"
                      placeholder="Note"
                      value={newEntry.notebody}
                      onChange={onAddNoteBodyChange}
                    />
                  </div>
                  <div className="control">
                    <input
                      className="input is-medium"
                      type="text"
                      placeholder="Enter id"
                      value={newEntry.id}
                      onChange={onAddNoteIdChange}
                    />
                  </div>
                  <div className="control">
                    <button
                      type="submit"
                      className="button is-success is-medium"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="column">
              <div className="tile is-vertical">
                {notes.map(note => (
                  <Note
                    isAdmin={true}
                    handleUpdateNote={handleUpdateNote}
                    handleDeleteNote={handleDeleteNote}
                    title={note.notetitle}
                    body={note.notebody}
                    id={note.id}
                    key={note.id}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default TakeNote;
