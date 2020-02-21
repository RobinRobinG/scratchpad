import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { Box } from '@material-ui/core';
import Navbar from './components/Navbar';
import NewForm from './components/NewForm';
import Notes from './components/Notes';
import EditForm from './components/EditForm';
import Footer from './components/Footer';
import './App.scss';

const App = () => {
  return (
    <Box display="flex" flexDirection="column" style={{ minHeight: '100vh' }}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/notes" component={Notes} />
          <Route path="/edit/:id" component={EditForm} />
          <Route exact path="/" component={NewForm} />
          <Redirect from="*" to="/" />
        </Switch>
        <Footer />
      </Router>
    </Box>
  );
};

export default App;
