import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, useParams } from 'react-router-dom';
import { Box, Button } from '@material-ui/core';
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

  const [note, setNote] = useState({
    id,
    title: '',
    body: '',
    label: [],
    created: '',
    username: user.username
  });

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get(`${config.api.invokeUrl}/products`);

        const noteToUpdate = [...res.data].find(note => note.id === id);

        setNote(noteToUpdate);
      } catch (error) {
        console.log(`An error has occurred: ${error}`);
      }
    };
    fetchNotes();
  }, [id]);

  const onEditNoteTitleChange = event =>
    setNote({ ...note, title: event.target.value });

  const onEditNoteBodyChange = event =>
    setNote({ ...note, body: event.target.value });

  const onEditNoteLabelChange = event =>
    setNote({ ...note, label: event.target.value });

  const handleEditNoteOnSubmit = async (id, event) => {
    event.preventDefault();

    const today = new Date();
    const created = today.getTime();
    try {
      const params = {
        id,
        created,
        body: note.body,
        label: note.label,
        title: note.title,
        username: note.username
      };
      await axios.patch(`${config.api.invokeUrl}/products/${id}`, params);

      history.push('/notes');
    } catch (error) {
      console.log(`An error has occurred: ${error}`);
    }
  };

  const handleDeleteNote = async (id, event) => {
    event.preventDefault();
    try {
      await axios.delete(`${config.api.invokeUrl}/products/${id}`);

      history.push('/notes');
    } catch (error) {
      console.log(`An error has occurred: ${error}`);
    }
  };

  const labelOptions = ['Work', 'Personal'];

  return (
    <Content>
      {!isEmpty(note) && (
        <form onSubmit={event => handleEditNoteOnSubmit(note.id, event)}>
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
