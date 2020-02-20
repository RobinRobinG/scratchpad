import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Card,
  Divider,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Chip
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import FaceIcon from '@material-ui/icons/Face';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import { format } from 'date-fns';

function getIcon(value) {
  if (value.toLowerCase() === 'work') {
    return <BusinessCenterIcon />;
  } else if (value.toLowerCase() === 'personal') {
    return <FaceIcon />;
  }
}

function getSubheader(created, label) {
  if (!created) {
    return null;
  }
  const date = format(new Date(created), 'MMMM dd, yyyy h:mm aaaa');

  return (
    <div className="sub-header">
      <div>{date}</div>
      {label.map((value, index) => (
        <Chip
          key={index}
          label={value}
          className="chip"
          variant="outlined"
          size="small"
          icon={getIcon(value)}
          color={value.toLowerCase() === 'work' ? 'primary' : 'secondary'}
        />
      ))}
    </div>
  );
}

function NoteCard({ note, handleDeleteNote }) {
  let history = useHistory();
  const { title, body, id, label, created } = note;

  const handleNoteEditOnClick = event => {
    event.preventDefault();
    history.push(`/edit/${id}`);
  };

  return (
    <Card className={`note-card ${label}`}>
      <CardHeader title={title} subheader={getSubheader(created, label)} />
      <Divider />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {body}
        </Typography>
      </CardContent>
      <CardActions className="action-buttons">
        <IconButton aria-label="edit" onClick={handleNoteEditOnClick}>
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
