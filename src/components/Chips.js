import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Chip, Box } from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      marginRight: theme.spacing(1)
    }
  }
}));

function getColor(value) {
  if (value.toLowerCase() === 'work') {
    return 'primary';
  } else if (value.toLowerCase() === 'personal') {
    return 'secondary';
  } else {
    return 'default';
  }
}

function getIcon(value) {
  if (value.toLowerCase() === 'work') {
    return <BusinessCenterIcon />;
  } else if (value.toLowerCase() === 'personal') {
    return <FaceIcon />;
  }
}

const Chips = ({ tags, handleClick }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root} display="flex" justifyContent="center" mt={2}>
      {tags.map((tag, index) => (
        <Chip
          key={index}
          label={tag}
          variant="outlined"
          clickable
          onClick={event => handleClick(event, tag)}
          icon={getIcon(tag)}
          color={getColor(tag)}
        />
      ))}
    </Box>
  );
};

export default Chips;
