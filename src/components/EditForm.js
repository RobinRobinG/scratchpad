import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, useParams } from 'react-router-dom';
import { Box, Button, Typography } from '@material-ui/core';
import Validate from './utility/FormValidation';
import axios from 'axios';
import Content from './Content';
import Input from './Input';
import TextArea from './TextArea';
import Tags from './Tags';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
const config = require('../config.json');

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      marginLeft: theme.spacing(1)
    }
  }
}));

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

const EditForm = ({ auth }) => {
  const classes = useStyles();
  let history = useHistory();
  let { id } = useParams();
  const { user } = auth;

  const initialState = {
    id,
    title: '',
    body: '',
    label: []
  };

  const initialErrors = {
    blankfield: ''
  };

  const [note, setNote] = useState(initialState);
  const [errors, setErrors] = useState(initialErrors);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get(`${config.api.notes.invokeUrl}/products`);

        const noteToUpdate = [...res.data].find(note => note.id === id);

        setNote(noteToUpdate);
      } catch (error) {
        console.log(`An error has occurred: ${error}`);
      }
    };
    fetchNotes();
  }, [id]);

  const onEditNoteTitleChange = event => {
    setErrors(initialErrors);
    setNote({ ...note, title: event.target.value });
  };

  const onEditNoteBodyChange = event => {
    setErrors(initialErrors);
    setNote({ ...note, body: event.target.value });
  };

  const onEditNoteLabelChange = event => {
    setErrors(initialErrors);
    setNote({ ...note, label: event.target.value });
  };

  const handleEditNoteOnSubmit = async (id, event) => {
    event.preventDefault();
    setErrors(initialErrors);
    const error = Validate(note);
    if (error) {
      return setErrors({ ...errors, ...error });
    }

    const today = new Date();
    const created = today.getTime();
    const username = user ? user.username : null;
    const { body, label, title, boardid } = note;

    try {
      const params = {
        id,
        created,
        body,
        label,
        title,
        username,
        boardid
      };
      await axios.patch(`${config.api.notes.invokeUrl}/products/${id}`, params);
      return boardid
        ? history.push(`/board/${boardid}`)
        : history.push('/notes');
    } catch (error) {
      console.log(`An error has occurred: ${error}`);
    }
  };

  const handleDeleteNote = async (id, event) => {
    event.preventDefault();
    const { boardid } = note;
    try {
      await axios.delete(`${config.api.notes.invokeUrl}/products/${id}`);

      return boardid
        ? history.push(`/board/${boardid}`)
        : history.push('/notes');
    } catch (error) {
      console.log(`An error has occurred: ${error}`);
    }
  };

  const labelOptions = ['Work', 'Personal'];

  return (
    <Content>
      {!isEmpty(note) && (
        <form onSubmit={event => handleEditNoteOnSubmit(note.id, event)}>
          <Box style={{ height: '2rem' }}>
            {errors && errors.blankfield && (
              <Typography variant="body1" color="error">
                {errors.blankfield.charAt(0).toUpperCase() +
                  errors.blankfield.slice(1) +
                  ' '}
                field cannot be blank.
              </Typography>
            )}
          </Box>
          <Box display="flex" flexDirection="column" alignItems="flex-end">
            <Input
              label="Title"
              type="text"
              value={note.title}
              onChange={onEditNoteTitleChange}
            />
            <Tags
              label="Label"
              value={note.label}
              onChange={onEditNoteLabelChange}
              options={labelOptions}
            />
            <TextArea
              row="15"
              label="Note"
              value={note.body}
              onChange={onEditNoteBodyChange}
            />
            <Box className={classes.root}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                startIcon={<SaveIcon />}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                size="large"
                onClick={event => handleDeleteNote(id, event)}
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            </Box>
          </Box>
        </form>
      )}
    </Content>
  );
};

export default EditForm;
