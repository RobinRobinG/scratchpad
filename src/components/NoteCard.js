import React from 'react';
import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import {
  Divider,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
  Typography
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { format } from 'date-fns';

function getDate(createdDate) {
  if (!createdDate) {
    return null;
  }
  return format(new Date(createdDate), 'MMMM dd, yyyy h:mm aaaa');
}

function NoteCard({ note, handleDeleteNote }) {
  let history = useHistory();
  const { title, body, id, color, created } = note;

  const handleNoteEditOnClick = (id, event) => {
    event.preventDefault();
    history.push(`/edit/${id}`);
  };

  return (
    <Card className={`note-card ${color}`}>
      <CardHeader title={title} subheader={getDate(created)} />
      <Divider />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {body}
        </Typography>
      </CardContent>
      <CardActions className="action-buttons">
        <IconButton
          aria-label="edit"
          onClick={event => handleNoteEditOnClick(id, event)}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          aria-label="delete"
          onClick={event => handleDeleteNote(id, event)}
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default NoteCard;
