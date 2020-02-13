import React, { Fragment } from 'react';
import Notes from './Notes';
import CtaHorizontal from './CtaHorizontal';
import NewForm from './NewForm';

function Home() {
  return (
    <Fragment>
      <NewForm />
      <CtaHorizontal />
      <Notes />
    </Fragment>
  );
}

export default Home;
