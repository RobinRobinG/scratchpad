import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';
import axios from 'axios';
import { format } from 'date-fns';
const config = require('../config.json');

const useStyles = makeStyles({
  root: {
    margin: '2rem auto 1rem'
  }
});

const PageHeader = ({ id }) => {
  const classes = useStyles();
  const [board, setBoard] = useState([]);

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

    fetchBoard();
  }, [id]);

  if (board.length > 0) {
    const { title, timestamp } = board[0];
    const subTitle = format(new Date(timestamp), 'MMMM dd, yyyy h:mm aaaa');

    return (
      <Container maxWidth="sm" className={classes.root}>
        <Typography variant="h2" color="primary">
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          {subTitle}
        </Typography>
      </Container>
    );
  } else {
    return null;
  }
};

export default PageHeader;
