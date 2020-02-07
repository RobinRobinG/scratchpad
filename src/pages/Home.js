import React, { Fragment } from 'react';
import Notes from '../components/Notes';
import CtaHorizontal from '../components/CtaHorizontal';
import NewNote from './NewNote';

function Home() {
  return (
    <Fragment>
      <Notes />
      <CtaHorizontal />
      <NewNote />
    </Fragment>
  );
}

export default Home;
