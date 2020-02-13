import React, { useState, Fragment } from 'react';
import Button from './Button';
import Input from './Input';
import TextArea from './TextArea';
import CardContent from './CardContent';

function renderNoteEntry({ title, body, id }) {
  return (
    <Fragment>
      <p className="note-id">id: {id}</p>
      <p className="note-title">{title}</p>
      <p className="note-body">{body}</p>
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
    <div className="field edit-note">
      <p className="note-id">id: {id}</p>
      <Input value={noteTitle} label="Title" onChange={onUpdateNoteTitle} />
      <TextArea
        placeholder="Note"
        value={noteBody}
        onChange={onUpdateNoteBody}
        row="7"
      />
      <div className="buttons is-right input-control">
        <Button
          onClick={handleNoteEditSaveOnClick}
          size="is-small"
          color="is-info"
          label="Save"
        />
      </div>
    </div>
  );
}

function renderEditAndDelete({ handleNoteEditOnClick, handleDeleteNote, id }) {
  return (
    <div className="edit-and-delete">
      <a href="/" onClick={handleNoteEditOnClick} className="edit-icon">
        Edit
      </a>
      <a
        href="/"
        onClick={event => handleDeleteNote(id, event)}
        className="delete-icon"
      >
        Delete
      </a>
    </div>
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
    <CardContent className="column is-4">
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
