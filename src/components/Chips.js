import React from 'react';
import { Chip } from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';

function getIcon(value) {
  if (value.toLowerCase() === 'work') {
    return <BusinessCenterIcon />;
  } else if (value.toLowerCase() === 'personal') {
    return <FaceIcon />;
  }
}

const Chips = ({ tags, handleClick }) => {
  // const handleClick = (event, tag) => {
  //   console.log({ tag });
  // };

  return (
    <div className="clickable-chips">
      {tags.map((tag, index) => (
        <Chip
          key={index}
          label={tag}
          className="chip"
          variant="outlined"
          clickable
          onClick={event => handleClick(event, tag)}
          icon={getIcon(tag)}
          color={tag.toLowerCase() === 'work' ? 'primary' : 'secondary'}
        />
      ))}
    </div>
  );
};

export default Chips;
