import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import LoadingSpinner from './LoadingSpinner';
import Content from './Content';
import NoteCard from './NoteCard';
import axios from 'axios';
const config = require('../config.json');

function sortByDate(notes) {
  return notes.sort((a, b) => b.timestamp - a.timestamp);
}

const Board = ({ auth }) => {
  let history = useHistory();
  let { id } = useParams();
  const [notes, setNotes] = useState([]);
  const [open, setOpen] = React.useState(true);
  const { user, setBoardId } = auth;

  const handleOnClick = event => {
    event.preventDefault();
    setBoardId(id);
    history.push('/');
  };

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get(
          `${config.api.notes.invokeUrl}/board/${id}`
        );
        const sortedNotes = sortByDate(res.data);
        setNotes(sortedNotes);
        setOpen(false);
      } catch (error) {
        console.log(`An error has occurred: ${error}`);
      }
    };

    fetchNotes();
  }, [id]);

  return (
    <Content>
      <Button variant="contained" color="primary" onClick={handleOnClick}>
        Add new
      </Button>
      {notes && notes.length > 0 ? (
        notes.map(note => <NoteCard note={note} key={note.id} user={user} />)
      ) : (
        <LoadingSpinner open={open} />
      )}
    </Content>
  );
};

export default Board;
