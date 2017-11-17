import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './scenes/home';
import ContactForm from './scenes/contactForm';

const Routes = (
  <Router>
    <div id="routes">
      <Route exact path="/" component={Home}/>
      <Route path="/contact/new" component={ContactForm}/>
      <Route path="/contact/update/:id" component={ContactForm}/>
    </div>
  </Router>
);
export default Routes;
