import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Notes from './components/Notes';
import EditForm from './components/EditForm';
import Footer from './components/Footer';
import './App.scss';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/notes" component={Notes} />
          <Route path="/edit/:id" component={EditForm} />
          <Route exact path="/" component={Home} />
          <Redirect from="*" to="/" />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
