import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Content from './Content';
import LoadingSpinner from './LoadingSpinner';
import { Card, CardHeader, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { format } from 'date-fns';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
const config = require('../config.json');

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: '.5rem',
    margin: '1.5rem 0'
  },
  action: {
    margin: '.8rem .5rem'
  }
}));

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

          function getHeaderAction() {
            return (
              <IconButton
                aria-label="edit"
                className={classes.action}
                color="primary"
                onClick={handleOnClick}
              >
                <ArrowForwardIcon />
              </IconButton>
            );
          }

          return (
            <Card raised className={classes.root} key={index}>
              <CardHeader
                title={title}
                subheader={date}
                action={getHeaderAction()}
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
