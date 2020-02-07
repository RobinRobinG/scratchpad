import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Notes from './components/Notes';
import TakeNote from './components/TakeNote';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/notes" component={Notes} />
          <Route exact path="/edit" component={TakeNote} />
          <Route exact path="/" component={Home} />
          <Redirect from="*" to="/" />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
