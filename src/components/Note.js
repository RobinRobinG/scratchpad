import React, { useState, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

function renderNoteEntry({ title, body, id }) {
  return (
    <Fragment>
      <p className="product-title">{title}</p>
      <p className="product-title">{body}</p>
      <p className="product-id">id: {id}</p>
    </Fragment>
  );
}

function renderEditInput({
  noteTitle,
  onUpdateNoteTitle,
  noteBody,
  onUpdateNoteBody,
  id,
  handleNoteEditSaveOnClick
}) {
  return (
    <Fragment>
      <p>Edit product name</p>
      <input
        className="input is-medium"
        type="text"
        placeholder="Title"
        value={noteTitle}
        onChange={onUpdateNoteTitle}
      />
      <input
        className="input is-medium"
        type="text"
        placeholder="Note"
        value={noteBody}
        onChange={onUpdateNoteBody}
      />
      <p className="product-id">id: {id}</p>
      <button
        type="submit"
        className="button is-info is-small"
        onClick={handleNoteEditSaveOnClick}
      >
        save
      </button>
    </Fragment>
  );
}

function renderEditAndDelete({ handleNoteEditOnClick, handleDeleteNote, id }) {
  return (
    <Fragment>
      <a href="/" onClick={handleNoteEditOnClick} className="product-edit-icon">
        <FontAwesomeIcon icon={faEdit} />
      </a>
      <button
        onClick={event => handleDeleteNote(id, event)}
        className="delete"
      ></button>
    </Fragment>
  );
}

const Note = props => {
  const {
    title,
    body,
    id,
    isAdmin,
    handleUpdateNote,
    handleDeleteNote
  } = props;

  const [isEditMode, setIsEditMode] = useState(false);
  const [noteTitle, setNoteTitle] = useState(title);
  const [noteBody, setNoteBody] = useState(body);

  const handleNoteEditOnClick = event => {
    event.preventDefault();
    setIsEditMode(true);
  };

  const handleNoteEditSaveOnClick = event => {
    event.preventDefault();
    setIsEditMode(false);
    handleUpdateNote(id, noteTitle, noteBody);
  };

  const onUpdateNoteTitle = event => setNoteTitle(event.target.value);
  const onUpdateNoteBody = event => setNoteBody(event.target.value);

  return (
    <div className="product tile is-child box notification is-white">
      {isAdmin &&
        renderEditAndDelete({ handleNoteEditOnClick, handleDeleteNote, id })}
      {isEditMode
        ? renderEditInput({
            noteTitle,
            onUpdateNoteTitle,
            noteBody,
            onUpdateNoteBody,
            id,
            handleNoteEditSaveOnClick
          })
        : renderNoteEntry({ body, title, id })}
    </div>
  );
};

export default Note;
