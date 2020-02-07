import React, { useState, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import Button from './Button';
import Input from './Input';
import TextArea from './TextArea';
import CardContent from './CardContent';

function renderNoteEntry({ title, body, id }) {
  return (
    <Fragment>
      <p className="note-title">{title}</p>
      <p className="note-body">{body}</p>
      <p className="note-id">id: {id}</p>
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
      <p>Edit</p>
      <Input value={noteTitle} label="Title" onChange={onUpdateNoteTitle} />
      <TextArea
        placeholder="Note"
        value={noteBody}
        onChange={onUpdateNoteBody}
        row="5"
      />
      <p className="product-id">id: {id}</p>
      <Button
        onClick={handleNoteEditSaveOnClick}
        size="is-small"
        color="is-info"
        label="Save"
      />
    </Fragment>
  );
}

function renderEditAndDelete({ handleNoteEditOnClick, handleDeleteNote, id }) {
  return (
    <Fragment>
      <a href="/" onClick={handleNoteEditOnClick} className="product-edit-icon">
        <FontAwesomeIcon icon={faEdit} />
      </a>

      <button onClick={event => handleDeleteNote(id, event)} className="delete">
        <FontAwesomeIcon icon={faEdit} />
      </button>
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
    <CardContent>
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
    </CardContent>
  );
};

export default Note;
