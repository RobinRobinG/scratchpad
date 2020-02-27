import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Content from './Content';
import LoadingSpinner from './LoadingSpinner';
import { Card, CardHeader, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { format } from 'date-fns';
const config = require('../config.json');

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: '.5rem',
    margin: '1.5rem 0'
  },
  action: {
    margin: '1rem .5rem'
  }
}));

function getHeaderAction(handleOnClick, classes) {
  return (
    <Button
      variant="contained"
      className={classes.action}
      color="primary"
      onClick={handleOnClick}
    >
      Open
    </Button>
  );
}

const Boards = () => {
  let history = useHistory();
  const classes = useStyles();
  const [boards, setBoards] = useState([]);
  const [open, setOpen] = React.useState(true);
  console.log({ boards });
  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const { data } = await axios.get(`${config.api.board.invokeUrl}/board`);
        setBoards(data);
        setOpen(false);
      } catch (error) {
        console.log(`An error has occurred: ${error}`);
      }
    };

    fetchBoards();
  }, []);

  return (
    <Content>
      {boards && boards.length > 0 ? (
        boards.map((board, index) => {
          const { id, title, timestamp } = board;
          const date = format(new Date(timestamp), 'MMMM dd, yyyy h:mm aaaa');

          const handleOnClick = event => {
            event.preventDefault();
            history.push(`/board/${id}`);
          };

          return (
            <Card
              raised
              className={classes.root}
              key={index}
              onClick={handleOnClick}
            >
              <CardHeader
                title={title}
                subheader={date}
                action={getHeaderAction(handleOnClick, classes)}
              />
            </Card>
          );
        })
      ) : (
        <LoadingSpinner open={open} />
      )}
    </Content>
  );
};

export default Boards;
