import React from 'react';
import { Container } from '@material-ui/core';
import NewForm from './NewForm';

function Home() {
  return (
    <Container maxWidth="sm" className="content">
      <NewForm />
    </Container>
  );
}

export default Home;
