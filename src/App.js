//import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Error from './components/Error';
import Navigation from './components/Navigation';
import {Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
       <BrowserRouter>
          {/*<Navigation />*/}
          <Nav className="navr" activeKey="/">
    <Nav.Item>
      <Nav.Link href="/">HOME</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link href="/about/">ABOUT</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link href="/opensource/">OPEN SOURCE</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link href="/solutions/">SOLUTIONS</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link href="/insights/">BLOG</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link href="/contact/">CONTACT</Nav.Link>
    </Nav.Item>
  </Nav>

            <Switch>
             <Route path="/" component={Home} exact/>
             <Route path="/about" component={About}/>
             <Route path="/contact" component={Contact}/>
            <Route component={Error}/>
           </Switch>
           </BrowserRouter>

    );
}

export default App;
