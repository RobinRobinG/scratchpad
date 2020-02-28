import React, { useState, useEffect, Fragment } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Box, Button } from '@material-ui/core';
import LoadingSpinner from './LoadingSpinner';
import Content from './Content';
import NoteCard from './NoteCard';
import PageHeader from './PageHeader';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { format } from 'date-fns';
const config = require('../config.json');

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      marginRight: theme.spacing(1)
    }
  }
}));

function sortByDate(notes) {
  return notes.sort((a, b) => b.created - a.created);
}

const Board = ({ auth }) => {
  const classes = useStyles();
  let history = useHistory();
  let { id } = useParams();
  const [notes, setNotes] = useState([]);
  const [open, setOpen] = React.useState(true);
  const [board, setBoard] = useState([]);
  const { user, setBoardId } = auth;

  const handleAddNewOnClick = event => {
    event.preventDefault();
    setBoardId(id);
    history.push('/');
  };

  const handleDeleteOnClick = async event => {
    event.preventDefault();
    try {
      await axios.delete(
        `${config.api.board.invokeUrl}/board?id=${board[0].id}&timestamp=${board[0].timestamp}`
      );
      history.push('/boards');
    } catch (error) {
      console.log(`An error has occurred: ${error}`);
    }
  };

  const handleDeleteNote = async (id, event) => {
    event.preventDefault();
    try {
      await axios.delete(`${config.api.notes.invokeUrl}/products/${id}`);
      const updatedNotes = [...notes].filter(note => note.id !== id);
      setNotes(updatedNotes);
    } catch (error) {
      console.log(`An error has occurred: ${error}`);
    }
  };

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const res = await axios.get(
          `${config.api.board.invokeUrl}/board/${id}`
        );
        setBoard(res.data);
      } catch (error) {
        console.log(`An error has occurred: ${error}`);
      }
    };

    const fetchNotes = async () => {
      try {
        const { data } = await axios.get(
          `${config.api.notes.invokeUrl}/board/${id}`
        );
        const sortedNotes = sortByDate(data);
        setNotes(sortedNotes);
        setOpen(false);
      } catch (error) {
        console.log(`An error has occurred: ${error}`);
      }
    };

    fetchBoard();
    fetchNotes();
  }, [id]);

  function renderPageHeader(board) {
    if (board.length <= 0) {
      return null;
    }
    const { title, timestamp } = board[0];
    const subTitle = format(new Date(timestamp), 'MMMM dd, yyyy h:mm aaaa');
    return <PageHeader title={title} subTitle={subTitle} />;
  }

  return (
    <Fragment>
      {renderPageHeader(board)}
      <Content>
        <Box className={classes.root}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddNewOnClick}
          >
            New note
          </Button>
          {board.length > 0 && user && board[0].creator === user.username && (
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleDeleteOnClick}
            >
              Delete board
            </Button>
          )}
        </Box>
        {notes && notes.length > 0 ? (
          notes.map(note => (
            <NoteCard
              note={note}
              key={note.id}
              user={user}
              handleDeleteNote={handleDeleteNote}
            />
          ))
        ) : (
          <LoadingSpinner open={open} />
        )}
      </Content>
    </Fragment>
  );
};

export default Board;
