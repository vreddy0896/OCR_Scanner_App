import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Navbar from './components/inc/navbar/Navbar';
import Scanner from './components/scanner/Scanner';
import AboutUs from './components/pages/About';
import ContactUs from './components/pages/Contact';


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Switch>
          <Route exact path='/'>
            <Scanner/>
          </Route>
          <Route path='/about'>
            <AboutUs/>
          </Route>
          <Route path='/contact'>
            <ContactUs/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
